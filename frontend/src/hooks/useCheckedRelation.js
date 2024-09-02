import {create} from 'zustand'

export const useCheckedRelation = create(set => ({
    isCheckedRelation: true,
    toggleCheckRelation: () =>
        set(state => ({isCheckedRelation: !state.isCheckedRelation})),
}))
