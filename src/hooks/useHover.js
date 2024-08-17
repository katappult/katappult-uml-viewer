import {create} from 'zustand'

export const useHover = create(set => ({
    isHover: false,
    toggleHover: () => set(state => ({isHover: !state.isHover})),
}))
