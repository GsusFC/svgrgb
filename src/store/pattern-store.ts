import { create } from 'zustand'

export type PatternType = 'dots' | 'lines' | 'grid' | 'waves' | 'bezier' | 'spiral' | 'custom'

interface PatternState {
  type: PatternType
  backgroundColor: string
  shapeColor: string
  spacing: number
  repeatX: number
  repeatY: number
  rotation: number
  scale: number
  width: number
  height: number
  aspectRatio: string
  animate: {
    position: boolean
    rotation: boolean
    scale: boolean
  }
}

interface PatternStore extends PatternState {
  setType: (type: PatternType) => void
  setBackgroundColor: (color: string) => void
  setShapeColor: (color: string) => void
  setSpacing: (spacing: number) => void
  setRepeat: (x: number, y: number) => void
  setRotation: (rotation: number) => void
  setScale: (scale: number) => void
  setDimensions: (width: number, height: number) => void
  setAspectRatio: (ratio: string) => void
  toggleAnimation: (type: keyof PatternState['animate']) => void
  resetPattern: () => void
}

const initialState: PatternState = {
  type: 'dots',
  backgroundColor: '#000000',
  shapeColor: '#FFFFFF',
  spacing: 20,
  repeatX: 1,
  repeatY: 1,
  rotation: 0,
  scale: 1,
  width: 400,
  height: 400,
  aspectRatio: '1:1',
  animate: {
    position: false,
    rotation: false,
    scale: false
  }
}

export const usePatternStore = create<PatternStore>((set) => ({
  ...initialState,
  setType: (type) => set({ type }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setShapeColor: (shapeColor) => set({ shapeColor }),
  setSpacing: (spacing) => set({ spacing }),
  setRepeat: (x, y) => set({ repeatX: x, repeatY: y }),
  setRotation: (rotation) => set({ rotation }),
  setScale: (scale) => set({ scale }),
  setDimensions: (width, height) => set({ width, height }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  toggleAnimation: (type) => 
    set((state) => ({
      animate: {
        ...state.animate,
        [type]: !state.animate[type]
      }
    })),
  resetPattern: () => set(initialState)
}))
