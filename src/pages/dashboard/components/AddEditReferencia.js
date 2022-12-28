// @flow
import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { FormInput } from '../../../components';
import  TableItems  from './TableItems';
type AddEditEventProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    eventData?: any,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
};

const AddEditReferencia = ({
    isOpen,
    onClose,
    isEditable,
    eventData,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
}: AddEditEventProps): React$Element<any> => {
    // event state
    const [event] = useState(eventData);
    const [idRef, setidRef] = React.useState(0);
    const [list] = useState(eventData);
    //console.log('listData',list.canastas[0][0].items)
    const [events, setEvents] = useState([]);

    const onDateValueChange = (arg) => {
      setidRef(arg)
    };

    useEffect(() => {
      (list?.IdCategorias===1)?
      setEvents([list?.canastas[0][idRef]?.items]):setEvents([list?.canastas[0][0]?.items])

  }, [idRef,list]);
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
        formState: { errors },
    } = methods;

    /*
     * handle form submission
     */
    const onSubmitEvent = (data) => {
      //console.log(data);
        isEditable ? onUpdateEvent(data) : onAddEvent(data);
    };
    console.log(events)
    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                <Modal.Title id="modal-title">
                    <h5> {isEditable ? 'Edit Canasta' : 'Add Instrumento'} </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0">
                <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
                    <Row>
                        <Col sm={12}>
                            <FormInput
                                type="text"
                                label="Descripcion"
                                name="Descripcion"
                                className="form-control"
                                placeholder="Inserte Descripcion"
                                containerClass={'mb-3'}
                                register={register}
                                key="Descripcion"
                                errors={errors}
                                control={control}
                            />
                        </Col>
                        <Col sm={12}>
                            <FormInput
                                type="text"
                                label="cantidad"
                                name="cantidad"
                                className="form-control"
                                placeholder="Inserte cantidad"
                                containerClass={'mb-3'}
                                register={register}
                                key="cantidad"
                                errors={errors}
                                control={control}
                            />
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
                <Row>
                <Col sm={12}>
                        {list?.IdCategorias===1?
                              <FormInput
                                type="select"
                                label="Referencias"
                                name="Referencias"
                                className="form-control"
                                containerClass={'mb-3'}
                                key="title"
                                onChange={(e) => {onDateValueChange(Number(e.target.value))}}
                                >
                                {list?.canastas[0]?.map((p, index) => {
                                return (
                                 <option value={p.id} key={index}>{p.title}</option>
                                )})}
                            </FormInput>:''}
                        </Col>
                <Col sm={12}>
                        <TableItems data={events}/>
                  </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditReferencia;
