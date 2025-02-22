import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePatternPath = (type: string, params: any) => {
  // Pattern generation utilities
  switch (type) {
    case 'dots':
      return generateDots(params)
    case 'lines':
      return generateLines(params)
    case 'grid':
      return generateGrid(params)
    case 'waves':
      return generateWaves(params)
    case 'bezier':
      return generateBezier(params)
    case 'spiral':
      return generateSpiral(params)
    default:
      return ''
  }
}

const generateDots = ({ spacing, size }: { spacing: number; size: number }) => {
  return `
    M ${size/2},${size/2}
    m -${spacing/2},-${spacing/2}
    a ${spacing/4},${spacing/4} 0 1,0 ${spacing},0
    a ${spacing/4},${spacing/4} 0 1,0 -${spacing},0
  `
}

const generateLines = ({ spacing, angle }: { spacing: number; angle: number }) => {
  const rad = (angle * Math.PI) / 180
  const dx = spacing * Math.cos(rad)
  const dy = spacing * Math.sin(rad)
  
  return `M 0,0 l ${dx},${dy}`
}

const generateGrid = ({ spacing }: { spacing: number }) => {
  return `
    M ${spacing},0 L ${spacing},100
    M 0,${spacing} L 100,${spacing}
  `
}

const generateWaves = ({ amplitude, frequency }: { amplitude: number; frequency: number }) => {
  let path = 'M 0,50'
  for (let x = 0; x <= 100; x += 5) {
    const y = 50 + amplitude * Math.sin((x / 100) * Math.PI * 2 * frequency)
    path += ` L ${x},${y}`
  }
  return path
}

const generateBezier = ({ control }: { control: number }) => {
  return `M 0,50 C ${control},0 ${100-control},100 100,50`
}

const generateSpiral = ({ turns }: { turns: number }) => {
  let path = 'M 50,50'
  const points = 100
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2 * turns
    const radius = (i / points) * 40
    const x = 50 + radius * Math.cos(angle)
    const y = 50 + radius * Math.sin(angle)
    path += ` L ${x},${y}`
  }
  return path
}
