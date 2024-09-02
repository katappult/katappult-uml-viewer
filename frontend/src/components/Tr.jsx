import PropTypes from 'prop-types'

export const Tr = ({attributes, type, id}) => {
    return (
        <tr
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...(id ? {fontWeight: 'bold', fontStyle: 'italic'} : {}),
            }}
        >
            <td style={{textAlign: 'left'}}>{attributes}</td>
            <td style={{textAlign: 'right'}}>{type}</td>
        </tr>
    )
}
Tr.propTypes = {
    attributes: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.any,
}
