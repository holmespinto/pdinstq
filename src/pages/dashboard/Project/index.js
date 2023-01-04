/* eslint-disable import/first */
// @flow
import React,{ useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddEditReferencia from '../components/AddEditReferencia';
import {CATEGORIAS_ITEMS} from './menu'
// components
// eslint-disable-next-line import/first
import PageTitle from '../../../components/PageTitle';
import TarjetasReferencias from '../components/TarjetasReferencias';
import ListaReferencias from '../components/ListaReferencias';

const ProjectDashboardPage = (): React$Element<React$FragmentType> => {
/*
     * modal handeling
     */
const [show, setShow] = useState(false);
const [showlist, setShowLista] = useState(false);
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
/*
 * event data
 */
// eslint-disable-next-line no-undef
//const [events, setEvents] = useState([...defaultEvents]);
const [eventData, setEventData] = useState({});
const [listData, setListData] = useState({});
//const [dateInfo, setDateInfo] = useState({});
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
    /*
    const event = {
        id: parseInt(arg.event.id),
        title: arg.event.title,
        start: arg.event.start,
        className: arg.event.classNames[0],
    };
    */
    setEventData(arg);
    //setListData(arg);
};
const onListaClick = (arg) => {
    setShow(false);
    //console.log('onDateClick',arg)
    onOpenModalLista();
    setListData(arg);
};

// on event click
/*
const onEventClick = (arg) => {
    const event = {
        id: parseInt(arg.event.id),
        title: arg.event.title,
        start: arg.event.start,
        className: arg.event.classNames[0],
    };
    setEventData(event);
    onOpenModal();
    setIsEditable(true);
};
*/
/*
on add event
*/
const onAddEvent = (data) => {
   /* const modifiedEvents = [...events];
    const event = {
        id: modifiedEvents.length + 1,
        title: data.title,
        start: dateInfo ? dateInfo.date : new Date(),
        className: data.className,
    };

    modifiedEvents.push(event);
    setEvents(modifiedEvents);
    */
    onCloseModal();
};

/*
on update event
*/
const onUpdateEvent = (data) => {
    /*
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
    modifiedEvents[idx]['title'] = data.title;
    modifiedEvents[idx]['className'] = data.className;
    setEvents(modifiedEvents);
    */
    onCloseModal();
};

/*
on remove event
*/
const onRemoveEvent = () => {
     /*
    var modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
    modifiedEvents.splice(idx, 1);
    setEvents(modifiedEvents);
    */
    onCloseModal();
};
//console.log('showlist',showlist,'show',show)
const idUser = 1;

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
            {CATEGORIAS_ITEMS?.map((p, index) => (

            <Col xxl={3} lg={6} key={index}>
                    <TarjetasReferencias
                        icon={p.totalcantidad>p.totalreservado ? 'bg-success rounded-circle text-white w-27 ms-1 p-1' : 'bg-danger rounded-circle text-white w-27 ms-1 p-1'}
                        description="Number of Customers"
                        // eslint-disable-next-line no-undef
                        title={p.title.toUpperCase()}
                        totalcantidad={p.totalcantidad}
                        IdCategorias={p.IdCategorias}
                        totalreservado={p.totalreservado}
                        onDateClick={onDateClick}
                        onListaClick={onListaClick}
                        trend={{
                            textClass: 'badge bg-info',
                            icon: 'mdi mdi-arrow-down-bold',
                            stock:p.stock,
                            time: p.description,
                        }}
                        data={{
                            IdCategorias:p.IdCategorias,
                            title:p.title,
                            canastas:[p?.canastas]
                        }}
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
                />
            ) : null}
            {showlist ? (
                <ListaReferencias
                isOpenlist={showlist}
                onClose={onCloseModalList}
                listData={listData}
                idUser={idUser}
                />
            ) : null}
              </React.Fragment>
    );
};

export default ProjectDashboardPage;
