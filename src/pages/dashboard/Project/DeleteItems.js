import React, { useContext } from 'react';
import Swal from 'sweetalert2'
import ItemContext from './ItemContext';
import { setItemStorage } from '../components/itemStorage.ts';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const handleEventClick = (item, IdCategoria) => {
    Swal.fire({
        title: 'Desea eliminar las cantidades solicitadas?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Si',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            // eslint-disable-next-line array-callback-return
            const apartadosDataRef = item.filter((item) => {
                if (item.IdCategorias !== IdCategoria) {
                    return item;
                }
            });
            localStorage.removeItem('storesData');
            setItemStorage({
                data: apartadosDataRef,
                item: 'storesData',
                typeOfStorage: localStorage,
            });
            Swal.fire('Registros eliminados!', '', 'success');
        }
    });
};



function DeleteItem(props) {
  const item = useContext(ItemContext);
    return (
        <ItemContext.Provider value={ItemContext}>
            <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            <u>Borrar</u> <em> cantidades </em> <b>apartadas</b>
                        </Tooltip>
                    }>
                    <i className="dripicons-trash"
                        onClick={() => handleEventClick(item,props.IdCategoria)}
                       ></i>
                </OverlayTrigger>
            </Link>
        </ItemContext.Provider>
    );
}

export default DeleteItem;
