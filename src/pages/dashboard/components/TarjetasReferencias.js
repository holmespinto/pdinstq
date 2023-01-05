// @flow
import React, { useState, useEffect } from 'react';
import { Card, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getItemStorage } from './itemStorage.ts';

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

    return (
        <Card className={classNames('widget-flat', props.bgclassName)}>
            <Card.Body>
                {props.icon && (
                    <div className="float-end">
                        <i className={classNames(props.icon, '')}>{total}</i>
                    </div>
                )}
                <h5 className={classNames('text-decoration-underline', 'mt-0', textClass)} title={props.description}>
                    {props.title}
                </h5>
                <h3 className={classNames('mt-3', 'mb-3', props.textClass ? props.textClass : null)}>
                    {props.totalcantidad}
                </h3>

                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i> {props.totalreservado}
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
                            <i className="dripicons-blog" onClick={() => handleListaClick(props.data)}></i>
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
