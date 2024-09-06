import PropTypes from 'prop-types'
import {useState, useCallback, useEffect} from 'react'
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    ConnectionMode,
    useReactFlow,
} from '@xyflow/react'
import axios from 'axios'

export const ReactFlowContainer = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    nodeTypes,
    edgeTypes,
    flowKey,
    id,
}) => {
    const [rfInstance, setRfInstance] = useState(null)
    const {setViewport} = useReactFlow()

    const viewportKey = flowKey.includes('Object')
        ? 'viewportObject'
        : 'viewportEntity'

    const saveFlow = useCallback(async () => {
        if (rfInstance) {
            const flow = rfInstance.toObject()
            const nodesData = flow.nodes.map(node => ({
                id: node.id,
                position: node.position,
            }))
            const nodesKey =
                viewportKey === 'viewportObject' ? 'NodesObject' : 'NodesEntity'

            try {
                await axios.put(`${import.meta.env.VITE_API}/tabs/${id}`, {
                    [viewportKey]: flow.viewport,
                    [nodesKey]: nodesData,
                })
            } catch (error) {
                console.error('Error saving flow:', error)
            }
        }
    }, [id, rfInstance, viewportKey])

    const fetchViewport = useCallback(async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}/tabs/${id}`
            )
            const data = response.data
            const viewportData = data[viewportKey]
            if (viewportData) {
                setViewport({
                    x: viewportData.x,
                    y: viewportData.y,
                    zoom: viewportData.zoom,
                })
            }
        } catch (error) {
            console.error('Failed to fetch viewport:', error)
        }
    }, [id, setViewport, viewportKey])

    useEffect(() => {
        fetchViewport()
    }, [fetchViewport])

    return (
        <div className="container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionMode={ConnectionMode.Loose}
                onMove={saveFlow} // Save flow when viewport is moved
                onInit={setRfInstance} // Set the instance when ReactFlow initializes
                onNodeDragStop={saveFlow} // Save flow when node drag stops
            >
                <MiniMap />
                <Controls />
                <Background variant="lines" gap={30} size={4} />
            </ReactFlow>
        </div>
    )
}

ReactFlowContainer.propTypes = {
    id: PropTypes.any,
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    onNodesChange: PropTypes.func.isRequired,
    onEdgesChange: PropTypes.func.isRequired,
    nodeTypes: PropTypes.object,
    edgeTypes: PropTypes.object,
    flowKey: PropTypes.any,
}
