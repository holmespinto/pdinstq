// @flow
import React from 'react';
import { Card, Button, Table } from 'react-bootstrap';

const Products = (props)=> {
    return (
      <>
        <Card>
            <Card.Body>
                <Button variant="link" className="float-end">
                    Export <i className="mdi mdi-download ms-1"></i>
                </Button>

                <h4 className="header-title mt-2 mb-3">Categorias más Solicitadas</h4>

                <Table hover responsive className="mb-0">
                    <tbody>
                    {
                    props.listascategorias?.map((p, index) => (
                        <tr>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">{p.title}</h5>
                            </td>
                            <td>
                                <h5 className="font-14 my-1 fw-normal">{p.total}</h5>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
         </>);
};

export default Products;
