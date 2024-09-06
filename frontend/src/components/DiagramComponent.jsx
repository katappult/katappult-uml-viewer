import '@xyflow/react/dist/style.css'
import PropTypes from 'prop-types'
import {useMemo, useState, useEffect} from 'react'
import {SimpleFloatingEdge} from '../components/SimpleFloatingEdge'
import {useStore} from '../hooks/useStore'
import {ListComponent} from '../components/ListComponent '
import {useCheckedStore} from '../hooks/useCheckedStore'
import {createUserAccountNodeTable} from '../utils'
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
import {useCheckedId} from '../hooks/useCheckedId'
import {useCheckedForeignKey} from '../hooks/useCheckedForeignKey'
import {useCheckedAttribute} from '../hooks/useCheckedAttribute'
import {useCheckedRelation} from '../hooks/useCheckedRelation'
import {useCheckedInterface} from '../hooks/useCheckedInterface'
import {useCheckedLegacyEntity} from '../hooks/useCheckedLegacyEntity'
import {CheckBox} from '../components/CheckBox'

export const DiagramComponent = ({title, TableComponent, flowKey, id}) => {
    const {data, fetchData} = useStore()
    const {isCheckedId, toggleCheckId} = useCheckedId()
    const {isCheckedForeignKey, toggleCheckForeignKey} = useCheckedForeignKey()
    const {isCheckedAttribute, toggleCheckAttribute} = useCheckedAttribute()
    const {isCheckedRelation, toggleCheckRelation} = useCheckedRelation()
    const {isCheckedInterface, toggleCheckInterface} = useCheckedInterface()
    const {isCheckedLegacyEntity, toggleCheckLegacyEntity} =
        useCheckedLegacyEntity()
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
        const fetchNodesAndEdges = async () => {
            try {
                if (!data) {
                    await fetchData()
                }

                const displayedNodes = (
                    await createNodesTable(data, title, id)
                ).filter(node => checkedItems.includes(node.id))

                let newNodes = [
                    ...(isCheckedLegacyEntity
                        ? [await createUserAccountNodeTable(title, id)]
                        : []),
                    ...displayedNodes,
                ]

                if (data && title.toLowerCase().includes('object')) {
                    const knoersNodes = await Promise.all(
                        displayedNodes.flatMap(async node =>
                            node.data.entity.knoers &&
                            node.data.entity.knoers.length > 0 &&
                            isCheckedInterface
                                ? await createInterfaceNodesTable(
                                      node.data.entity.knoers,
                                      id
                                  )
                                : []
                        )
                    )

                    knoersNodes.flat().forEach(knoerNode => {
                        if (!newNodes.some(node => node.id === knoerNode.id)) {
                            newNodes.push(knoerNode)
                        }
                    })
                }

                const newEdges =
                    isCheckedRelation && data
                        ? [
                              ...createEdgeOneToMany(data, title),
                              ...createEdgeManyToMany(data, title),
                              ...createEdgeOneToOne(data, title),
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
        }

        fetchNodesAndEdges()
    }, [
        data,
        fetchData,
        setEdges,
        setNodes,
        checkedItems,
        title,
        isCheckedRelation,
        isCheckedInterface,
        isCheckedLegacyEntity,
        flowKey,
        id,
    ])
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    return (
        <>
            <div className="flex-container">
                <ListComponent title={title} id={id} />
            </div>
            <CheckBox
                isChecked={isCheckedId}
                toggle={toggleCheckId}
                text={'Display OID'}
            />
            <CheckBox
                isChecked={isCheckedForeignKey}
                toggle={toggleCheckForeignKey}
                text={'Display Foreign Key'}
            />
            <CheckBox
                isChecked={isCheckedAttribute}
                toggle={toggleCheckAttribute}
                text={'Display Attributes'}
            />
            <CheckBox
                isChecked={isCheckedRelation}
                toggle={toggleCheckRelation}
                text={'Display Relation'}
            />
            <CheckBox
                isChecked={isCheckedInterface}
                toggle={toggleCheckInterface}
                text={'Display Interface'}
            />
            <CheckBox
                isChecked={isCheckedLegacyEntity}
                toggle={toggleCheckLegacyEntity}
                text={'Display Legacy Entity'}
            />

            <ReactFlowContainer
                id={id}
                flowKey={flowKey}
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
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    TableComponent: PropTypes.any.isRequired,
    flowKey: PropTypes.any,
}
