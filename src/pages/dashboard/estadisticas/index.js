// @flow
import React,{useEffect,useState} from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import Statistics from './Statistics';
import PerformanceChart from './PerformanceChart';
import SalesChart from './SalesChart';
import Activity from './Activity';
import Products from './Products';
import { environment } from '../../../environments/environments';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();
const Estadisticas = () => {

const [totalinstrumentos, setTotalInstrumentos] = useState([]);
const [apexDonutData, setEstadisticasEstados] = useState([1,1,1,1]);

  useEffect(() => {
    const url = `${environment.baseURL}accion=estadisticas&opcion=numeroinstrumentos`
    const datos = api.getDatos(`${url}`);
    datos.then(function (resp) {
      if (resp?.length > 0) {
        setTotalInstrumentos({
          totalinstrumentos:resp[0]?.totalinstrumentos,
          totalcategorias:resp[1]?.totalcategorias,
          totalsolicitudes:resp[2]?.totalsolicitudes,
          porsolicitudes:Number(resp[0]?.totalinstrumentos/resp[2]?.totalsolicitudes*100),
          totalprestados:resp[3]?.totalprestados,
          totalprestadosmes:resp[4]?.totalprestadosmes,
          totaldocente:resp[5]?.totaldocente,
          totalasignados:resp[6]?.totalasignados,
          proyecionmeses:resp[7].length>0?resp[7]:[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          solicateg:resp[8],
          soliestados:resp[9],
          recientes:resp[10],
        });
      }
    });
  }, []);

  useEffect(() => {

    if(totalinstrumentos.soliestados?.length>0){
      setEstadisticasEstados([
        Number(totalinstrumentos.soliestados[0]?.total),
        Number(totalinstrumentos.soliestados[1]?.total),
        Number(totalinstrumentos.soliestados[2]?.total),
        Number(totalinstrumentos.soliestados[3]?.total)
      ])

    }


  }, [totalinstrumentos]);
  console.log(totalinstrumentos)
    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <button className="btn btn-primary ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </button>
                                <button className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title">Estadística y Reportes</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={5}>
                    <Statistics
                    totalinstrumentos={totalinstrumentos?.totalinstrumentos}
                    totalcategorias={totalinstrumentos?.totalcategorias}
                    totalsolicitudes={totalinstrumentos?.totalsolicitudes}
                    porsolicitudes={totalinstrumentos?.porsolicitudes>0?totalinstrumentos?.porsolicitudes.toFixed(2):0}
                    totalprestados={totalinstrumentos?.totalprestados}
                    totalprestadosmes={totalinstrumentos?.totalprestadosmes}
                    totaldocente={totalinstrumentos?.totaldocente}
                    totalasignados={totalinstrumentos?.totalasignados}
                   />
                </Col>

                <Col xl={7}>
                    <PerformanceChart
                    meses={totalinstrumentos?.proyecionmeses}
                    />
                </Col>
            </Row>
            <Row>
                <Col xl={{ span: 6, order: 1 }} lg={{ order: 2 }}>
                    <Products listascategorias={totalinstrumentos?.solicateg}/>
                </Col>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                    <SalesChart apexDonutData={apexDonutData} />
                </Col>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                    <Activity recientes={totalinstrumentos?.recientes}/>
                </Col>
            </Row>
        </>
    );
};

export default Estadisticas;
