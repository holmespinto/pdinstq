/* eslint-disable array-callback-return */
// @flow
import React, { useState, useEffect } from 'react';
import { Card, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getItemStorage } from './itemStorage.ts';
import { environment } from '../../../environments/environments';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

type TarjetasReferenciasProps = {
    onDateClick: (value: any) => void,
    onListaClick: (value: any) => void,
    IdCategorias?: number,
    textClass?: string,
    bgclassName?: string,
    icon?: string,
    title: string,
    idUser: number,
    description: string,
    inventario?: string,
    trend: {
        textClass?: string,
        icon?: string,
        stock?: string,
        time?: string,
    },
    data: {
        IdCategorias?: number,
        title: string,
        description: string,
        inventario?: string,
        stock?: string,
    },
};

const TarjetasReferencias = (props: TarjetasReferenciasProps): React$Element<any> => {
    const [total, setTotal] = useState(0);
    const [instrumentos, setInstrumentos] = useState([]);

    const handleListaClick = (arg) => {
        props.onListaClick(arg);
    };
    const textClass = props.textClass || 'text-muted';

    useEffect(() => {
        const itemsData = getItemStorage({
            item: 'storesDataRef',
            typeOfStorage: localStorage,
        });
        const filteredLocales = [itemsData?.filter(({ IdCategorias }) => IdCategorias === props.IdCategorias)];
        const Totals = filteredLocales?.length;
        setTotal(Totals);
    }, [props.IdCategorias]);

    useEffect(() => {
      const url = `${environment.baseURL}accion=instrumentos&opcion=consultarinstrumentos&idCategorias=${props.IdCategorias}`
      const datos = api.getDatos(`${url}`);
      datos.then(function (resp) {
          if (resp?.length>0) {
            setInstrumentos(resp);
          }
      });
    }, [props.IdCategorias]);

        //console.log('instrumentos',instrumentos)
    return (
        <Card className={classNames('widget-flat', props.bgclassName)}>
            <Card.Body>
                {props.icon && (
                    <div className="float-end">
                        <i className={classNames(props.icon, '')}>{instrumentos[0]?.inventario?instrumentos[0]?.inventario:'0'}</i>
                    </div>
                )}
                <h5 className={classNames('text-decoration-underline', 'mt-0', textClass)} title={props.description}>
                    {props.IdCategorias}-{props.title}
                </h5>
                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i>{instrumentos[0]?.reservado?instrumentos[0]?.reservado:'0'}
                        </span>
                        <span className="text-nowrap">{props.trend.time}</span>
                    </p>
                )}
                <Col className="text-end">
                    {total > 0 ? (
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
                    ) : (
                        ''
                    )}
                    <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <em>Ver</em> <u> Instrumentos</u> <b>de esta referencia</b>
                                </Tooltip>
                            }>
                            <i className="dripicons-blog" onClick={() => handleListaClick(instrumentos)}></i>
                        </OverlayTrigger>
                    </Link>
                     {props.idUser===1 && (
                    <Link to={`/dashboard/configuracion/admin?p=${props.IdCategorias}`} className="btn btn-link btn-lg text-muted shadow-none">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <u>Adjuntar</u> <em> Instrumentos </em> <b>a esta referencia</b>
                                </Tooltip>
                            }>
                            <i className="dripicons-gear"></i>
                        </OverlayTrigger>
                    </Link>
                      )}
                </Col>
            </Card.Body>
        </Card>
    );
};

export default TarjetasReferencias;
