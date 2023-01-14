// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';

const PerformanceChart = (props) => {
    const apexBarChartOpts = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        chart: {
            height: 260,
            type: 'bar',
            stacked: true,
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#727cf5', '#e3eaef'],
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + '';
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '' + val + '';
                },
            },
        },
    };

    const apexBarChartData = [
        {
            name: 'Actual',
            data: props?.meses,
        },
        {
            name: 'Projection',
            data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Exportar</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mb-3">Proyeciones de Solicitudes</h4>

                <Chart
                    options={apexBarChartOpts}
                    series={apexBarChartData}
                    type="bar"
                    className="apex-charts"
                    height={260}
                />
            </Card.Body>
        </Card>
    );
};

export default PerformanceChart;
