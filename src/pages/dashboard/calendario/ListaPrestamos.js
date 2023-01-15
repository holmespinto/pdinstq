// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import classNames from 'classnames';
// components
import { environment } from '../../../environments/environments';
import Table from '../../../components/Table';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();
//var jwt = require('jsonwebtoken')
/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-success': row.original?.estado,
                    'bg-danger': !row.original?.estado,
                })}>
                {row.original.estado ? 'Active' : 'Deactivated'}
            </span>
        </React.Fragment>
    );
};
/* action column render */
const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Elementos',
        accessor: 'title',
        sort: true,
    },
    {
        Header: 'Asignado',
        accessor: 'asignar',
        sort: true,
    },{
        Header: 'Estado',
        accessor: 'estado',
        sort: true,
    },{
        Header: 'Mes',
        accessor: 'mes',
        sort: true,
    },{
        Header: 'Dia',
        accessor: 'dia',
        sort: true,
    }
    ,{
      Header: 'Hora Inicial',
      accessor: 'horainicial',
      sort: true,
    },{
      Header: 'Hora Final',
      accessor: 'horafinal',
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


const ListaUsuarios = (props) => {
    const [records, openCategoriass] = useState([]);
    const [data, cargarCategorias] = useState([]);

    useEffect(() => {
        const url = `${environment.baseURL}accion=calendario&opcion=consultarall`;
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


    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Reporte de Solicitudes y Estados</h4>
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

export default ListaUsuarios;
