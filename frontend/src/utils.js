import {Position, MarkerType} from '@xyflow/react'
import axios from 'axios'

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

// Fetch positions from API
const fetchPositions = async (id, title) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/tabs/${id}`)
        return title && title.includes('Object')
            ? response.data.NodesObject
            : response.data.NodesEntity
    } catch (error) {
        console.error('Error fetching positions:', error)
        return []
    }
}

// Create nodes table from entities
export const createNodesTable = async (entities, title, id) => {
    if (!Array.isArray(entities) || entities.length === 0) {
        console.error('Entities array is invalid or empty')
        return []
    }

    const positions = await fetchPositions(id, title)

    return entities.map((entity, index) => {
        if (!entity.attributes.entity) return null

        const entityName =
            title && title.includes('Object')
                ? entity.attributes.entity.name
                : entity.attributes.entity.table
        const storedPosition = positions.find(
            node => node.id === entityName
        )?.position

        const row = Math.floor(index / 5)
        const col = index % 5
        const defaultPosition = {x: 50 + col * 450, y: 100 + row * 250}

        return {
            id: entityName,
            label: entityName,
            type: 'table',
            position: storedPosition || defaultPosition,
            dragHandle: '.custom-drag-handle',
            data: entity.attributes,
            style: {backgroundColor: 'rgba(127, 173, 139)'},
        }
    })
}

export const createUserAccountNodeTable = async (title, id) => {
    const entity = {
        entity: {
            name: 'UserAccount',
            table: 'GEN_USER_ACCOUNT',
            attributes: [
                {type: 'String', name: 'firstname', id: 'firstnameID'},
                {type: 'String', name: 'lastname', id: 'lastnameID'},
            ],
        },
    }

    const entityName =
        title && title.includes('Object')
            ? entity.entity.name
            : entity.entity.table

    const positions = await fetchPositions(id, title)
    const storedPosition = positions.find(
        node => node.id === entityName
    )?.position

    const defaultPosition = {x: 50, y: 100}

    return {
        id: entityName,
        label: entityName,
        type: 'table',
        position: storedPosition || defaultPosition,
        data: entity,
        dragHandle: '.custom-drag-handle',
    }
}

export const createInterfaceNodesTable = async (knoers, id) => {
    const positions = await fetchPositions(id, 'Object')

    return knoers.map((knoer, index) => {
        const storedPosition = positions.find(
            node => node.id === knoer
        )?.position
        const defaultPosition = {x: -450, y: 100 + index * 150}

        return {
            id: knoer,
            label: knoer,
            type: 'interface',
            position: storedPosition || defaultPosition,
            dragHandle: '.custom-drag-handle',
            data: knoer,
            style: {backgroundColor: 'rgba(127, 173, 139)'},
        }
    })
}

// Create edges based on relation type
const createEdges = (
    entities,
    relationType,
    strokeColor,
    startLabel,
    endLabel,
    title
) => {
    const edges = []
    Object.values(entities).forEach(entity => {
        if (entity.attributes[relationType]) {
            entity.attributes[relationType].forEach(relation => {
                if (relation.id) {
                    edges.push({
                        id: `${relation.id}`,
                        source:
                            title && title.includes('Entity')
                                ? `GEN_${camelToSnakeCase(relation.roleAClass).toUpperCase()}`
                                : relation.roleAClass,
                        target:
                            title && title.includes('Entity')
                                ? `GEN_${camelToSnakeCase(relation.roleBClass).toUpperCase()}`
                                : relation.roleBClass,
                        data: {startLabel, endLabel},
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
                    data: {startLabel, endLabel},
                    markerEnd: {type: MarkerType.ArrowClosed},
                    animated: true,
                    type: 'floating',
                    style: {strokeWidth: 5, stroke: strokeColor},
                })
            })
        }
    })
    return edges
}

export const createEdgeOneToMany = (entities, title) =>
    createEdges(entities, 'oneToMany', 'red', '1', '*', title)
export const createEdgeManyToMany = (entities, title) =>
    createEdges(entities, 'manyToMany', 'yellow', '*', '*', title)
export const createEdgeOneToOne = (entities, title) =>
    createEdges(entities, 'oneToOne', 'blue', '1', '1', title)
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
