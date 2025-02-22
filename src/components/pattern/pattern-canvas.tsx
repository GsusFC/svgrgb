import { usePatternStore } from '@/store/pattern-store'
import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface PatternCanvasProps {
  className?: string
}

export const PatternCanvas = ({ className }: PatternCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const {
    type,
    backgroundColor,
    shapeColor,
    spacing,
    repeatX,
    repeatY,
    rotation,
    scale,
    width,
    height,
    animate
  } = usePatternStore()

  const generatePattern = useCallback(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    svg.innerHTML = ''

    // Pattern generation logic based on type
    switch (type) {
      case 'dots':
        // Implementation for dots pattern
        break
      case 'lines':
        // Implementation for lines pattern
        break
      // ... other pattern types
    }
  }, [type, spacing, repeatX, repeatY, rotation, scale, shapeColor])

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
