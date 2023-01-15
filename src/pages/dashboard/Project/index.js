/* eslint-disable import/first */
// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Tab, Card, Nav, Alert } from 'react-bootstrap';
import AddEditReferencia from '../components/AddEditReferencia';
import classnames from 'classnames';
//import {CATEGORIAS_ITEMS} from './menu'
// components
// eslint-disable-next-line import/first
import Estadisticas from '../estadisticas/';
import PageTitle from '../../../components/PageTitle';
import ListaPrestamos from '../calendario/ListaPrestamos';
import TarjetasReferencias from '../components/TarjetasReferencias';
import ListaReferencias from '../components/ListaReferencias';
import { getItemStorage } from '../components/itemStorage';
import { environment } from '../../../environments/environments';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();
const ProjectDashboardPage = () => {
  /*
       * modal handeling
       */
  const [show, setShow] = useState(false);
  const [showlist, setShowLista] = useState(false);
  const [autor, setAutor] = useState();
  const [role, setRol] = useState();
  const onCloseModalList = () => {
    setShowLista(false);
    setEventData({});
    //setDateInfo({});
  };
  const onCloseModal = () => {
    setShow(false);
    setEventData({});
    //setDateInfo({});
  };
  const onOpenModal = () => setShow(true);
  const onOpenModalLista = () => setShowLista(true);
  const [isEditable, setIsEditable] = useState(false);
  const [categorias, setCategorias] = useState([]);
  //const [instrumentos, setInstrumentos] = useState(0);
  /*
   * event data
   */
  const [eventData, setEventData] = useState({});
  const [listData, setListData] = useState({});
  const [referencias, setReferencias] = useState({});
  const [idcategoria, setIdCategoria] = useState(0);
  /*
  calendar events
  */
  // on date click
  const onDateClick = (arg) => {
    onOpenModal();
    setShowLista(false);
    setIsEditable(false);
    setEventData(arg);

  };
  const onListaClick = (arg) => {
    setShow(false);
    onOpenModalLista();
    setListData(arg);
    setIdCategoria(arg[0]?.IdCategorias)
  };

  /*
  on add event
  */
  const onAddEvent = (data) => {
    onCloseModal();
  };

  /*
  on update event
  */
  const onUpdateEvent = (data) => {
    onCloseModal();
  };

  /*
  on remove event
  */
  const onRemoveEvent = () => {
    onCloseModal();
  };

  useEffect(() => {
    if (categorias.length > 0) {
      const user = getItemStorage({
        typeOfStorage: localStorage,
        item: 'user',
      })
      setAutor(user.id);
      setRol(user.role);

    }
  }, [categorias]);

  useEffect(() => {
    const url = `${environment.baseURL}accion=instcategorias&opcion=consultar`
    const datos = api.getDatos(`${url}`);
    datos.then(function (resp) {
      if (resp?.length > 0) {
        setCategorias(resp);
      }
    });
  }, []);
  useEffect(() => {
    const url = `${environment.baseURL}accion=instreferencias&opcion=consultar`;
    const syllab = api.getDatos(`${url}`);
    syllab.then(function (resp) {
      if (resp) {
        setReferencias(resp);
      }
    });
  }, []);
  const tabContents = [
    {
      id: '1',
      title: 'Clasificación',
      icon: 'mdi mdi-home-variant',
      text: 'Clasificación por Categorias',
    },
    {
      id: '2',
      title: 'Estadisticas',
      icon: 'mdi mdi-chart-bar',
      text: 'En esta session puedes consultar las estadisticas de los préstamos de Instrumentos',
    }
    ,
    {
      id: '3',
      title: 'Reportes',
      icon: 'mdi mdi-calendar-search',
      text: 'En esta session puedes consultar los reportes del préstamos, devoluciones y estados de las categorias',
    }
  ];
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/' },
          { label: 'Categorias', path: '/dashboard/project', active: true },
        ]}
        title={'Bienvenidos'}
      />
      <Row>
        <Card>
          <Card.Body>
            <Tab.Container defaultActiveKey="Clasificación">
              <Nav variant="tabs" className="nav-bordered" as="ul">
                {tabContents.map((tab, index) => {
                  return (
                    <Nav.Item as="li" key={index}>
                      <Nav.Link href="#" eventKey={tab.title} >
                        <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">{tab.title}</span>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                {tabContents.map((tab, index) => {
                  return (
                    <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                      <Row>
                        <Col sm="12 mt-1">
                          <Alert variant={'success'}>
                            <i className={('dripicons-information', 'me-2 pd-1')}></i>
                            <strong>{tab.text}</strong>
                          </Alert>
                          {(() => {
                            switch (index) {
                              case 0:
                                return (<Row>
                                  {categorias?.map((p, index) => (
                                    <Col xxl={3} lg={6} key={index}>
                                      <TarjetasReferencias
                                        icon={p?.inventario > p.reservado ? 'bg-success rounded-circle text-white w-27 ms-1 p-1' : 'bg-danger rounded-circle text-white w-27 ms-1 p-1'}
                                        description="Number of Customers"
                                        // eslint-disable-next-line no-undef
                                        title={p?.title.toUpperCase()}
                                        totalcantidad={p?.inventario}
                                        IdCategorias={p?.IdCategorias}
                                        totalreservado={p?.reservado}
                                        onDateClick={onDateClick}
                                        onListaClick={onListaClick}
                                        trend={{
                                          textClass: 'badge bg-info',
                                          icon: 'mdi mdi-arrow-down-bold',
                                          stock: p?.inventario,
                                          time: p?.description,
                                        }}
                                        idUser={autor}
                                        role={role}
                                      ></TarjetasReferencias>
                                    </Col>
                                  ))}
                                </Row>);
                              case 1:
                                return (
                                  <Estadisticas />
                                );
                              case 2:
                                return (<ListaPrestamos/>);
                              default:
                                return (
                                  'defould'
                                );
                            }
                          })()}
                        </Col>
                      </Row>
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Row>
      {/* add new event modal */}
      {show ? (
        <AddEditReferencia
          isOpen={show}
          onClose={onCloseModal}
          isEditable={isEditable}
          eventData={eventData}
          onUpdateEvent={onUpdateEvent}
          onRemoveEvent={onRemoveEvent}
          onAddEvent={onAddEvent}
          idUser={autor}
        />
      ) : null}
      {showlist ? (
        <ListaReferencias
          isOpenlist={showlist}
          onClose={onCloseModalList}
          referencias={referencias}
          listData={listData}
          idUser={autor}
          IdCategorias={idcategoria}
        />
      ) : null}
    </React.Fragment>
  );
};

export default ProjectDashboardPage;
