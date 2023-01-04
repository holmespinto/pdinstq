import React, { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form';
import { Card, Col, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Swal from 'sweetalert2'
import 'nouislider/distribute/nouislider.css';
// components
import Count from './Count';
import {getpedidos} from './filter';
import DeleteItem from '../Project/DeleteItems'
import { getnumbercategorias } from '../components/filter';

const TableItems = (props) => {
  const [descuento,setdescuento] = useState({idrow:0,descuento:0});

  useEffect(() => {
    setdescuento({idrow:props.categories[0]?.rowid,
      descuento:props.categories[0]?.value})
}, [props.categories]);

const totalCan = getnumbercategorias(props.IdCategorias,props.idUser)
    return (
        <>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                        <tr>Número de elementos seleccionadas: {totalCan?totalCan:0}</tr>
                            <tr>
                                <th>#</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Disponibles</th>
                                <th>{props.IdCategorias === 1 ?'':'Seleccionado'}</th>

                            </tr>

                        </thead>
                        <tbody>
                            {
                            props.data[0]?.map((record, index) => {
                            const apartado = props.IdCategorias === 1 ? 1:getpedidos(record.id,props.IdCategorias,props.idUser)
                                return (
                                    <tr key={index}>
                                        {record.id === descuento.idrow ? (
                                            <>
                                                <th scope="row">{record.id}</th>
                                                <td>{record.title}</td>
                                                <td>{record.cantidad}</td>
                                                <td>{props.IdCategorias === 1 ?record.cantidad :record.cantidad-descuento.descuento}</td>
                                                <td>
                                                {props.IdCategorias !== 1 ? (
                                                <Count
                                                        IdCategorias={props.IdCategorias}
                                                        title={record.title}
                                                        defaultValue={apartado}
                                                        cantidad={record.cantidad}
                                                        idUser={props.idUser}
                                                        onDateValueCategories={props.onDateValueCategories}
                                                        counter={{ ...props.data}}
                                                        rowid={record.id}>
                                                        </Count>
                                                ):''
                                                }
                                                </td>

                                            </>
                                        ) : (
                                            <>
                                                <th scope="row">{record.id}</th>
                                                <td>{record.title}</td>
                                                <td>{record.cantidad}</td>
                                                <td>{props.IdCategorias === 1 ?record.cantidad :record.cantidad-apartado}</td>
                                                <td>
                                                {props.IdCategorias !== 1 ? (
                                                    <Count
                                                        IdCategorias={props.IdCategorias}
                                                        title={record.title}
                                                        defaultValue={apartado}
                                                        cantidad={record.cantidad}
                                                        idUser={props.idUser}
                                                        onDateValueCategories={props.onDateValueCategories}
                                                        counter={{ ...props.data}}
                                                        rowid={record.id}></Count>
                                                        ):''
                                                      }
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Col className="text-end">
                        <Link
                            to={`/dashboard/calendario/horario?p=${props.IdCategorias}`}
                            className="btn btn-link btn-lg text-muted shadow-none">
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip>
                                        <u>Apartar</u> <em>Canasta</em> <b>de esta referencia</b>
                                    </Tooltip>
                                }>
                                <i className="dripicons-archive"></i>
                            </OverlayTrigger>
                        </Link>
                        <DeleteItem IdCategoria={props.IdCategorias}/>
                    </Col>
                </Card.Body>
            </Card>
        </>
    );
};
export default TableItems;
