import {Tr} from '../Tr'

export const LifeCycleManagedAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <>
                    <Tr attributes={'lifecycle_oid'} type={'LONG'} />
                    <Tr attributes={'current_state'} type={'VARCHAR'} />
                </>
            ) : (
                <>
                    <Tr attributes={'lifecycleInfo'} type={'LifecycleInfo'} />
                    <Tr attributes={'currentstate'} type={'String'} />
                </>
            )}
        </>
    )
}

export const TypeManagedAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'type_oid'} type={'LONG'} />
            ) : (
                <Tr attributes={'typeInfo'} type={'TypeInfo'} />
            )}
        </>
    )
}

export const ThumbedAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'thumb_oid'} type={'LONG'} />
            ) : (
                <Tr attributes={'thumbInfo '} type={'ThumbInfo'} />
            )}
        </>
    )
}

export const NumberableAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'reference'} type={'VARCHAR'} />
            ) : (
                <Tr attributes={'number '} type={'String'} />
            )}
        </>
    )
}
export const IteratedAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'iteration_number'} type={'INT'} />
            ) : (
                <Tr attributes={'iterationInfo '} type={'IterationInfo'} />
            )}
        </>
    )
}
export const VersionedAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'version_number'} type={'VARCHAR'} />
            ) : (
                <Tr attributes={'versionInfo '} type={'VersinInfo'} />
            )}
        </>
    )
}
export const ContentHolderAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'content_oid'} type={'LONG'} />
            ) : (
                <Tr attributes={'contentInfo '} type={'ContentInfo'} />
            )}
        </>
    )
}
export const WorkableAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <>
                    <Tr attributes={'locked'} type={'BOOL'} />
                    <Tr attributes={'locked_date'} type={'DATE'} />
                    <Tr attributes={'lockedBy'} type={'VARCHAR'} />
                </>
            ) : (
                <>
                    <Tr attributes={'workInfo '} type={'WorkInfo'} />
                </>
            )}
        </>
    )
}
export const ContactableAttributes = ({model}) => {
    return (
        <>
            {model ? (
                <Tr attributes={'contact_mechanism_oid'} type={'LONG'} />
            ) : (
                <Tr attributes={'contactInfo '} type={'ContactInfo'} />
            )}
        </>
    )
}
