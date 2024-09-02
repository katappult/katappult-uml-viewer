import {create} from 'zustand'

export const useCheckedAttribute = create(set => ({
    isCheckedAttribute: true,
    toggleCheckAttribute: () =>
        set(state => ({isCheckedAttribute: !state.isCheckedAttribute})),
}))
