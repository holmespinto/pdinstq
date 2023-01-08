import React, {useEffect,useState} from 'react';

import { Row, Col, Card } from 'react-bootstrap';
//import classnames from 'classnames';

// components
import { FormInput } from '../../../components';
import { environment } from '../../../environments/environments';
import TableInstrumentos from '../components/TableInstrumentos';

import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

const SelectReferencias = (props) => {
  const [referencias, setReferencias] = useState([]);
  useEffect(() => {
    const url =  props.nsecion!==1? `${environment.baseURL}accion=instreferencias&opcion=consultar`:`${environment.baseURL}accion=instcategorias&opcion=consultar`
    const syllab = api.getDatos(`${url}`);
    syllab.then(function (resp) {
        if (resp) {
            setReferencias(resp);
        } else {
            const records = [
                {
                    IdCategorias: 1,
                    title: 'No existen referencia cargadas a este  categoria',
                    status: 'null',
                },
            ];
            setReferencias(records);
        }
    });
  }, [props]);

  //console.log('idRef',props.idRef)
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col sm="12 mt-1">
                            <FormInput
                                type="select"
                                label={props.session}
                                name="Referencias"
                                className="form-control"
                                containerClass={'mb-3'}
                                key="title"
                                onChange={(e) => {
                                    props.onDateReferencias(e.target.value);
                                }}>
                                {referencias?.map((p, index) => {
                                    return (
                                        <option value={ props.nsecion===1?p.IdCategorias:p.id} key={index}>
                                            { props.nsecion===1 && index===0?'Seleccione el instrumento':p.title}
                                        </option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                        <TableInstrumentos IdReferencia={props.idRef} referencias={referencias} session={props.session} nsecion={props.nsecion}/>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};
export default SelectReferencias;
