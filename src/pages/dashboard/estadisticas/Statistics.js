// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={6}>
                    <StatisticsWidget
                        icon="mdi mdi-account-multiple"
                        description="Numero de Instrumentos"
                        title="Intrumentos"
                        stats={props?.totalinstrumentos}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: props?.totalcategorias,
                            time: 'Categorias',
                        }}></StatisticsWidget>
                </Col>

                <Col lg={6}>
                    <StatisticsWidget
                        icon="mdi mdi-cart-plus"
                        description="Numero de Transacciones"
                        title="Transacciones"
                        stats={props?.totalsolicitudes}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: props?.porsolicitudes,
                            time: '% Solicitado',
                        }}></StatisticsWidget>
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Prestados"
                        title="Prestados"
                        stats={props?.totalprestados}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: props?.totalprestadosmes,
                            time: '% Solicitado este mes',
                        }}></StatisticsWidget>
                </Col>

                <Col lg={6}>
                    <StatisticsWidget
                        icon="mdi mdi-pulse"
                        description="Docentes"
                        title="Docentes"
                        stats={props?.totaldocente}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: props?.totalasignados,
                            time: 'No. Docente por servicio',
                        }}></StatisticsWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
