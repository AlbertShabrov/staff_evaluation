import {connect} from 'react-redux';
import {Loader} from "../Loader";
import {useEffect} from "react";
import {getCommunicationGraph} from "../../redux/actions/common";

const EmployeeCard = ({
        graph, employeeInfo,
        getCommunicationGraph,
        infoLoader, graphLoader, employeesLoader
}) => {
    useEffect(() => {
        if (Object.keys(employeeInfo).length) {
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
    if (!employeeId) return <></>;

    if (!graph.length && !graphLoader) {
        return 'Не удалось загрузить данные о куммуникации сотрудника. ' +
            'Он не подключен к корпоративной messenger-системе'
    }

    return (
        'GRAPH'
    )
}

export default connect(state => ({
    graph: state.common.communicationGraph,
    employeesLoader: state.common.loaders.employees,
    infoLoader: state.common.loaders.currentEmployee,
    graphLoader: state.common.loaders.graph
}), {getCommunicationGraph})(EmployeeCard);