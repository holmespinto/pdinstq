// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '@fullcalendar/react';
import { Draggable } from '@fullcalendar/interaction';
import classNames from 'classnames';
import { environment } from '../../../environments/environments';
import Swal from 'sweetalert2';
// components
import PageTitle from '../../../components/PageTitle';
import { setItemStorage,getItemStorage } from '../components/itemStorage.ts';

import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';
import {getHora} from './functions';

// dummy data
import { defaultEvents, docentes } from './data';
import { ESTADOS } from '../Project/menu';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();
const SidePanel = () => {

    return (
        <>
            <div id="external-events" className="m-t-20">
                <br />
                <p className="text-muted">Estados de Solicitudes</p>
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
  const localusers = getItemStorage({
    typeOfStorage: localStorage,
    item: 'user',
  })
  const [users] = useState(localusers);

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
    const [autor, setAutor] = useState(0);
    const [listdocentes,setListaDocente] = useState(docentes);

    /*
     * event data
     */

    const [eventData, setEventData] = useState({});
    const [dateInfo, setDateInfo] = useState({});
    const [categoriaList, setCategoriaList] = useState([]);
    const [classnames, setClassName] = useState('');
    const [todoData, setTodoData] = useState([
        {
            id: 1,
            text: '',
        },
    ]);
    const [reuniones, setReuniones] = useState([]);
    const [events, setEvents] = useState([...defaultEvents]);
    useEffect(() => {
        // create dragable events
        let draggableEl = document.getElementById('external-events');
        new Draggable(draggableEl, {
            itemSelector: '.external-event',
        });
    }, []);

    const getClassName = (arg) => {
       // eslint-disable-next-line array-callback-return
       const estados = Object.keys(ESTADOS)?.map((key) => {
        return ESTADOS[key]?.className;
        });
        setClassName(estados[Number(arg?.target?.value-1)]);
    }

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
            end: arg.event.end,
            className: arg.event.classNames[0],
            asignar: arg.event.extendedProps.asignar,
            idCategoria: arg.event.extendedProps.idCategoria,
            estado: arg.event.extendedProps.estado,
            idUser:users.id
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
                end: dropEventData ? dropEventData.dateStr : new Date(),
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

      // eslint-disable-next-line array-callback-return
      const estados = Object.keys(ESTADOS)?.map((key) => {
              return ESTADOS[key]?.className;
      });

      const launchDate = dateInfo ? dateInfo.date : new Date();
      const futureDate= getHora(launchDate)

        const modifiedEvents = [...events];
        const event = {
            id: modifiedEvents.length + 1,
            title: data.title,
            start: launchDate,
            end: futureDate,
            className: estados[Number(data.estado-1)],
            idCategoria: idscategorias.join(','),
            titleCategoria: categorias.join(','),
            asignar: data.asignar,
            estado:data.estado,
            idUser:users.id,
            IdCategorias:idCategoria
        };
        modifiedEvents.push(event);
        setEvents(modifiedEvents);
        const datosfiles =event
        const queryDatos = datosfiles
        ? Object.keys(datosfiles)
              .map((key) => key + '=' + datosfiles[key])
              .join('&')
        : '';
        const url = `${environment.baseURL}accion=calendario&opcion=guardar&${queryDatos}`;
        const respuesta = api.getDatos(`${url}`);
        respuesta.then(function (resp) {
            if (resp) {
                Swal.fire('' + resp[0].menssage + '');
            }
        });
      /*
        const categ = [];
        for (let i = 0; i < idscategorias.length; i++) {
            if (idscategorias[i])
                categ.push({
                    id: modifiedEvents.length + 1,
                    title: data.title,
                    start: dateInfo ? dateInfo.date : new Date(),
                    className: estados[Number(data.estados-1)],
                    idCategoria: idscategorias.join(','),
                    titleCategoria: categorias.join(','),
                    asignar: data.asignar,
                });
        }
        */
        setItemStorage({
            data: modifiedEvents,
            item: 'storesDataCalendary',
            typeOfStorage: localStorage,
        });
        //
        onCloseModal();
    };

    /*
    on update event
    */
    const onUpdateEvent = (data) => {
console.log('data',data)
       // eslint-disable-next-line array-callback-return
       const estados = Object.keys(ESTADOS)?.map((key) => {
          return ESTADOS[key]?.className;
          });
        const modifiedEvents = [...reuniones];

        const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
        modifiedEvents[idx]['className'] = estados[Number(data?.estado-1)];
        modifiedEvents[idx]['estado'] = data?.estado;
        modifiedEvents[idx]['asignar'] = data?.asignar;
        modifiedEvents[idx]['IdCategorias'] = idCategoria;
        const queryDatos = modifiedEvents
        ? Object.keys(modifiedEvents[idx])
              .map((key) => key + '=' + modifiedEvents[idx][key])
              .join('&')
        : '';
        const url = `${environment.baseURL}accion=calendario&opcion=actualizar&${queryDatos}`;
        const respuesta = api.getDatos(`${url}`);
        respuesta.then(function (resp) {
            if (resp) {
                Swal.fire('' + resp[0].menssage + '');
            }
        });
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

    useEffect(() => {
      setAutor(users.id);
      if(users.id===1){
        setListaDocente(docentes)
      }else{
        setListaDocente([users])
      }
    }, [users]);

    useEffect(() => {
      const url = `${environment.baseURL}accion=calendario&opcion=consultar`;
      const calend = api.getDatos(`${url}`);
      calend.then(function (resp) {
          if (resp) {
            setEvents(resp)
          }
      });
    }, []);

    useEffect(() => {
      let category=[]
      // eslint-disable-next-line array-callback-return
      Object.keys(events)?.map((key) => {
        const guardados={
          id: Number(events[key]?.id),
          title: events[key]?.title,
          start:new Date(events[key]?.start),
          end: new Date(events[key]?.end),
          className:events[key]?.className,
          idCategoria: events[key]?.idCategoria,
          titleCategoria: events[key]?.titleCategoria,
          asignar:events[key]?.asignar,
          estado:events[key]?.estado,
          idUser:events[key]?.idUser,
      }
        category.push(guardados)
      })
        setReuniones(category)
    }, [events]);
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
                                    <SidePanel />
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    {/* fullcalendar control */}
                                    <Calendar
                                        onDateClick={onDateClick}
                                        onEventClick={onEventClick}
                                        onDrop={onDrop}
                                        events={reuniones}
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
                    docentes={listdocentes}
                    idCategoria={idCategoria}
                    idUser={autor}
                    categoriaList={categoriaList}
                    getClassName={getClassName}
                    classnamed={classnames}
                />
            ) : null}
        </>
    );
};

export default CalendarApp;
