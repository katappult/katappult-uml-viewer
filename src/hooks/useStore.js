import {create} from 'zustand'

export const useStore = create(set => ({
    data: null,
    setData: newData => set({data: newData}),
    fetchData: async () => {
        try {
            const response = await fetch(
                '/Markeplace-config.json'
            )
            const result = await response.json()
            set({data: result})
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
}))
