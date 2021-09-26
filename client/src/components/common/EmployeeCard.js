import {connect} from 'react-redux';
import {Loader} from "../Loader";
import React, {useEffect} from "react";
import {getCommunicationGraph} from "../../redux/actions/common";
import './Card.css';
import Highcharts from "highcharts";
import NetworkGraph from 'highcharts/modules/networkgraph';

const EmployeeCard = ({
        graph, employeeInfo,
        getCommunicationGraph,
        infoLoader, graphLoader, employeesLoader
}) => {
    useEffect(() => {
        if (Object.keys(employeeInfo).length && !graph.length) {
            getCommunicationGraph(employeeInfo.id)
        }
    }, [employeeInfo, infoLoader])

    if (!Object.keys(employeeInfo).length && !infoLoader) {
        return <div className='d-flex justify-content-center' style={{height: 100}}>
            <span className='m-4'>
                {
                    employeesLoader
                        ? 'Подождите пожалуйста пока загрузится список сотрудников'
                        : 'Выберите сотрудника, чтобы просмотреть его профиль'
                }
            </span>
        </div>
    }

    return (
        <>
            <h1>{ employeeInfo.name } { employeeInfo.surname } { employeeInfo.patronymic }</h1>

            { graphLoader && <Loader /> }
            <CommunicationGraph graph={graph} graphLoader={graphLoader} employeeId={employeeInfo.id} />
        </>
    )
}

const CommunicationGraph = ({ graph, graphLoader, employeeId }) => {
    NetworkGraph(Highcharts);

    useEffect(() => {
        if (graph.length) {
            Highcharts.chart('communication_graph', {
                chart: {
                    type: 'networkgraph'
                },
                title: {
                    text: 'Граф коммуникаций сотрудника'
                },
                plotOptions: {
                    networkgraph: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            linkFormat: ''
                        },
                        layoutAlgorithm: {
                            initialPositions: () => {
                                var chart = this.series[0].chart,
                                    width = chart.plotWidth,
                                    height = chart.plotHeight;

                                this.nodes.forEach(function(node) {
                                    if (i === 0) {
                                        node.plotX = 600;
                                        node.plotY = 100;
                                    }

                                    if (i === 1) {
                                        node.plotX = 350;
                                        node.plotY = 100;
                                    }

                                    if (i === 2) {
                                        node.plotX = 200;
                                        node.plotY = 0;
                                    }

                                    if (i === 3) {
                                        node.plotX = 0;
                                        node.plotY = 0;
                                    }

                                    if (i === 4) {
                                        node.plotX = 200;
                                        node.plotY = 200;
                                    }
                                });
                            }
                        }
                    }
                },
                series: [{
                    data: graph.map((user) => ({
                        from: employeeId,
                        to: user.id,
                        name: user.name
                    }))
                }]
            })
        }
    }, [graph]);

    if (!employeeId) return <></>;

    if (!graph.length && !graphLoader) {
        return 'Не удалось загрузить данные о куммуникации сотрудника. ' +
            'Он не подключен к корпоративной messenger-системе'
    }

    return (
        <div id='communication_graph'></div>
    )
}

export default connect(state => ({
    graph: state.common.communicationGraph,
    employeesLoader: state.common.loaders.employees,
    infoLoader: state.common.loaders.currentEmployee,
    graphLoader: state.common.loaders.graph
}), {getCommunicationGraph})(EmployeeCard);