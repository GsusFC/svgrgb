import { usePatternStore } from '@/store/pattern-store'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { cn, generatePatternPath, type PatternType } from '@/lib/utils'

interface PatternCanvasProps {
  className?: string
}

export const PatternCanvas = ({ className }: PatternCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const {
    type,
    backgroundColor,
    spacing,
    repeatX,
    rotation,
    scale,
    width,
    height,
    animate
  } = usePatternStore()

  const patternParams = useMemo(() => {
    switch (type) {
      case 'dots':
      case 'grid':
        return { spacing, size: scale }
      case 'lines':
        return { spacing, size: scale, angle: rotation }
      case 'waves':
        return { spacing, size: scale, amplitude: scale, frequency: repeatX }
      case 'bezier':
        return { spacing, size: scale, control: rotation }
      case 'spiral':
        return { spacing, size: scale, turns: rotation }
      default:
        return { spacing, size: scale }
    }
  }, [type, spacing, scale, rotation, repeatX])

  const generatePattern = useCallback(() => {
    if (!svgRef.current) return
    const svg = svgRef.current
    svg.innerHTML = generatePatternPath(type as PatternType, patternParams)
  }, [type, patternParams])

  useEffect(() => {
    generatePattern()
  }, [generatePattern])

  return (
    <div className={cn('relative group', className)}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn(
          'rounded-lg border border-gray-800 transition-transform',
          {
            'animate-pattern-position': animate.position,
            'animate-pattern-rotation': animate.rotation,
            'animate-pattern-scale': animate.scale
          }
        )}
        style={{ backgroundColor }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
        <div className="flex space-x-2">
          <button
            className="p-2 bg-gray-800 rounded hover:bg-gray-700 text-gray-300"
            onClick={() => {/* Export logic */}}
          >
            Export
          </button>
          <button
            className="p-2 bg-gray-800 rounded hover:bg-gray-700 text-gray-300"
            onClick={() => {/* Copy logic */}}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}
