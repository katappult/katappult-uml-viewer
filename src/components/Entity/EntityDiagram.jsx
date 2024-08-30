import {DiagramComponent} from '../DiagramComponent'
import {EntityTable} from '../Entity/EntityTable'

export const EntityDiagram = ({id}) => {
    return (
        <DiagramComponent
            title="Entity Diagram"
            TableComponent={EntityTable}
            flowKey={'Entity' + id}
        />
    )
}
