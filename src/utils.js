import {Position, MarkerType} from '@xyflow/react'

// Convert camelCase to snake_case
export const camelToSnakeCase = str =>
    str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

// Type mapping for database types
export const typeMap = {
    String: 'VARCHAR',
    Integer: 'INT',
    Boolean: 'BOOL',
    Date: 'DATE',
}

// Create nodes table from entities
export const createNodesTable = entities => {
    if (!Array.isArray(entities) || entities.length === 0) {
        console.error('Entities array is invalid or empty')
        return []
    }

    return entities.map((entity, index) => {
        if (!entity.attributes.entity) return null

        const entityName = entity.attributes.entity.name
        const storedPosition = JSON.parse(
            localStorage.getItem(`nodePosition_${entityName}`)
        )

        const row = Math.floor(index / 5)
        const col = index % 5
        const defaultPosition = {x: 50 + col * 450, y: 100 + row * 250}

        return {
            id: entityName,
            label: entityName,
            type: 'table',
            position: storedPosition || defaultPosition,
            dragHandle: '.custom-drag-handle',
            data: entity.attributes.entity,
            style: {backgroundColor: 'rgba(127, 173, 139)'},
        }
    })
}

// Function to store the position of a node in local storage when it's moved
export const updateNodePosition = (nodeId, position) => {
    localStorage.setItem(`nodePosition_${nodeId}`, JSON.stringify(position))
}

export const takeKnoers = entities => {
    if (!Array.isArray(entities) || entities.length === 0) {
        console.error('Entities array is invalid or empty')
        return
    }

    const knoersArray = []
    const knoersSet = new Set()

    entities.forEach(entity => {
        if (entity.attributes.entity.knoers) {
            entity.attributes.entity.knoers.forEach(knoer => {
                if (!knoersSet.has(knoer)) {
                    knoersArray.push(knoer)
                    knoersSet.add(knoer)
                }
            })
        }
    })

    return knoersArray
}

export const createInterfaceNodesTable = knoers => {
    return knoers.map((knoer, index) => ({
        id: knoer,
        label: knoer,
        type: 'interface',
        position: {x: -450, y: 100 + index * 150},
        dragHandle: '.custom-drag-handle',
        data: knoer,
        style: {backgroundColor: 'rgba(127, 173, 139)'},
    }))
}

// Create edges based on relation type
const createEdges = (
    entities,
    relationType,
    strokeColor,
    startLabel,
    endLabel
) => {
    const edges = []
    Object.values(entities).forEach(entity => {
        if (entity.attributes[relationType]) {
            entity.attributes[relationType].forEach(relation => {
                if (relation.id) {
                    edges.push({
                        id: `${relation.id}`,
                        source: `${relation.roleAClass}`,
                        target: `${relation.roleBClass}`,
                        data: {
                            startLabel: `${startLabel}`,
                            endLabel: `${endLabel}`,
                        },
                        type: 'floating',
                        style: {strokeWidth: 5, stroke: strokeColor},
                    })
                }
            })
        }
    })
    return edges
}

const createKnoersEdges = (entities, strokeColor, startLabel, endLabel) => {
    const edges = []
    Object.values(entities).forEach(entity => {
        if (entity.attributes.entity && entity.attributes.entity.knoers) {
            entity.attributes.entity.knoers.forEach((knoer, index) => {
                edges.push({
                    id: `${entity.attributes.entity.name}_${knoer}_${index}`,
                    source: `${entity.attributes.entity.name}`,
                    target: `${knoer}`,
                    data: {
                        startLabel: `${startLabel}`,
                        endLabel: `${endLabel}`,
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                    type: 'floating',
                    style: {strokeWidth: 5, stroke: strokeColor},
                })
            })
        }
    })
    return edges
}

export const createEdgeOneToMany = entities =>
    createEdges(entities, 'oneToMany', 'red', '1', '*')
export const createEdgeManyToMany = entities =>
    createEdges(entities, 'manyToMany', 'yellow', '*', '*')
export const createEdgeOneToOne = entities =>
    createEdges(entities, 'oneToOne', 'blue', '1', '1')
export const createInterfaceEdge = entities =>
    createKnoersEdges(entities, 'orange')
// Get parameters for edge positioning, considering only left and right positions
export const getParams = (nodeA, nodeB) => {
    const centerA = getNodeCenter(nodeA)
    const centerB = getNodeCenter(nodeB)
    const position = centerA.x > centerB.x ? Position.Left : Position.Right
    const [x, y] = getHandleCoordsByPosition(nodeA, position)
    return [x, y, position]
}

// Get handle coordinates based on position, with only left and right options
export const getHandleCoordsByPosition = (node, handlePosition) => {
    const handle = node.internals.handleBounds.source.find(
        h => h.position === handlePosition
    )

    const x =
        node.internals.positionAbsolute.x +
        handle.x +
        (handlePosition === Position.Right ? handle.width : 0)
    const y = node.internals.positionAbsolute.y + handle.y + handle.height / 2

    return [x, y]
}

// Get the center coordinates of a node
export const getNodeCenter = node => ({
    x: node.internals.positionAbsolute.x + node.measured.width / 2,
    y: node.internals.positionAbsolute.y + node.measured.height / 2,
})

// Get parameters for edges
export const getEdgeParams = (source, target) => {
    const [sx, sy, sourcePos] = getParams(source, target)
    const [tx, ty, targetPos] = getParams(target, source)
    return {sx, sy, tx, ty, sourcePos, targetPos}
}
