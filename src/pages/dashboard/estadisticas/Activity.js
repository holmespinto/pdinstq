// @flow
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';

// components
import Timeline from '../../../components/Timeline';
import TimelineItem from '../../../components/TimelineItem';

const Activity = (props) => {
    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Sales Report</Dropdown.Item>
                        <Dropdown.Item>Export Report</Dropdown.Item>
                        <Dropdown.Item>Profit</Dropdown.Item>
                        <Dropdown.Item>Action</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mb-2">Actividades Recientes</h4>

                <SimpleBar style={{ maxHeight: '419px', width: '100%' }}>
                    <Timeline>
                    {
                    props.recientes?.map((p, index) => (
                        <TimelineItem key={index}>
                            <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                            <div className="timeline-item-info">
                                <a href="/" className="text-info fw-bold mb-1 d-block">
                                {p.elementos}
                                </a>
                                <small>{p.estado}</small>
                                <small> {p.nombres} {p.apellidos}</small>

                                <p className="mb-0 pb-2">
                                    <small className="text-muted">{p.entrega}</small>
                                </p>
                            </div>
                        </TimelineItem>
                        ))}
                    </Timeline>
                </SimpleBar>
            </Card.Body>
        </Card>
    );
};

export default Activity;
