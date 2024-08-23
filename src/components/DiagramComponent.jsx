import '@xyflow/react/dist/style.css'
import PropTypes from 'prop-types'
import {useMemo, useState, useEffect} from 'react'
import {SimpleFloatingEdge} from '../components/SimpleFloatingEdge'
import {useStore} from '../hooks/useStore'
import {ListComponent} from '../components/ListComponent '
import {useCheckedStore} from '../hooks/useCheckedStore'
import {
    createNodesTable,
    createEdgeOneToMany,
    createEdgeManyToMany,
    createEdgeOneToOne,
    createInterfaceEdge,
} from '../utils'
import {useNodesState, useEdgesState} from '@xyflow/react'
import {ReactFlowContainer} from './ReactFlowContainer'
import {InterfaceTable} from './Interface/InterfaceTable'
import {createInterfaceNodesTable} from '../utils'

export const DiagramComponent = ({title, TableComponent}) => {
    const {data, fetchData} = useStore()
    const {checkedItems} = useCheckedStore()

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const nodeTypes = useMemo(
        () => ({
            table: TableComponent,
            interface: InterfaceTable,
        }),
        [TableComponent]
    )

    const edgeTypes = useMemo(() => ({floating: SimpleFloatingEdge}), [])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            if (!data) {
                fetchData()
            }

            const displayedNodes = createNodesTable(data).filter(node =>
                checkedItems.includes(node.id)
            )

            let newNodes = displayedNodes

            if (data && title.toLowerCase().includes('object')) {
                const knoersNodes = displayedNodes.flatMap(node =>
                    node.data.entity.knoers &&
                    node.data.entity.knoers.length > 0
                        ? createInterfaceNodesTable(node.data.entity.knoers)
                        : []
                )

                // Filter out knoers nodes that are already included
                knoersNodes.forEach(knoerNode => {
                    if (!newNodes.some(node => node.id === knoerNode.id)) {
                        newNodes.push(knoerNode)
                    }
                })
            }

            const newEdges = data
                ? [
                      ...createEdgeOneToMany(data),
                      ...createEdgeManyToMany(data),
                      ...createEdgeOneToOne(data),
                      ...createInterfaceEdge(data),
                  ]
                : []

            setNodes(newNodes)
            setEdges(newEdges)
            setIsLoading(false)
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }, [data, fetchData, setEdges, setNodes, checkedItems, title])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    return (
        <>
            <h1>{title}</h1>
            <div className="flex-container">
                <ListComponent title={title} />
            </div>
            <ReactFlowContainer
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
            />
        </>
    )
}

DiagramComponent.propTypes = {
    title: PropTypes.string.isRequired,
    TableComponent: PropTypes.any.isRequired,
}
