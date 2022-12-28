// @flow
import React,{useState,useEffect} from 'react';
import { Card,Col,OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import  {getItemStorage}  from './itemStorage.ts';


type TarjetasReferenciasProps = {
    onDateClick: (value: any) => void,
    onListaClick: (value: any) => void,
    IdCategorias?: number,
    textClass?: string,
    bgclassName?: string,
    icon?: string,
    title: string,
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
    const handleEventClick = (arg) => {
        props.onDateClick(arg);
    };
    const handleListaClick = (arg) => {
        props.onListaClick(arg);
    };
    const textClass = props.textClass || 'text-muted';

    const itemsData = getItemStorage({
      item: 'storesData',
      typeOfStorage: localStorage,
    })

    useEffect(() => {
      const filteredLocales = [
        itemsData?.filter(({ IdCategorias }) => IdCategorias === props.IdCategorias),
      ]
      // eslint-disable-next-line no-undef, array-callback-return

      if(filteredLocales?.length>0){
      let ArrayValues = []
      // eslint-disable-next-line array-callback-return
      filteredLocales?.map((itemTemp, index) => (
        ArrayValues?.push(itemTemp[index]?.value)
      ))
      const reducer = (accumulator, curr) => accumulator + curr;
      setTotal(ArrayValues.reduce(reducer));

      }
  }, [itemsData, props.IdCategorias]);
const Totals =total?total:0
    return (
        <Card className={classNames('widget-flat', props.bgclassName)}>
            <Card.Body>
                {props.icon && (
                    <div className="float-end">
                        <i className={classNames(props.icon, '')}>{Totals}</i>
                    </div>
                )}
                <h5 className={classNames('text-decoration-underline', 'mt-0', textClass)} title={props.description}>
                    {props.title}
                </h5>
                <h3 className={classNames('mt-3', 'mb-3', props.textClass ? props.textClass : null)}>{props.totalcantidad}</h3>

                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i> {props.totalreservado}
                        </span>
                        <span className="text-nowrap">{props.trend.time}</span>
                    </p>
                )}

                <Col className="text-end">
                { (Totals>0)?
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
                    :''
                    }
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
                    <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <u>Adjuntar</u> <em> Instrumentos </em> <b>a esta referencia</b>
                                </Tooltip>
                            }>
                        <i className="dripicons-gear" onClick={() => handleEventClick(props.data)}></i>
                        </OverlayTrigger>
                    </Link>
                </Col>
            </Card.Body>
        </Card>
    );
};

export default TarjetasReferencias;
