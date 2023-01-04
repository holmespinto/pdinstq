
//import { useForm } from 'react-hook-form';
import { Card, Col, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Swal from 'sweetalert2'
import 'nouislider/distribute/nouislider.css';
// components
//import Count from './Count';
//import { getpedidos } from './filter';
import DeleteCanasta from '../Project/DeleteCanasta'
//import { getnumbercategorias } from '../components/filter';

const ListaCanastasTable = (props) => {
  /*
  const [descuento,setdescuento] = useState({idrow:0,descuento:0});

  useEffect(() => {
    setdescuento({idrow:props.categories[0]?.rowid,
      descuento:props.categories[0]?.value})
}, [props.categories]);
*/
 // const totalCan = getnumbercategorias(props.IdCategorias, props.idUser)
 console.log('props.data',props.data)
  return (
    <>
      <Card>
        <Card.Body>
        <p className="text-muted font-14 mb-3">Número de elementos seleccionadas: Todos</p>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Cantidad</th>
              </tr>

            </thead>
            <tbody>
              {
                props.data?.map((record, index) => {
                  // const apartado = props.IdCategorias === 1 ? 1:getpedidos(record.id,props.IdCategorias,props.idUser)
                  return (
                    <tr key={index}>
                      <>
                        <th scope="row">{record.id}</th>
                        <td>{record.title}</td>
                        <td>{record.cantidad}</td>
                      </>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Col className="text-end">
            <Link
              to={`/dashboard/calendario/horario?p=${props.IdCategorias}`}
              className="btn btn-link btn-lg text-muted shadow-none">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <u>Apartar</u> <em>Canasta</em> <b>de esta referencia</b>
                  </Tooltip>
                }>
                <i className="dripicons-archive"></i>
              </OverlayTrigger>
            </Link>
            <DeleteCanasta itemscanasta={props.itemscanasta} IdCategoria={props.itemid} idUser={props.idUser}/>
          </Col>
        </Card.Body>
      </Card>
    </>
  );
};
export default ListaCanastasTable;
