/* eslint-disable import/first */
// @flow
import React from 'react';
import { Row, Col, Tab, Card, Nav, Alert } from 'react-bootstrap';
import classnames from 'classnames';
// components
// eslint-disable-next-line import/first
import PageTitle from '../../../components/PageTitle';
const tabContents = [
  {
    id: '1',
    title: 'Crear Categoria',
    icon: 'mdi mdi-home-variant',
    text: 'En esta session puedes Crear las Categorias',
  },
  {
    id: '2',
    title: 'Adjuntar Intrumentos',
    icon: 'mdi mdi-account-circle',
    text: 'En esta session puedes Adjuntar Intrumentos a las categorias.',
  },
  {
    id: '3',
    title: 'Devoluciones',
    icon: 'mdi mdi-account-circle',
    text: 'En esta session puedes Devolver las solicitudes de préstamos.',
  },{
    id: '4',
    title: 'Usuarios',
    icon: 'mdi mdi-account-circle',
    text: 'En esta session puedes Administrar los usuarios.',
  }
];
const ConfiguracionDashboardPage = () => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Categorias', path: '/dashboard/project', active: true },
                ]}
                title={'Configuraciones'}
            />
            <Row>
                <Card>
        <Card.Body>
          <Tab.Container defaultActiveKey="Profile">
            <Nav variant="tabs" className="nav-bordered" as="ul">
              {tabContents.map((tab, index) => {
                return (
                  <Nav.Item key={index} as="li">
                    <Nav.Link href="#" eventKey={tab.title}>
                      <i
                        className={classnames(
                          tab.icon,
                          'd-md-none',
                          'd-block',
                          'me-1'
                        )}></i>
                      <span className="d-none d-md-block">{tab.title}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
              {tabContents.map((tab, index) => {
                return (
                  <>
                    {index === 0 ? (
                      <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                        <Row>
                          <Col sm="12 mt-1">
                          <Alert variant={'success'}>
                            <i className={('dripicons-information','me-2 pd-1')}></i><strong>{tab.text}</strong>
                          </Alert>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    ) : (
                      <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                        <Row>
                          <Col sm="12 mt-1">
                          <Alert variant={'success'} key={index}>
                            <i className={('dripicons-information','me-2 pd-1')}></i><strong>{tab.text}</strong>
                        </Alert>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    )}
                  </>
                );
              })}
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>

            </Row>
        </React.Fragment>
    );
};

export default ConfiguracionDashboardPage;
