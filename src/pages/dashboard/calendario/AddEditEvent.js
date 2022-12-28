// @flow
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { FormInput } from '../../../components/';
import { allTitles, allIds } from './functions';

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
}: AddEditEventProps): React$Element<any> => {
    // event state
    const [event] = useState(eventData);
    const [categorias, setCategorias] = useState('');
    const [idscategorias, setIdsCategorias] = useState('');
    const [opcionesCategorias, setOpcionesCategorias] = useState([]);
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('Please enter event name'),
            className: yup.string().required('Please select category'),
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
        reset,
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
        // isEditable ? onUpdateEvent(data) : onAddEvent(data);
        //
        //DATOS PARA GUARDAR EN LA BASE DE DATOS ID CATEGORIAS
        //TITULOS DE LAS CATEGORIAS
        onAddEvent(data, idscategorias, categorias);
        reset();
    };

    useEffect(() => {
        if (idCategoria === 1) {
            const options = [
                { value: '1.-Canastas' },
                { value: '2.-Elementos Metalícos' },
                { value: '3.-Paquete de Ropa' },
            ];
            setOpcionesCategorias(options);
        } else {
            const options = [{ value: '1.-Canastas' }];
            setOpcionesCategorias(options);
        }
    }, [idCategoria]);

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                <Modal.Title id="modal-title">
                    <h5> {isEditable ? 'Edit Event' : 'Add Categorias'} </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0">
                <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
                    <Row>
                        <Col sm={12}>
                            <FormInput
                                type="text"
                                label="Categorias seleccionadas"
                                value={categorias}
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
                                label="Category"
                                name="className"
                                className="form-control"
                                containerClass={'mb-3'}
                                placeholder=""
                                register={register}
                                key="className"
                                errors={errors}
                                selected={todoData}
                                onChange={(e) => {
                                    setMultiSelections(e);
                                }}
                                control={control}>
                                {opcionesCategorias?.map((p, index) => {
                                    return (
                                        <option value={p.id} key={index}>
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
                                {docentes?.map((p, index) => {
                                    return (
                                        <option value={p.id} key={index}>
                                            {p.name}
                                        </option>
                                    );
                                })}
                            </FormInput>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={4}>
                            {isEditable ? (
                                <Button variant="danger" onClick={onRemoveEvent}>
                                    Delete
                                </Button>
                            ) : null}
                        </Col>
                        <Col xs={8} className="text-end">
                            <Button className="btn btn-light me-1" onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit" className="btn btn-success">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditEvent;
