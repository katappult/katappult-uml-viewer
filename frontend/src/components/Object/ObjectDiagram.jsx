import {DiagramComponent} from '../DiagramComponent'
import {ObjectTable} from '../Object/ObjectTable'
import PropTypes from 'prop-types'

export const ObjectDiagram = ({id}) => {
    return (
        <DiagramComponent
            id={id}
            title="Object Diagram"
            TableComponent={ObjectTable}
            flowKey={'Object' + id}
        />
    )
}

ObjectDiagram.propTypes = {
    id: PropTypes.number.isRequired,
}
