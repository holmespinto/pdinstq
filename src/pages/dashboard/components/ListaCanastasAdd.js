
// @flow
import React, { useState,useEffect } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ListaCanastasTable from './ListaCanastasTable';
import { environment } from '../../../environments/environments';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

const ListaCanastasAdd = ({itemid,item,idUser}) => {
  const [open, setOpen] = useState(false);
const [canastas, setCanastas] = useState([]);

  const toggle = () => {
      setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const url =  `${environment.baseURL}accion=instrumentos&opcion=consultar&tipo=2&idReferencia=${itemid-1}`;
    const syllab = api.getDatos(`${url}`);
    syllab.then(function (resp) {
        if (resp) {
            setCanastas(resp);
        }
    });
  }, [itemid]);
  return (
      <>
          <Card className="mb-0">
              <Card.Header>
                  <h5 className="m-0">
                      <Link
                          to="#"
                          className={classNames('custom-accordion-title d-block py-1', { collapsed: open !== true })}
                          onClick={toggle}
                          aria-controls={'collapse' + item}
                          aria-expanded={open}>
                          {item} <i className="mdi mdi-chevron-down accordion-arrow"></i>
                      </Link>
                  </h5>
              </Card.Header>

              <Collapse in={open} appear>
                  <div>
                      <Card.Body>
                      <ListaCanastasTable
                      data={canastas}
                      itemid={itemid}
                      itemscanasta={[]}
                      idUser={idUser}/>
                      </Card.Body>
                  </div>
              </Collapse>
          </Card>
      </>
  );
};
export default ListaCanastasAdd;
