// @flow
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { FormInput } from '../../../components/';
import { allTitles, allIds } from './functions';
import { ESTADOS } from '../Project/menu';
import {SelectTitulosCategorias } from '../calendario/functions';

type AddEditEventProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    eventData?: any,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
    multiSelections?: any,
    setMultiSelections: (value: any) => void,
};

const AddEditEvent = ({
    isOpen,
    onClose,
    isEditable,
    eventData,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
    todoData,
    setMultiSelections,
    docentes,
    idCategoria,
    idUser,
    categoriaList,
    getClassName,
    classnamed
}: AddEditEventProps): React$Element<any> => {
    // event state
    const [event] = useState(eventData);
    const [categorias, setCategorias] = useState('');
    const [idscategorias, setIdsCategorias] = useState('');
    const [titulos, setTitulos] = useState('');
    const [opcionesCategorias, setOpcionesCategorias] = useState([]);
    const [opcionesEstados, setOpcionesEstados] = useState([]);
    const [estados, setEstados] = React.useState(0);
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('Por favor, adjunte las categorias'),
            className: yup.string().required('Por favor, selecione la categoria'),
            asignar: yup.string().required('Por favor, selecione el Docente'),
            estado: yup.string().required('Por favor, selecione el Estado'),
        })
    );

    /*
     * form methods
     */

    const methods = useForm({ defaultValues: event, resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    // default todo data

    useEffect(() => {
        const titulosUnicos = allTitles(todoData);
        const idsUnicos = allIds(todoData);
        setCategorias(titulosUnicos);
        setIdsCategorias(idsUnicos);
        document.getElementById('title')?.focus();

    }, [todoData]);

    /*
     * handle form submission
     */
    const onSubmitEvent = (data) => {
      console.log(data);
      isEditable ? onUpdateEvent(data) : onAddEvent(data, idscategorias, categorias);
        //
        //DATOS PARA GUARDAR EN LA BASE DE DATOS ID CATEGORIAS
        //TITULOS DE LAS CATEGORIAS
        //onAddEvent(data, idscategorias, categorias);
        //reset();
    };

    useEffect(() => {

        if(idUser===1){
          // eslint-disable-next-line array-callback-return
          const filterOpciones = ESTADOS.filter(item => {
            if (item.permisosAdmin === 1) {
              return item
            }
          })
          setOpcionesEstados(filterOpciones);
        }else{
          // eslint-disable-next-line array-callback-return
          const filterOpciones = ESTADOS.filter(item => {
            if (item.permisosDocente === 1) {
              return item
            }
          })
          setOpcionesEstados(filterOpciones);
        }

    }, [idCategoria, idUser]);
    useEffect(() => {
        if (categoriaList?.length === 0) {
            const options = SelectTitulosCategorias('storesDataRef', idUser, idCategoria);
            console.log("categoriaList",options)
            setOpcionesCategorias(options);
        } else {
            setOpcionesCategorias(categoriaList);
        }
    }, [categoriaList, idUser, idCategoria]);

    useEffect(() => {
        if(isEditable){
            setTitulos(event.title)
        }else{
            setTitulos(categorias)
        }
    }, [isEditable,event,categorias]);

    useEffect(() => {
        const estados = Object.keys(ESTADOS)?.map((key) => {
            return ESTADOS[key]?.title;
        });

        setEstados(estados[Number(event.estado-1)]);
    }, [event.estado]);


    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                <Modal.Title id="modal-title">
                    <h5> {isEditable ? 'Edit Solicitud' : 'Add Solicitud'} </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0">
                <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
                    <Row>
                        <Col sm={12}>
                        <FormInput
                                type="hidden"
                                label="className"
                                value={classnamed}
                                name="className"
                                id="className"
                                className="form-control"
                                placeholder="className"
                                containerClass={'mb-3'}
                                register={register}
                                key="className"
                                errors={errors}
                                control={control}
                            />
                            <FormInput
                                type="text"
                                label="Categorias seleccionadas"
                                value={titulos}
                                name="title"
                                id="title"
                                className="form-control"
                                placeholder="Adjunte la categoria"
                                containerClass={'mb-3'}
                                register={register}
                                key="title"
                                errors={errors}
                                control={control}
                            />
                        </Col>
                        <Col sm={12}>
                            <FormInput
                                type="select"
                                label="Categorias"
                                name="Categorias"
                                className="form-control"
                                containerClass={'mb-3'}
                                placeholder=""
                                register={register}
                                key="Categorias"
                                errors={errors}
                                selected={todoData}
                                onChange={(e) => {
                                    setMultiSelections(e,opcionesCategorias);
                                }}
                                control={control}>
                                <option></option>
                                {opcionesCategorias?.map((p, index) => {
                                    return (
                                      <option value={p.index} key={index}>
                                        {p.value}
                                      </option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                        <Col sm={12}>
                            <FormInput
                                type="select"
                                label="Asignar a"
                                name="asignar"
                                className="form-control"
                                containerClass={'mb-3'}
                                placeholder=""
                                register={register}
                                key="asignar"
                                errors={errors}
                                control={control}>
                                <option></option>
                                {docentes?.map((p, index) => {
                                    return (
                                        <option value={p.id} key={index}>
                                            {p.name}
                                        </option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                        <Col sm={12}>
                        <FormInput
                                type="select"
                                label="Estados"
                                name="estado"
                                className="form-control"
                                containerClass={'mb-3'}
                                placeholder=""
                                register={register}
                                key="estado"
                                onChange={(e) => {
                                  getClassName(e);
                                  document.getElementById('className')?.focus();
                              }}
                                errors={errors}
                                control={control}>
                                <option>{estados}</option>
                                {
                                  // eslint-disable-next-line array-callback-return

                                  opcionesEstados?.map((p, index) => {
                                    return (
                                        <option value={p.id} key={index}>
                                            {p.title}
                                        </option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={4}>
                        </Col>
                        <Col xs={8} className="text-end">
                            <Button className="btn btn-light me-1" onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit" className="btn btn-success">
                            {isEditable ? 'Actualizar' : 'Guardar'}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditEvent;
