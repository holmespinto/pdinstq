/* eslint-disable import/first */
// @flow
import React from 'react';
import { Row, Col, Tab, Card, Nav, Alert } from 'react-bootstrap';
import classnames from 'classnames';
// components
// eslint-disable-next-line import/first
import PageTitle from '../../../components/PageTitle';
import ListCategorias from '../categorias/ListCategorias';
import ListReferencias from '../referencias/ListReferencias';
import SelectReferencias from '../components/SelectReferencias';
const tabContents = [
    {
        id: '1',
        title: 'Crear Categoria',
        icon: 'mdi mdi-home-variant',
        text: 'En esta session puedes Crear las Categorias',
    },
    {
        id: '2',
        title: 'Registrar Instrumentos x Categoria',
        icon: 'mdi mdi-account-circle',
        text: 'En esta session puedes Crear los Instrumentos x Categoria .',
    },
    {
        id: '3',
        title: 'Crear Referencias',
        icon: 'mdi mdi-account-circle',
        text: 'En esta session puedes Crear las Referencias de la CANASTA .',
    },
    {
        id: '4',
        title: 'Registrar Instrumentos x Referencias',
        icon: 'mdi mdi-account-circle',
        text: 'En esta session puedes Registrar Instrumentos por Referencias de la CANASTA.',
    },
];


const ConfiguracionDashboardPage = () => {
  const [idRef, setidRef] = React.useState(0);
  const onDateReferencias = (data) => {
    setidRef(data)
 };
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
                                        <Nav.Item as="li">
                                            <Nav.Link href="#" eventKey={tab.title} key={index}>
                                                <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
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
                                                <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                                                    <Row>
                                                        <Col sm="12 mt-1">
                                                            <Alert variant={'success'}>
                                                                <i
                                                                    className={
                                                                        ('dripicons-information', 'me-2 pd-1')
                                                                    }></i>
                                                                <strong>{tab.text}</strong>
                                                            </Alert>
                                                            {(() => {
                                                                  switch (index) {
                                                                      case 0:
                                                                        return (<ListCategorias />);
                                                                      case 1:
                                                                        return (<SelectReferencias
                                                                           onDateReferencias={onDateReferencias}
                                                                           idRef={idRef}
                                                                           session={'CATEGORIAS'}
                                                                           nsecion={1}
                                                                           />);
                                                                      case 2:
                                                                        return (<ListReferencias/>);
                                                                      default:
                                                                        return (<SelectReferencias
                                                                          onDateReferencias={onDateReferencias}
                                                                          idRef={idRef}
                                                                          session={'REFERENCIAS'}
                                                                          nsecion={2}
                                                                          />);
                                                                      }
                                                              })()}
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                        </>
                                    )
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
