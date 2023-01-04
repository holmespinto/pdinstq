
// @flow
import React, { useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ListaCanastasTable from './ListaCanastasTable';

const ListaCanastasAdd = ({itemid,item,items,itemscanasta,idUser}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
      setOpen((prevState) => !prevState);
  };

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
                      data={items}
                      itemid={itemid}
                      itemscanasta={itemscanasta}
                      idUser={idUser}/>
                      </Card.Body>
                  </div>
              </Collapse>
          </Card>
      </>
  );
};
export default ListaCanastasAdd;
