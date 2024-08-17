import {create} from 'zustand'

export const useCheckedStore = create(set => ({
    checkedItems: [],
    setCheckedItems: updater =>
        set(state => ({
            checkedItems:
                typeof updater === 'function'
                    ? updater(state.checkedItems)
                    : updater,
        })),
}))
