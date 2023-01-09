/* eslint-disable import/first */
// @flow
import React,{ useState,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddEditReferencia from '../components/AddEditReferencia';
import {CATEGORIAS_ITEMS} from './menu'
// components
// eslint-disable-next-line import/first
import PageTitle from '../../../components/PageTitle';
import TarjetasReferencias from '../components/TarjetasReferencias';
import ListaReferencias from '../components/ListaReferencias';
import { getItemStorage } from '../components/itemStorage';
import { environment } from '../../../environments/environments';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();
const ProjectDashboardPage = (): React$Element<React$FragmentType> => {
/*
     * modal handeling
     */
const [show, setShow] = useState(false);
const [showlist, setShowLista] = useState(false);
const [autor, setAutor] = useState(0);
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

/*
calendar events
*/
// on date click
const onDateClick = (arg) => {
   // console.log('onDateClick',arg)
    //setDateInfo(arg);
    onOpenModal();
    setShowLista(false);
    setIsEditable(false);
    setEventData(arg);
    //setListData(arg);
};
const onListaClick = (arg) => {
    setShow(false);
    //console.log('onDateClick',arg)
    onOpenModalLista();
    setListData(arg);
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
  const user = getItemStorage({
    typeOfStorage: localStorage,
    item: 'user',
  })
  setAutor(user.id);
}, []);

useEffect(() => {
  const url = `${environment.baseURL}accion=instcategorias&opcion=consultar`
  const datos = api.getDatos(`${url}`);
  datos.then(function (resp) {
      if (resp.length>0) {
          setCategorias(resp);
      }
  });
}, []);

console.log('instcategorias',categorias)
return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Categorias', path: '/dashboard/project', active: true },
                ]}
                title={'Categorias'}
            />
            <Row>
            {categorias?.map((p, index) => (
            <Col xxl={3} lg={6} key={index}>
                  <span >{p?.IdCategorias}</span>
                    <TarjetasReferencias
                        icon={p?.inventario>p.reservado ? 'bg-success rounded-circle text-white w-27 ms-1 p-1' : 'bg-danger rounded-circle text-white w-27 ms-1 p-1'}
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
                            stock:p?.inventario,
                            time: p?.description,
                        }}
                        idUser={autor}
                        ></TarjetasReferencias>
                </Col>
                ))}
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
                listData={listData}
                idUser={autor}
                />
            ) : null}
              </React.Fragment>
    );
};

export default ProjectDashboardPage;
