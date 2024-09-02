import {create} from 'zustand'

export const useCheckedInterface = create(set => ({
    isCheckedInterface: true,
    toggleCheckInterface: () =>
        set(state => ({isCheckedInterface: !state.isCheckedInterface})),
}))
