import PropTypes from 'prop-types'
import {updateNodePosition} from '../utils'
import {useState, useEffect, useCallback} from 'react'
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    ConnectionMode,
} from '@xyflow/react'

export const ReactFlowContainer = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    nodeTypes,
    edgeTypes,
    flowKey,
}) => {
    const [rfInstance, setRfInstance] = useState(null)
    const [viewport, setViewport] = useState(() => {
        const savedViewport = localStorage.getItem('viewport' + flowKey)
        return savedViewport ? JSON.parse(savedViewport) : {x: 0, y: 0, zoom: 1} // Default position and zoom level
    })

    const onMove = useCallback((event, viewport) => {
        setViewport({x: viewport.x, y: viewport.y, zoom: viewport.zoom})
    }, [])

    useEffect(() => {
        localStorage.setItem('viewport' + flowKey, JSON.stringify(viewport))
    }, [flowKey, viewport])

    const handleNodeDragStop = (event, node) => {
        updateNodePosition(node.id, node.position, flowKey)
    }

    const handleInit = useCallback(
        instance => {
            setRfInstance(instance)
            instance.setViewport(viewport) // Restore the viewport when React Flow initializes
        },
        [viewport]
    )

    return (
        <div className="container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionMode={ConnectionMode.Loose}
                onMove={onMove}
                onInit={handleInit} // Set the instance and restore the viewport
                defaultViewport={viewport} // Use the restored viewport as the default
                onNodeDragStop={handleNodeDragStop}
            >
                <MiniMap />
                <Controls />
                <Background variant="lines" gap={30} size={4} />
            </ReactFlow>
        </div>
    )
}

ReactFlowContainer.propTypes = {
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    onNodesChange: PropTypes.func.isRequired,
    onEdgesChange: PropTypes.func.isRequired,
    nodeTypes: PropTypes.object,
    edgeTypes: PropTypes.object,
    flowKey: PropTypes.any,
}
