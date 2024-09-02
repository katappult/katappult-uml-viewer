import PropTypes from 'prop-types'
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
        const savedViewport = JSON.parse(
            localStorage.getItem(flowKey)
        )?.viewport
        return {
            x: savedViewport?.x ?? 0,
            y: savedViewport?.y ?? 0,
            zoom: savedViewport?.zoom ?? 1,
        }
    })

    const saveFlow = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject()
            localStorage.setItem(flowKey, JSON.stringify(flow))
        }
    }, [flowKey, rfInstance])

    useEffect(() => {
        saveFlow()
    }, [saveFlow, viewport])

    const handleNodeDragStop = (event, node) => {
        saveFlow()
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
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionMode={ConnectionMode.Loose}
                onMove={saveFlow} // Use the saveFlow function for saving on move
                onInit={handleInit} // Set the instance and restore the viewport
                defaultViewport={viewport} // Use the restored viewport as the default
                onNodeDragStop={handleNodeDragStop} // Save flow when node dragging stops
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
