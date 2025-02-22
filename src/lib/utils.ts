import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type PatternType = 'dots' | 'lines' | 'grid' | 'waves' | 'bezier' | 'spiral';

interface BasePatternParams {
  spacing: number;
  size: number;
}

type PatternParams = {
  dots: BasePatternParams;
  lines: BasePatternParams & { angle: number };
  grid: BasePatternParams;
  waves: BasePatternParams & { amplitude: number; frequency: number };
  bezier: BasePatternParams & { control: number };
  spiral: BasePatternParams & { turns: number };
};

export const generatePatternPath = (type: PatternType, params: PatternParams[typeof type]) => {
  switch (type) {
    case 'dots':
      return generateDots(params as PatternParams['dots'])
    case 'lines':
      return generateLines(params as PatternParams['lines'])
    case 'grid':
      return generateGrid(params as PatternParams['grid'])
    case 'waves':
      return generateWaves(params as PatternParams['waves'])
    case 'bezier':
      return generateBezier(params as PatternParams['bezier'])
    case 'spiral':
      return generateSpiral(params as PatternParams['spiral'])
    default:
      return ''
  }
}

const generateDots = (params: PatternParams['dots']) => {
  const { spacing, size } = params;
  return `
    M ${size/2},${size/2}
    m -${spacing/2},-${spacing/2}
    a ${spacing/4},${spacing/4} 0 1,0 ${spacing},0
    a ${spacing/4},${spacing/4} 0 1,0 -${spacing},0
  `
}

const generateLines = (params: PatternParams['lines']) => {
  const { spacing, angle } = params;
  const rad = (angle * Math.PI) / 180
  const dx = spacing * Math.cos(rad)
  const dy = spacing * Math.sin(rad)
  
  return `M 0,0 l ${dx},${dy}`
}

const generateGrid = (params: PatternParams['grid']) => {
  const { spacing } = params;
  return `
    M ${spacing},0 L ${spacing},100
    M 0,${spacing} L 100,${spacing}
  `
}

const generateWaves = (params: PatternParams['waves']) => {
  const { amplitude, frequency } = params;
  let path = 'M 0,50'
  for (let x = 0; x <= 100; x += 5) {
    const y = 50 + amplitude * Math.sin((x / 100) * Math.PI * 2 * frequency)
    path += ` L ${x},${y}`
  }
  return path
}

const generateBezier = (params: PatternParams['bezier']) => {
  const { control } = params;
  return `M 0,50 C ${control},0 ${100-control},100 100,50`
}

const generateSpiral = (params: PatternParams['spiral']) => {
  const { turns } = params;
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
