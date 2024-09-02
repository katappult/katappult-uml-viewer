import {create} from 'zustand'

export const useCheckedLegacyEntity = create(set => ({
    isCheckedLegacyEntity: true,
    toggleCheckLegacyEntity: () =>
        set(state => ({isCheckedLegacyEntity: !state.isCheckedLegacyEntity})),
}))
