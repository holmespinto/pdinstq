/* eslint-disable import/first */
// @flow
import React,{ useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddEditEvent from './AddEditEvent';
import {REFERENCIAS_ITEMS} from './menu'
// components
// eslint-disable-next-line import/first
import PageTitle from '../../../components/PageTitle';
import TarjetasReferencias from '../components/TarjetasReferencias';

const ProjectDashboardPage = (): React$Element<React$FragmentType> => {
/*
     * modal handeling
     */
const [show, setShow] = useState(false);
const onCloseModal = () => {
    setShow(false);
    setEventData({});
    //setDateInfo({});
};
const onOpenModal = () => setShow(true);
const [isEditable, setIsEditable] = useState(false);

/*
 * event data
 */
// eslint-disable-next-line no-undef
//const [events, setEvents] = useState([...defaultEvents]);
const [eventData, setEventData] = useState({});
//const [dateInfo, setDateInfo] = useState({});


/*
calendar events
*/
// on date click
const onDateClick = (arg) => {
    console.log('onDateClick',)
    //setDateInfo(arg);
    onOpenModal();
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

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Projects', path: '/dashboard/project', active: true },
                ]}
                title={'Projects'}
            />
            <Row>
            {REFERENCIAS_ITEMS?.map((p, index) => (
            <Col xxl={3} lg={6} key={index}>
                    <TarjetasReferencias
                        icon="mdi mdi-currency-btc bg-danger rounded-circle text-white"
                        description="Number of Customers"
                        title={p.title}
                        IdBasket={p.IdBasket}
                        inventario={p.inventario}
                        onDateClick={onDateClick}
                        trend={{
                            textClass: p.textClass,
                            icon: 'mdi mdi-arrow-down-bold',
                            stock:p.stock,
                            time: p.description,
                        }}></TarjetasReferencias> 
                </Col>
                ))} 
            </Row>
                        {/* add new event modal */}
                {show ? (
                <AddEditEvent
                isOpen={show}
                onClose={onCloseModal}
                isEditable={isEditable}
                eventData={eventData}
                onUpdateEvent={onUpdateEvent}
                onRemoveEvent={onRemoveEvent}
                onAddEvent={onAddEvent}
                />
            ) : null}
        </React.Fragment>
    );
};

export default ProjectDashboardPage;
