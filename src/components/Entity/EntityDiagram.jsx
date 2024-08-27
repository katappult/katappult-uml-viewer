import {DiagramComponent} from '../DiagramComponent'
import {EntityTable} from '../Entity/EntityTable'

export const EntityDiagram = () => {
    return (
        <DiagramComponent title="Entity Diagram" TableComponent={EntityTable} flowKey="Entity" />
    )
}
