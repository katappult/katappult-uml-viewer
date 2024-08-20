import PropTypes from 'prop-types'
import {useStore} from '../hooks/useStore'
import {camelToSnakeCase} from '../utils'
import {useCheckedStore} from '../hooks/useCheckedStore'

export const ListComponent = ({
    title,
    transformItemName = name => name.replace('.json', ''),
}) => {
    const {data} = useStore()
    const {checkedItems, setCheckedItems} = useCheckedStore()

    const handleCheckboxChange = itemName => {
        setCheckedItems(prev =>
            prev.includes(itemName)
                ? prev.filter(name => name !== itemName)
                : [...prev, itemName]
        )
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">{title}</button>
            <div className="dropdown-content">
                {data &&
                    Array.isArray(data) &&
                    data.map((item, index) => {
                        const itemName = item.attributes.entity.name

                        console.log(itemName)
                        return (
                            <div className="drop-element" key={index}>
                                <input
                                    type="checkbox"
                                    checked={
                                        Array.isArray(checkedItems) &&
                                        checkedItems.includes(itemName)
                                    }
                                    onChange={() =>
                                        handleCheckboxChange(itemName)
                                    }
                                />
                                {title.includes('Object')
                                    ? transformItemName(itemName)
                                    : camelToSnakeCase(
                                          transformItemName(itemName)
                                      )}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

ListComponent.propTypes = {
    title: PropTypes.string.isRequired,
    transformItemName: PropTypes.func,
}
