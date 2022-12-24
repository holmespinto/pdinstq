// @flow
import React from 'react';
import { Card,Col,OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
type StatisticsWidgetProps = {
    onDateClick: (value: any) => void,
    textClass?: string,
    bgclassName?: string,
    icon?: string,
    title: string,
    description: string,
    stats?: string,
    trend: {
        textClass?: string,
        icon?: string,
        value?: string,
        time?: string,
    },
};
const mostrar = (i) => {
console.log('ok',i)
};

const StatisticsWidget = (props: StatisticsWidgetProps): React$Element<any> => {
   
    const handleEventClick = (arg) => {
        props.onDateClick(arg);
    };
    const textClass = props.textClass || 'text-muted';
 const orderId=12;

    return (
        <Card className={classNames('widget-flat', props.bgclassName)}>
            <Card.Body>
                {props.icon && (
                    <div className="float-end">
                        <i className={classNames(props.icon, 'widget-icon')}></i>
                    </div>
                )}
                <h5 className={classNames('fw-normal', 'mt-0', textClass)} title={props.description}>
                    {props.title}
                </h5>
                <h3 className={classNames('mt-3', 'mb-3', props.textClass ? props.textClass : null)}>{props.stats}</h3>

                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i> {props.trend.value}
                        </span>
                        <span className="text-nowrap">{props.trend.time}</span>
                    </p>
                )}

                <Col className="text-end">
                    <Link
                        to={`/dashboard/calendario/481344?p=${orderId}`}
                        className="btn btn-link btn-lg text-muted shadow-none">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <u>Apartar</u> <em>Canasta</em> <b>de esta referencia</b>
                                </Tooltip>
                            }>
                            <i className="dripicons-archive" onClick={() => mostrar(2)}></i>
                        </OverlayTrigger>
                    </Link>
                    <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <em>Ver</em> <u> Instrumentos</u> <b>de esta referencia</b>
                                </Tooltip>
                            }>
                        <i className="dripicons-blog" onClick={() => mostrar(2)}></i>
                        </OverlayTrigger>
                    </Link>
                    <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <u>Adjuntar</u> <em> Instrumentos </em> <b>a esta referencia</b>
                                </Tooltip>
                            }>
                        <i className="dripicons-gear" onClick={() => handleEventClick(props.trend)}></i>
                        </OverlayTrigger>
                    </Link>
                </Col>
            </Card.Body>
        </Card>
    );
};

export default StatisticsWidget;
