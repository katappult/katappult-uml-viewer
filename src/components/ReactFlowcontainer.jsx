import PropTypes from 'prop-types'

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
