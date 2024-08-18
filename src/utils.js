import {Position} from '@xyflow/react'

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
    return Object.entries(entities)
        .map(([key, value], index) => {
            if (!value.entity) return null
            const row = Math.floor(index / 5)
            const col = index % 5
            return {
                id: key,
                label: key,
                type: 'table',
                position: {x: 50 + col * 450, y: 100 + row * 250},
                dragHandle: '.custom-drag-handle',
                data: value.entity,
                style: {backgroundColor: 'rgba(127, 173, 139)'},
            }
        })
        .filter(Boolean)
}

export const takeKnoers = entities => {
    if (!entities || typeof entities !== 'object') {
        console.error('Entities object is invalid or empty')
        return
    }

    const knoersArray = []
    const knoersSet = new Set()

    Object.entries(entities).forEach(([value]) => {
        if (value && value.entity && value.entity.knoers) {
            value.entity.knoers.forEach(knoer => {
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
    return knoers.map(knoer => ({
        id: knoer,
        label: knoer,
        type: 'knoer',
        position: {x: 50, y: 100}, // Adjusted position values
        dragHandle: '.custom-drag-handle',
        data: knoer, // Changed from value.entity to knoer
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
        if (entity[relationType]) {
            entity[relationType].forEach(relation => {
                if (relation.id) {
                    edges.push({
                        id: `${relation.id}`,
                        source: `${relation.roleAClass.charAt(0).toLowerCase() + relation.roleAClass.slice(1)}.json`,
                        target: `${relation.roleBClass.charAt(0).toLowerCase() + relation.roleBClass.slice(1)}.json`,
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

export const createEdgeOneToMany = entities =>
    createEdges(entities, 'oneToMany', 'red', '1', '*')
export const createEdgeManyToMany = entities =>
    createEdges(entities, 'manyToMany', 'yellow', '*', '*')
export const createEdgeOneToOne = entities =>
    createEdges(entities, 'oneToOne', 'blue', '1', '1')

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
