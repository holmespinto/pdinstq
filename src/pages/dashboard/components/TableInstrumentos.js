// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
// components

import { environment } from '../../../environments/environments';
import Table from '../../../components/Table';

import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();
/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-success': row.original.status,
                    'bg-danger': !row.original.status,
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
        idReferencia: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        idCategorias: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        title: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
        description: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
        inventario: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
        reservado: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
        status: row.cells[8].value ? row.cells[8].value : row.cells[8].value,
    };

    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState(INIT_TEMAS);

    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };

    const eliminar = () => {};

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

            const url = `${environment.baseURL}accion=instrumentos&opcion=actualizar&${response}`;
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
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Titulo de la Referencia</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="title"
                                placeholder="Digite la referencia para la Canasta"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, title: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la referencia.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="description"
                                placeholder="Digite la referencia para la Canasta"
                                value={temas.description}
                                onChange={(e) => setTemas({ ...temas, description: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Descripcion.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="inventario">
                            <Form.Label>Cantidad en Inventario</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="inventario"
                                placeholder="Digite la referencia para la Canasta"
                                value={temas.inventario}
                                onChange={(e) => setTemas({ ...temas, inventario: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la referencia.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="IdReferencia">
                            <Form.Label></Form.Label>
                            <Form.Control
                                required
                                type="hidden"
                                name="IdReferencia"
                                placeholder="Digite la referencia para la Canasta"
                                value={temas.IdReferencia}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el IdReferencia.
                            </Form.Control.Feedback>
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
            <Link to="#" className="action-icon" onClick={() => eliminar()}>
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
        Header: 'Referencias',
        accessor: 'idReferencia',
        sort: true,
    },
    {
        Header: 'IDCategoria',
        accessor: 'idCategorias',
        sort: true,
    },
    {
        Header: 'Titulo',
        accessor: 'title',
        sort: true,
    },
    {
        Header: 'Descripción',
        accessor: 'description',
        sort: true,
    },
    {
        Header: 'Inventario',
        accessor: 'inventario',
        sort: true,
    },
    {
        Header: 'Reservado',
        accessor: 'reservado',
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

const FormActividades = (props) => {
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState([]);
    const [titulo, setTitulo] = useState([]);

    const guardar = (event) => {
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

            const url = `${environment.baseURL}accion=instrumentos&opcion=guardar&${response}`;
            const respuesta = api.getDatos(`${url}`);
            respuesta.then(function (resp) {
                if (resp) {
                    Swal.fire('' + resp[0].menssage + '');
                }
            });
            setTemas([])
        }

    };

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        if (props.referencias.length > 0) setTitulo(props.referencias[props.IdReferencia]);
    }, [props]);

    return (
        <Card>
            <Card.Body>
                {/* Sign up Modal */}
                <Modal show={props.signUpModal} onHide={props.toggleSignUp}>
                    <Modal.Body>
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span>
                                   {titulo.title}
                                </span>
                                <span></span>
                            </a>
                        </div>
                        <Form validated={validated}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Titulo de la {props.session}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="title"
                                    placeholder="Digite la referencia para la Canasta"
                                    value={temas.title}
                                    onChange={(e) => setTemas({ ...temas, title: e.target.value,nsecion:props.nsecion })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la {props.session}.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="description"
                                    placeholder="Digite la referencia para la Canasta"
                                    value={temas.description}
                                    onChange={(e) => setTemas({ ...temas, description: e.target.value,nsecion:props.nsecion })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Descripcion.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="inventario">
                                <Form.Label>Cantidad en Inventario</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="inventario"
                                    placeholder="Digite la referencia para la Canasta"
                                    value={temas.inventario}
                                    onChange={(e) => setTemas({ ...temas, inventario: e.target.value,nsecion:props.nsecion })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la {props.session}.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="idReferencia">
                                <Form.Label></Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="idReferencia"
                                    placeholder={props.IdReferencia}
                                    value={temas.idReferencia}
                                    onChange={(e) => setTemas({ ...temas, idReferencia: e.target.value,nsecion:props.nsecion })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite el {props.session}.
                                </Form.Control.Feedback>
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
type referencias = {
    selected: number,
    id: number,
    IdReferencia: number,
    referencias: number,
    title: string,
    onClick: (date: any) => void,
    onState: (date: Array) => void,
};
const TableInstrumentos = (props: referencias): React$Element<any> => {
    const [records, openCategoriass] = useState([]);
    const [data, cargarCategorias] = useState([]);
    const [signUpModal, setSignUpModal] = useState(false);

    useEffect(() => {
      let url = '';
        if (Number(props.IdReferencia) > 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            url = `${environment.baseURL}accion=instrumentos&opcion=consultar&idReferencia=${props.IdReferencia}&tipo=${props.nsecion}`;
        } else {
            url = `${environment.baseURL}accion=instrumentos&opcion=consultar&tipo=${props.nsecion}`;
        }

        const syllab = api.getDatos(`${url}`);
        syllab.then(function (resp) {
            if (resp) {
                //console.log(resp);
                openCategoriass(resp);
            } else {
                const records = [
                    {
                        IdCategorias: 1,
                        title: 'No existen referencia cargadas a este  categoria',
                        status: 'null',
                    },
                ];
                cargarCategorias(records);
            }
        });
    }, [props.IdReferencia, props.nsecion]);

    useEffect(() => {
        if (records && records.length > 0) {
            //const cur = JSON.parse(records);
            const mapped = [];
            mapped.push(records);
            cargarCategorias(mapped[0]);
        }
    }, [records]);

    const toggleSignUp = () => {
        if (props.IdReferencia > 0) {
            setSignUpModal(!signUpModal);
        } else {
            Swal.fire('Por favor,Seleccione de la lista una delas referencia para utilizar esta opción');
        }
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
                            <h4 className="header-title">No. {props.session}: {props.IdReferencia}</h4>

                            <Row>
                                <Col sm={4}>
                                    <FormActividades
                                        signUpModal={signUpModal}
                                        Close={Close}
                                        toggleSignUp={toggleSignUp}
                                        IdReferencia={props.IdReferencia}
                                        referencias={props.referencias}
                                        nsecion={props.nsecion}

                                    />
                                </Col>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TableInstrumentos;
