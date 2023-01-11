import Swal from 'sweetalert2'
import ItemContext from './ItemContext';
import { setItemStorage } from '../components/itemStorage.ts';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const handleEventClick = (item, IdCategoria,idUser) => {
    Swal.fire({
        title: 'Desea eliminar las canastas seleccionada?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Si',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            // eslint-disable-next-line array-callback-return
            const apartadosDataRef = item.filter((item) =>
               item.id !== IdCategoria  && item.id !== undefined
            );
           // console.log('apartadosDataRef',apartadosDataRef)

           localStorage.removeItem('storesDataRef');
            setItemStorage({
                data: apartadosDataRef,
                item: 'storesDataRef',
                typeOfStorage: localStorage,
            });

            Swal.fire('Registros eliminados!', '', 'success');

        }
    });
};



function DeleteCanasta(props) {

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
                        onClick={() => handleEventClick(props.itemscanasta,props.IdCategoria,props.idUser)}
                       ></i>
                </OverlayTrigger>
            </Link>
        </ItemContext.Provider>
    );
}

export default DeleteCanasta;
