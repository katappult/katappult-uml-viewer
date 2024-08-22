import PropTypes from 'prop-types'
import {updateNodePosition} from '../utils'
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
}) => {
    const handleNodeDragStop = (event, node) => {
        // Update the position in local storage when the node is moved
        updateNodePosition(node.id, node.position)
    }
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
                minZoom={0.2}
                onNodeDragStop={handleNodeDragStop}
                fitView
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
}
