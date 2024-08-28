import PropTypes from 'prop-types'
import {Table} from '../Table'

export const ObjectTable = ({data}) => {
    return <Table data={data} />
}

ObjectTable.propTypes = {
    data: PropTypes.object.isRequired,
}
