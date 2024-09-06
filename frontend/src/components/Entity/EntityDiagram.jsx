import {DiagramComponent} from '../DiagramComponent'
import {EntityTable} from '../Entity/EntityTable'
import PropTypes from 'prop-types'
export const EntityDiagram = ({id}) => {
    return (
        <DiagramComponent
            id={id}
            title="Entity Diagram"
            TableComponent={EntityTable}
            flowKey={'Entity' + id}
        />
    )
}
EntityDiagram.propTypes = {
    id: PropTypes.number.isRequired,
}
