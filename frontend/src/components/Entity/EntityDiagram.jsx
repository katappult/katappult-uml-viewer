import {DiagramComponent} from '../DiagramComponent'
import {EntityTable} from '../Entity/EntityTable'
import PropTypes from 'prop-types'

export const EntityDiagram = ({id, nodes, edges, selectedItems, viewport}) => {
    return (
        <DiagramComponent
            title="Entity Diagram"
            TableComponent={EntityTable}
            nodes={nodes}
            edges={edges}
            selectedItems={selectedItems}
            viewport={viewport}
            flowKey={'Entity' + id}
        />
    )
}

EntityDiagram.propTypes = {
    id: PropTypes.string.isRequired,
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    viewport: PropTypes.object.isRequired,
}
