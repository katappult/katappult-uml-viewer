export const LifeCycleManagedAttributes = () => {
    return (
        <>
            <tr
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <td style={{textAlign: 'left'}}>lifecycle_oid</td>
                <td style={{textAlign: 'right'}}>LONG</td>
            </tr>
            <tr
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <td style={{textAlign: 'left'}}>current_state</td>
                <td style={{textAlign: 'right'}}>String</td>
            </tr>
        </>
    )
}

export const TypeManaged = () => {}

export const Thumbed = () => {}

export const Numberable = () => {}
export const Iterated = () => {}
export const Versioned = () => {}
export const ContentHolder = () => {}
export const Workable = () => {}
export const Contactable = () => {}
