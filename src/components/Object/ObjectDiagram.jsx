import {DiagramComponent} from '../DiagramComponent'
import {ObjectTable} from '../Object/ObjectTable'
export const ObjectDiagram = ({id}) => {
    return (
        <DiagramComponent
            title="Object Diagram"
            TableComponent={ObjectTable}
            flowKey={'object' + id}
        />
    )
}
