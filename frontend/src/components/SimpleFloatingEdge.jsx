import {useHover} from '../hooks/useHover'
import PropTypes from 'prop-types'
import {
    EdgeLabelRenderer,
    BaseEdge,
    getSmoothStepPath,
    useInternalNode,
} from '@xyflow/react'

import {getEdgeParams} from '../utils'

const EdgeLabel = ({transform, label}) => {
    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 9,
                paddingLeft: 30,
                color: '#ff5050',
                fontSize: 50,
                fontWeight: 'bold',
                transform,
            }}
            className="nodrag nopan"
        >
            {label}
        </div>
    )
}

export const SimpleFloatingEdge = ({
    id,
    source,
    target,
    markerEnd,
    style,
    data,
}) => {
    const sourceNode = useInternalNode(source)
    const targetNode = useInternalNode(target)
    const {isHover, toggleHover} = useHover()

    if (!sourceNode || !targetNode) {
        return null
    }

    const {sx, sy, tx, ty, sourcePos, targetPos} = getEdgeParams(
        sourceNode,
        targetNode
    )

    const [edgePath] = getSmoothStepPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
        borderRadius: 100,
    })

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={style}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
            />
            <EdgeLabelRenderer>
                {isHover && data.startLabel && (
                    <EdgeLabel
                        transform={`translate(-10%, 10%) translate(${sx}px,${sy}px)`}
                        label={data.startLabel}
                    />
                )}
                {isHover && data.endLabel && (
                    <EdgeLabel
                        transform={`translate(-50%, -100%) translate(${tx}px,${ty}px)`}
                        label={data.endLabel}
                    />
                )}
            </EdgeLabelRenderer>
        </>
    )
}

SimpleFloatingEdge.propTypes = {
    id: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    markerEnd: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
}
EdgeLabel.propTypes = {
    transform: PropTypes.string,
    label: PropTypes.string,
}
