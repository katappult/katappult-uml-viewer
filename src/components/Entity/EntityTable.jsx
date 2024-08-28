import PropTypes from 'prop-types'
import {Table} from '../Table'
export const EntityTable = ({data}) => {
    return <Table data={data} isEntity />
}

EntityTable.propTypes = {
    data: PropTypes.object.isRequired,
    showId: PropTypes.bool,
}
