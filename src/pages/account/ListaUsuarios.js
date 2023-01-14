// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2'

// components
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { environment } from '../../environments/environments';
import Table from '../../components/Table';
import { useTranslation } from 'react-i18next';

import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
//var jwt = require('jsonwebtoken')
/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-success': row.original?.status,
                    'bg-danger': !row.original?.status,
                })}>
                {row.original.status ? 'Active' : 'Deactivated'}
            </span>
        </React.Fragment>
    );
};
/* action column render */
const ActionColumn = ({ row }) => {
    const INIT_TEMAS = {
        id: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
        username: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        nombres: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        apellidos: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
        rol: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
        clave: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
        status: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
    };

    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState(INIT_TEMAS);


    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };

    const eliminar = (event) => {
        Swal.fire({
          title: 'Desea eliminar el registro??',
          showCancelButton: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            //console.log('event',event.IdCategorias);
            const url = `${environment.baseURL}accion=usuarios&opcion=eliminar&id=${event.id}`;
            const respuesta = api.getDatos(`${url}`);
            respuesta.then(function (resp) {
                if (resp) {
                  Swal.fire('' + resp[0].menssage + '');
                }
            });
          }
        })
    };

    const actualizar = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validated) {
            let response;
            if (temas) {
                var queryString = temas
                    ? Object.keys(temas)
                          .map((key) => key + '=' + temas[key])
                          .join('&')
                    : '';
            }
            response = queryString;

            const url = `${environment.baseURL}accion=usuarios&opcion=actualizar&${response}`;
            const respuesta = api.getDatos(`${url}`);
            respuesta.then(function (resp) {
                if (resp) {
                  Swal.fire('' + resp[0].menssage + '');
                }
            });
        }
    };

    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setTemas([]);
    };
    //console.log(row);
    return (
        <React.Fragment>
            <Modal show={signUpModal} onHide={toggleSignUp}>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                placeholder="Digite el username"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, username: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nombres">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="nombres"
                                placeholder="Digite el nombres"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, nombres: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el nombre.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="apellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="apellidos"
                                placeholder="Digite el apellido"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, apellidos: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el apellido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rol">
                            <Form.Label>Rol</Form.Label>
                            <Select
                                type="select"
                                name="rol"
                                required
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, status: e.value })}
                                options={[
                                    { value: temas.rol, rol: 'Estado: ' + temas.rol + '' },
                                    { value: 'Admin', label: 'Admin' },
                                    { value: 'Docente', label: 'Docente' },
                                ]}
                                placeholder="Selecione el rol..."
                                selected={temas.rol}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el status.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Select
                                type="select"
                                name="status"
                                required
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, status: e.value })}
                                options={[
                                    { value: temas.status, label: 'Estado: ' + temas.status + '' },
                                    { value: 'Active', label: 'Activo' },
                                    { value: 'Deactivated', label: 'Inactivo' },
                                ]}
                                placeholder="Selecione el status..."
                                selected={temas.status}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el status.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="button-list">
                            <Button type="button" onClick={actualizar}>
                                +
                            </Button>

                            <Button type="button" className="btn-icon" onClick={Close}>
                                <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon" onClick={() => eliminar(temas)}>
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>
        </React.Fragment>
    );
};
const columns = [
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        classes: 'table-action',
        Cell: ActionColumn,
    },
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Usuario',
        accessor: 'username',
        sort: true,
    },
    {
        Header: 'Nombres',
        accessor: 'nombres',
        sort: true,
    },{
        Header: 'Apellidos',
        accessor: 'apellidos',
        sort: true,
    },{
        Header: 'Role',
        accessor: 'role',
        sort: true,
    },{
        Header: 'Clave',
        accessor: 'clave',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,
    },
];
const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
];
/*
function generateToken(user) {

    let token = '';
    var u = {
        username: user?.username,
        id: user?.id,
    };
    token = jwt.sign(u, user?.password, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    return token;
}
*/
const FormActividades = (props) => {
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState([]);

    const guardar = (event) => {
      let CryptoJS = require('crypto-js');
      var pass = CryptoJS.AES.encrypt(temas?.password, 'key instrumentacion 123').toString();
      let resp ='';
      //const toke =api.generateToken(temas?.username,temas?.username,temas?.id)
      const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validated) {
            let response={...temas,clave:pass,token:environment.TOKEN};
            if (response) {
                var queryString = response
                    ? Object.keys(response)
                          .map((key) => key + '=' + response[key])
                          .join('&')
                    : '';
            }
            resp = queryString;

            const url = `${environment.baseURL}accion=usuarios&opcion=guardar&${resp}`;
            const respuesta = api.getDatos(`${url}`);
            respuesta.then(function (resp) {
                if (resp) {
                  Swal.fire('' + resp[0].menssage + '');
                }
            });
        }
    };
    const { t } = useTranslation();
    const schemaResolver = yupResolver(
      yup.object().shape({
          username: yup.string().required(t('Please enter Fullname')),
          password: yup.string().required(t('Please enter Password')),
          nombres: yup.string().required('Please enter Nombres').email('Please enter valid Nombres'),
          apellidos: yup.string().required('Please enter apellidos').email('Please enter valid apellidos'),
          rol: yup.string().required('Please enter rol').email('Please enter valid rol'),
      })
  );

    return (
        <Card>
            <Card.Body>
                {/* Sign up Modal */}
                <Modal show={props.signUpModal} onHide={props.toggleSignUp}>
                    <Modal.Body>
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span></span>
                                <span></span>
                            </a>
                        </div>
                        <Form validated={validated} resolver={schemaResolver} defaultValues={{}}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Digite el username"
                                value={temas.username}
                                onChange={(e) => setTemas({ ...temas, username: e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                name="password"
                                placeholder="Digite el password"
                                value={temas.password}
                                onChange={(e) => setTemas({ ...temas, password: e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nombres">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombres"
                                placeholder="Digite el nombres"
                                value={temas.nombres}
                                onChange={(e) => setTemas({ ...temas, nombres: e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el nombre.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="apellidos">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellidos"
                                placeholder="Digite el apellido"
                                value={temas.apellidos}
                                onChange={(e) => setTemas({ ...temas, apellidos: e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el apellido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rol">
                            <Form.Label>Rol</Form.Label>
                            <Select
                                type="select"
                                name="rol"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, rol: e.value })}
                                options={[
                                    { value: temas.rol, rol: 'Rol: ' + temas.rol + '' },
                                    { value: 'Admin', label: 'Admin' },
                                    { value: 'Docente', label: 'Docente' },
                                ]}
                                placeholder="Selecione el rol..."
                                selected={temas.rol}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el status.</Form.Control.Feedback>
                        </Form.Group>
                            <div className="button-list">
                                <Button type="button" disabled={temas.message ? 'true' : ''} onClick={guardar}>
                                    +
                                </Button>
                                {temas.message && (
                                    <Button type="button" className="btn-icon" onClick={props.Close}>
                                        <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};
type categorias = {
    selected: number,
    IdCategorias: number,
    title: string,
    onClick: (date: any) => void,
    onState: (date: Array) => void,
};
const ListaUsuarios = (props: categorias): React$Element<any> => {
    const [records, openCategoriass] = useState([]);
    const [data, cargarCategorias] = useState([]);
    const [signUpModal, setSignUpModal] = useState(false);

    useEffect(() => {
        const url = `${environment.baseURL}accion=usuarios&opcion=consultar`;
        const syllab = api.getDatos(`${url}`);
        syllab.then(function (resp) {
            if (resp) {
                //console.log(resp);
                openCategoriass(resp);
            } else {
                const records = [
                    {
                        IdCategorias: 1,
                        title: 'No existen categorias cargadas a este  curso',
                        status: 'null',
                    },
                ];
                cargarCategorias(records);
            }
        });
    }, [props]);

    useEffect(() => {
        if (records && records.length > 0) {
            //const cur = JSON.parse(records);
            const mapped = [];
            mapped.push(records);
            cargarCategorias(mapped[0]);
        }
    }, [records]);

    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };
    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        // agregarsetTemas([]);
    };
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Adminitrador de Usuarios:</h4>
                            <Row>
                            <Col sm={4}></Col>
                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                theadClass="table-light"
                                searchBoxClass="mt-2 mb-3"
                                isSearchable={true}
                            />
                            <Row>
                                    <FormActividades
                                        signUpModal={signUpModal}
                                        Close={Close}
                                        toggleSignUp={toggleSignUp}
                                    />
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ListaUsuarios;
