/* eslint-disable import/first */
// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
// components
// eslint-disable-next-line import/first
import PageTitle from '../../../components/PageTitle';

const ConfiguracionDashboardPage = () => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Categorias', path: '/dashboard/project', active: true },
                ]}
                title={'Categorias'}
            />
            <Row>
export default ConfiguracionDashboardPage;
                <Col xxl={3} lg={6}></Col>
            </Row>
        </React.Fragment>
    );
};

export default ConfiguracionDashboardPage;
