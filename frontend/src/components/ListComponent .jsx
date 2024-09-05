import PropTypes from 'prop-types'
import {useStore} from '../hooks/useStore'
import {camelToSnakeCase} from '../utils'
import {useCheckedStore} from '../hooks/useCheckedStore'
import {CheckBox} from './CheckBox'

import axios from 'axios'
import {useEffect} from 'react'

export const ListComponent = ({title, id}) => {
    const {data} = useStore()
    const {checkedItems, setCheckedItems} = useCheckedStore()

    useEffect(() => {
        const fetchCheckedItems = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API}/tabs/${id}`
                )
                setCheckedItems(response.data.selectedItems)
            } catch (error) {
                console.error('Error fetching checked items from API:', error)
            }
        }

        fetchCheckedItems()
    }, [id, setCheckedItems])

    const handleCheckboxChange = itemName => {
        setCheckedItems(prev => {
            const isChecked = prev.includes(itemName)
            const itemTableName = data.find(
                item => item.attributes.entity.name === itemName
            )?.attributes.entity.table // Added optional chaining

            if (!itemTableName) return prev // Added check for undefined itemTableName

            const updatedCheckedItems = isChecked
                ? prev.filter(
                      name => name !== itemTableName && name !== itemName
                  )
                : [...prev, itemTableName, itemName]

            sendCheckedItemsToAPI(updatedCheckedItems)
            return updatedCheckedItems
        })
    }

    const sendCheckedItemsToAPI = async checkedItems => {
        try {
            await axios.put(`${import.meta.env.VITE_API}/tabs/${id}`, {
                selectedItems: checkedItems,
            })
        } catch (error) {
            console.error('Error sending checked items to API:', error)
        }
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">{title}</button>
            <div className="dropdown-content">
                {data &&
                    Array.isArray(data) &&
                    data.map((item, index) => {
                        const itemName =
                            title && title.includes('Object')
                                ? item.attributes.entity.name
                                : item.attributes.entity.table
                        return (
                            <div className="drop-element" key={index}>
                                <CheckBox
                                    text={
                                        title.includes('Object')
                                            ? itemName
                                            : camelToSnakeCase(itemName)
                                    }
                                    isChecked={
                                        Array.isArray(checkedItems) &&
                                        checkedItems.includes(itemName)
                                    }
                                    toggle={() => {
                                        title.includes('Object')
                                            ? handleCheckboxChange(itemName)
                                            : handleCheckboxChange(
                                                  camelToSnakeCase(itemName)
                                              )
                                    }}
                                />
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
