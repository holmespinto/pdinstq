/* eslint-disable react/style-prop-object */
// @flow
import React, { useState,useEffect } from 'react';
//import { useForm } from 'react-hook-form';
import { Modal, Row, Col} from 'react-bootstrap';
//import * as yup from 'yup';
//import { yupResolver } from '@hookform/resolvers/yup';
 import { setItemStorage, getItemStorage } from './itemStorage.ts';

// components
import { FormInput } from '../../../components';
import  TableItems  from './TableItems';


const ListaReferencias = ({
    isOpenlist,
    onClose,
    listData,
    idUser,
})=> {
    // event state

    const [idRef, setidRef] = React.useState(0);
    const [list] = useState(listData);
    //console.log('listData',list.canastas[0][0].items)
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);

    const onDateValueCategories = (e) => {


    const modifiedEvents = [];
        modifiedEvents.push({
          id: modifiedEvents.length + 1,
          value: e.value,
          rowid: e.rowid,
          IdCategorias: e.IdCategorias,
          idUser: e.idUser,
          estado: e.estado,
      });
      setCategories(modifiedEvents);

      const apartados = getItemStorage({
        typeOfStorage: localStorage,
        item: 'storesData',
      })

      const saveCategories = [...apartados];
      saveCategories.push({
        id: saveCategories.length + 1,
        value: e.value,
        rowid: e.rowid,
        IdCategorias: e.IdCategorias,
        idUser: e.idUser,
        estado: e.estado,
    });
    setItemStorage({
      data: saveCategories,
      item: 'storesData',
      typeOfStorage: localStorage,
    })
    //

  };
    const onDateReferencias = (arg,argB) => {
      const apartadosReferencia = getItemStorage({
        typeOfStorage: localStorage,
        item: 'storesDataRef',
      })
      const saveReferencia=[...apartadosReferencia]
      saveReferencia.push({
        id: saveReferencia.length + 1,
        value: arg + '.-' + argB[arg].title,
        rowid: arg,
        IdCategorias: 1,
        idUser: idUser,
        estado: 'add',
    });
    setItemStorage({
      data: saveReferencia,
      item: 'storesDataRef',
      typeOfStorage: localStorage,
    })


      setidRef(arg)
    };

    useEffect(() => {
      (list?.IdCategorias===1)?
      setEvents([list?.canastas[0][idRef]?.items]):setEvents([list?.canastas[0][0]?.items])

  }, [idRef,list]);

    return (
        <Modal show={isOpenlist} onHide={onClose} backdrop="static" keyboard={false} size={'xl'}>
            <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                <Modal.Title id="modal-title">
                    <h5> {list?.title} </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0 mx-auto">
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
                                onChange={(e) => {onDateReferencias(Number(e.target.value),list?.canastas[0])}}
                                >
                                {list?.canastas[0]?.map((p, index) => {
                                return (
                                 <option value={p.id} key={index}>{p.title}</option>
                                )})}
                            </FormInput>:''}
                        </Col>
                        <Col sm={12}>
                        <TableItems
                        data={events}
                        categories={categories}
                        onDateValueCategories={onDateValueCategories}
                        IdCategorias={list?.IdCategorias}
                        idUser={1}
                        title={listData?.title}
                         />
                        </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ListaReferencias;
