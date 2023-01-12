import React, { useEffect, useState } from 'react';
//import { useForm } from 'react-hook-form';
import { Row, Col, Tab, Card, Nav, Alert } from 'react-bootstrap';
import classnames from 'classnames';

// components
import { FormInput } from '../../../components';
import ListaCanastasTable from './ListaCanastasTable';
import ListaCanastasAdd from './ListaCanastasAdd';
import { allCanastas } from '../calendario/functions';
//import {getItemStorage } from './itemStorage.ts';

const tabContents = [
  {
    id: '1',
    title: 'Apartar Canasta',
    icon: 'mdi mdi-home-variant',
    text: 'En esta session puedes adjuntar las canastas',
  },
  {
    id: '2',
    title: 'Consultar',
    icon: 'mdi mdi-account-circle',
    text: 'Además de consultar;tambien,puedes cancelar tus canastas en esta sessión.',
  },
];
const TabPaneCanastas = (props) => {
const [canastasadd, setCanastasAdd] = useState([]);


  useEffect(() => {
    let titulos = []
    let obj = {}
    const ids = allCanastas(props.idUser);
    if (ids.length>0) {

      // eslint-disable-next-line array-callback-return
      ids?.map((id, index) => {
        if (Number(id)>=0)
        obj={
          "IdCategorias": props.referencias[id]?.IdCategorias,
          "id": props.referencias[id]?.id,
          "idUser": props.idUser,
          "rowid":props.referencias[id]?.id,
          "value":props.referencias[id-1]?.title
        }
          titulos.push(obj);
      });
    setCanastasAdd(titulos)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  return (
    <>
      <Card>
        <Card.Body>
          <Tab.Container defaultActiveKey="Profile">
            <Nav variant="tabs" className="nav-bordered" as="ul">
              {tabContents.map((tab, index) => {
                return (
                  <Nav.Item key={index} as="li">
                    <Nav.Link href="#" eventKey={tab.title}>
                      <i
                        className={classnames(
                          tab.icon,
                          'd-md-none',
                          'd-block',
                          'me-1'
                        )}></i>
                      <span className="d-none d-md-block">{tab.title}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
              {tabContents.map((tab, index) => {
                return (
                  <>
                    {index === 0 ? (
                      <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                        <Row>
                          <Col sm="12 mt-1">
                          <Alert variant={'success'}>
                            <i className={('dripicons-information','me-2 pd-1')}></i><strong>{tab.text}</strong>
                          </Alert>
                            <FormInput
                              type="select"
                              label="Referencias"
                              name="Referencias"
                              className="form-control"
                              containerClass={'mb-3'}
                              key="title"
                              onChange={(e) => {
                                props.onDateReferencias(
                                  Number(e.target.value),
                                  props?.referencias
                                );
                              }}>
                              {props.referencias?.map((p, index) => {
                                if(p.status==='Active')
                                return (
                                  <option value={p.id} key={index}>
                                   {p.status} {p.title}
                                  </option>
                                );
                              })}
                            </FormInput>
                            <ListaCanastasTable
                              data={props.data}
                              onDateValueCategories={props.onDateValueCategories}
                              IdCategorias={props.list?.IdCategorias}
                              idUser={props.idUser}
                              title={props.listData?.title}
                            />
                          </Col>
                        </Row>
                      </Tab.Pane>
                    ) : (
                      <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                        <Row>
                          <Col sm="12 mt-1">
                          <Alert variant={'success'} key={index}>
                            <i className={('dripicons-information','me-2 pd-1')}></i><strong>{tab.text}</strong>
                        </Alert>

                            <div className="accordion custom-accordion">
                                {
                                canastasadd?.map((item, index) => {

                                    return <ListaCanastasAdd
                                    key={index}
                                    itemid={item.id}
                                    item={item.value}
                                    items={item.items}
                                    itemscanasta={[]}
                                    idUser={props.idUser}
                                   />;
                                })}
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    )}
                  </>
                );
              })}
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
};
export default TabPaneCanastas;
