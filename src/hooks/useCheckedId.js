import {create} from 'zustand'

export const useCheckedId = create(set => ({
    isCheckedId: false,
    toggleCheckId: () => set(state => ({isCheckedId: !state.isCheckedId})),
}))
