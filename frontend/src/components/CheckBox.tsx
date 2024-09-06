import React from 'react'

export const CheckBox = ({isChecked,toggle,text}) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={toggle}
            />
            {text}
        </label>
    )
}
