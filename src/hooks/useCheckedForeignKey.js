import {create} from 'zustand'

export const useCheckedForeignKey = create(set => ({
    isCheckedForeignKey: false,
    toggleCheckForeignKey: () => set(state => ({isCheckedForeignKey: !state.isCheckedForeignKey})),
}))
