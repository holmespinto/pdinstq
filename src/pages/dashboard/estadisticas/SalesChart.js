// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';

const SalesChart = (props)=> {
    const apexDonutOpts = {
        chart: {
            height: 340,
            type: 'donut',
        },
        colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00'],
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 376,
                options: {
                    chart: {
                        width: 250,
                        height: 250,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };


console.log(props.apexDonutData)
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

                <h4 className="header-title">Estadísticas por Estados</h4>

                <Chart
                    options={apexDonutOpts}
                    series={props?.apexDonutData}
                    type="donut"
                    height={236}
                    className="apex-charts mb-4 mt-4"
                />
                <div className="chart-widget-list">
                    <p>
                        <i className="mdi mdi-square text-primary"></i> Reservado
                        <span className="float-end">{props.apexDonutData[0]}</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-danger"></i>Deshabilitado
                        <span className="float-end">{props.apexDonutData[1]}</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-success"></i>Devuelto
                        <span className="float-end">{props.apexDonutData[2]}</span>
                    </p>
                    <p className="mb-0">
                        <i className="mdi mdi-square text-warning"></i>Entregado
                        <span className="float-end">{props.apexDonutData[3]}</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SalesChart;
