/* eslint-disable react/style-prop-object */
// @flow
import React, { useState,useEffect } from 'react';
import { Modal, Row, Col} from 'react-bootstrap';
import { setItemStorage, getItemStorage } from './itemStorage.ts';

// components
import TabPaneCanastas from './TabPaneCanastas';
import TableItems from './TableItems';
import { environment } from '../../../environments/environments';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

const ListaReferencias = ({ isOpenlist, onClose, listData, idUser,referencias,IdCategorias }) => {
    // event state

    const [idRef, setidRef] = React.useState(0);
    const [list] = useState(listData[0]);
    //console.log('listData',list.canastas[0][0].items)
    //const [data, setDatos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [canastas, setCanastas] = useState([]);

    const onDateValueCategories = (e) => {
     // console.log('onDateValueCategories',e)
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

        //GUARDAR LOS TITULOS DEL EVENTO
        const apartadosRef = getItemStorage({
            typeOfStorage: localStorage,
            item: 'storesDataRef',
        });
        const apartadosDataRef = [...apartadosRef];

        apartadosDataRef.push({
            id: 1,
            value: e.rowid + '.-' + e.title,
            rowid: e.rowid,
            IdCategorias: e.IdCategorias,
            idUser: e.idUser,
        });
        setItemStorage({
            data: apartadosDataRef,
            item: 'storesDataRef',
            typeOfStorage: localStorage,
        });
        //fin

        //cargue los datos de los instrumentos apartados
        const apartados = getItemStorage({
            typeOfStorage: localStorage,
            item: 'storesData',
        });

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
        });
        //
    };
    const onDateReferencias = (arg, argB) => {
        const apartadosReferencia = getItemStorage({
            typeOfStorage: localStorage,
            item: 'storesDataRef',
        });
        const saveReferencia = [...apartadosReferencia];
        saveReferencia.push({
            id: saveReferencia.length + 1,
            value: arg + '.-' + argB[arg-1].title,
            rowid: arg,
            IdCategorias: IdCategorias,
            idUser: idUser,
            estado: 'add',
        });
        setItemStorage({
            data: saveReferencia,
            item: 'storesDataRef',
            typeOfStorage: localStorage,
        });

        setidRef(arg);

        //DESDE AQUI SE PUEDE ACTUALIZAR LALISTA DE REFERENCIAS SELECCIONADAS

    };
/*
    useEffect(() => {
        list?.IdCategorias === 1
            ? setDatos([list?.canastas[0][idRef]?.items])
            : setDatos([list?.canastas[0][0]?.items]);
    }, [idRef, list]);
*/

useEffect(() => {
  const url =  `${environment.baseURL}accion=instrumentos&opcion=consultar&tipo=2&idReferencia=${idRef}`;
  const syllab = api.getDatos(`${url}`);
  syllab.then(function (resp) {
      if (resp) {
          setCanastas(resp);
      }
  });
}, [idRef]);

    return (
    <Modal show={isOpenlist} onHide={onClose} backdrop="static" keyboard={false} size={'xl'}>
      <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
        <Modal.Title id="modal-title">
          <h5> {'list?.title'} </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4 pt-0 mx-auto">
        <Row style={{ width: '50rem' }}>
          <Col sm={12}>

            {Number(IdCategorias) === 1 ? (
              <TabPaneCanastas
                  data={canastas}
                  categories={categories}
                  referencias={referencias}
                  onDateValueCategories={onDateValueCategories}
                  onDateReferencias={onDateReferencias}
                  IdCategorias={IdCategorias}
                  idUser={idUser}
                  title={listData?.title}
                  list={list} />
            ) : (
              <TableItems
                data={listData}
                categories={listData}
                onDateValueCategories={onDateValueCategories}
                IdCategorias={IdCategorias}
                idUser={idUser}
                title={listData[0]?.children?.title}
              />
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ListaReferencias;
