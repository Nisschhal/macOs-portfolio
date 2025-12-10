import { INITIAL_Z_INDEX, WINDOW_CONFIG, type WindowConfig } from "#constants"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface WindowStoreState {
  windows: WindowConfig
  nextZIndex: number
  openWindow: (windowKey: string, data?: any) => void
  closeWindow: (windowKey: string) => void
  focusWindow: (windowKey: string) => void
}

const useWindowStore = create(
  immer<WindowStoreState>((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey: string, data = null) => {
      set((state) => {
        const win = state.windows[windowKey as keyof WindowConfig]
        win.isOpen = true
        win.data = data
        win.zIndex = state.nextZIndex
        win.data = data ?? win.data
        state.nextZIndex++
      })
    },
    closeWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey as keyof WindowConfig]
        win.isOpen = false
        win.zIndex = INITIAL_Z_INDEX
        win.data = null
      })
    },
    focusWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey as keyof WindowConfig]
        win.zIndex = state.nextZIndex++
      })
    },
  }))
)

export default useWindowStore
