// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '@fullcalendar/react';
import { Draggable } from '@fullcalendar/interaction';
import classNames from 'classnames';

// components
import PageTitle from '../../../components/PageTitle';
import { setItemStorage } from '../components/itemStorage.ts';

import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';

// dummy data
import { defaultEvents, docentes } from './data';
import { ESTADOS } from '../Project/menu';

const SidePanel = () => {


    return (
        <>
            <div id="external-events" className="m-t-20">
                <br />
                <p className="text-muted">Drag and drop your event or click in the calendar</p>
                {/* external events */}
                {ESTADOS.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames('external-event', event.className + '-lighten', event.textClass)}
                            title={event.title}
                            data={event.className}>
                            <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                            {event.title}
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 d-none d-xl-block">
                <h5 className="text-center">How It Works ?</h5>

                <ul className="ps-3">
                    <li className="text-muted mb-3">
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </li>
                    <li className="text-muted mb-3">
                        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                        the more obscure Latin words, consectetur, from a Lorem Ipsum passage.
                    </li>
                    <li className="text-muted mb-3">
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </li>
                </ul>
            </div>
        </>
    );
};

type CalendarAppState = {
    show?: boolean,
    isEditable?: boolean,
    events?: Array<any>,
    eventData?: any,
    dateInfo?: any,
};

const CalendarApp = (state: CalendarAppState): React$Element<React$FragmentType> => {
    /*
     * modal handeling
     */
    const [show, setShow] = useState(false);
    const [idCategoria, setIdCategoria] = useState(0);
    const onCloseModal = () => {
        setShow(false);
        setEventData({});
        setDateInfo({});
    };
    const onOpenModal = () => setShow(true);
    const [isEditable, setIsEditable] = useState(false);

    /*
     * event data
     */
    const [events, setEvents] = useState([...defaultEvents]);
    const [eventData, setEventData] = useState({});
    const [dateInfo, setDateInfo] = useState({});
    const [categoriaList, setCategoriaList] = useState([]);
    const [todoData, setTodoData] = useState([
        {
            id: 1,
            text: '',
        },
    ]);

    useEffect(() => {
        // create dragable events
        let draggableEl = document.getElementById('external-events');
        new Draggable(draggableEl, {
            itemSelector: '.external-event',
        });
    }, []);

    const setMultiSelections = (arg,arg2) => {
        if (arg?.target?.value) {

            let newTodo = [...todoData];
            newTodo.push({
                id: todoData.length + 1,
                text: arg?.target?.value,
            });

            // eslint-disable-next-line array-callback-return
            const filter = arg2.filter(item => {
              if (item.value !== arg?.target?.value) {
                return item
              }
            })
            setCategoriaList(filter)
            setTodoData(newTodo);
        }
    };
    /*
    calendar events
    */
    // on date click
    const onDateClick = (arg) => {
        setDateInfo(arg);
        onOpenModal();
        setIsEditable(false);
    };

    // on event click
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

    // on drop
    const onDrop = (arg) => {
        const dropEventData = arg;
        const title = dropEventData.draggedEl.title;
        if (title == null) {
        } else {
            let newEvent = {
                id: events.length + 1,
                title: title,
                start: dropEventData ? dropEventData.dateStr : new Date(),
                className: dropEventData.draggedEl.attributes.data.value,
            };
            const modifiedEvents = [...events];
            modifiedEvents.push(newEvent);

            setEvents(modifiedEvents);
        }
    };

    /*
    on add event
    */
    const onAddEvent = (data, idscategorias, categorias) => {
        const modifiedEvents = [...events];
        const event = {
            id: modifiedEvents.length + 1,
            title: data.title,
            start: dateInfo ? dateInfo.date : new Date(),
            className: data.className,
            idCategoria: idscategorias.join(','),
            titleCategoria: categorias.join(','),
            asignar: data.asignar,
        };
        modifiedEvents.push(event);
        setEvents(modifiedEvents);
        const categ = [];
        for (let i = 0; i < idscategorias.length; i++) {
            if (idscategorias[i])
                categ.push({
                    id: modifiedEvents.length + 1,
                    title: data.title,
                    start: dateInfo ? dateInfo.date : new Date(),
                    className: data.className,
                    idCategoria: idscategorias.join(','),
                    titleCategoria: categorias.join(','),
                    asignar: data.asignar,
                });
        }
        setItemStorage({
            data: categ[0],
            item: 'storesDataCalendary',
            typeOfStorage: localStorage,
        });
        //console.log(categ[0]);
        onCloseModal();
    };

    /*
    on update event
    */
    const onUpdateEvent = (data) => {
        const modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
        modifiedEvents[idx]['title'] = data.title;
        modifiedEvents[idx]['className'] = data.className;
        setEvents(modifiedEvents);
        onCloseModal();
    };

    /*
    on remove event
    */
    const onRemoveEvent = () => {
        var modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
        modifiedEvents.splice(idx, 1);
        setEvents(modifiedEvents);
        onCloseModal();
    };

    useEffect(() => {
        const pagesInSearch = () => {
            const query = window.location.search;
            const idurl = query?.replace(/\?p=/g, '');
            setIdCategoria(Number(idurl));
        };
        pagesInSearch();
    }, []);
    const idUser = 1;
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'dashboard', path: '/dashboard/calendar' },
                    { label: 'Calendar', path: '/dashboard/calendar', active: true },
                ]}
                title={'Calendar'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={3}>
                                    <div className="d-grid">
                                        {/* add events
                                        <Button
                                            className="btn btn-lg font-16 btn-danger"
                                            id="btn-new-event"
                                            onClick={onOpenModal}>
                                            <i className="mdi mdi-plus-circle-outline"></i> Create New Event
                                        </Button>
                                        */}
                                    </div>

                                    <SidePanel />
                                </Col>
                                <Col lg={9}>
                                    {/* fullcalendar control */}
                                    <Calendar
                                        onDateClick={onDateClick}
                                        onEventClick={onEventClick}
                                        onDrop={onDrop}
                                        events={events}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
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
                    setMultiSelections={setMultiSelections}
                    todoData={todoData}
                    docentes={docentes}
                    idCategoria={idCategoria}
                    idUser={idUser}
                    categoriaList={categoriaList}
                />
            ) : null}
        </>
    );
};

export default CalendarApp;
