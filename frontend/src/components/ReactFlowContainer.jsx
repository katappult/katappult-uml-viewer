import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    ConnectionMode,
    useReactFlow,
} from '@xyflow/react';
import axios from 'axios';

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
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    // Determine the key to use for viewport based on flowKey
    const viewportKey = flowKey.includes('Object')
        ? 'viewportObject'
        : 'viewportEntity';

    const saveFlow = useCallback(async () => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            const nodesData = flow.nodes.map((node) => ({
                id: node.id,
                position: node.position,
            }));
            const nodesKey =
                viewportKey === 'viewportObject' ? 'NodesObject' : 'NodesEntity';

            try {
                await axios.put(`${import.meta.env.VITE_API}/tabs/${id}`, {
                    [viewportKey]: flow.viewport,
                    [nodesKey]: nodesData, // Conditionally set nodes key
                });
            } catch (error) {
                console.error('Error saving flow:', error);
            }
        }
    }, [id, rfInstance, viewportKey]);

    const fetchViewport = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}/tabs/${id}`
            );
            const data = await response.json();
            const viewportData = data[viewportKey];
            if (viewportData) {
                setViewport({
                    x: viewportData.x,
                    y: viewportData.y,
                    zoom: viewportData.zoom,
                });
            }
        } catch (error) {
            console.error('Failed to fetch viewport:', error);
        }
    }, [id, setViewport, viewportKey]);

    useEffect(() => {
        fetchViewport();
    }, [fetchViewport]);

    const handleInit = useCallback(
        (instance) => {
            setRfInstance(instance);
            if (viewportKey) {
                instance.setViewport(viewportKey); // Restore the viewport when React Flow initializes
            }
        },
        [viewportKey]
    );

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
                onMove={saveFlow} // Save flow on move
                onInit={handleInit} // Set the instance and restore the viewport
                onNodeDragStop={saveFlow} // Save flow when node dragging stops
            >
                <MiniMap />
                <Controls />
                <Background variant="lines" gap={30} size={4} />
            </ReactFlow>
        </div>
    );
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
};
