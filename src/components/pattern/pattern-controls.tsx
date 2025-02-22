import { usePatternStore, PatternType } from '@/store/pattern-store'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const patternTypes: { value: PatternType; label: string }[] = [
  { value: 'dots', label: 'Dots' },
  { value: 'lines', label: 'Lines' },
  { value: 'grid', label: 'Grid' },
  { value: 'waves', label: 'Waves' },
  { value: 'bezier', label: 'Bézier Curves' },
  { value: 'spiral', label: 'Spiral' },
  { value: 'custom', label: 'Custom Path' }
]

const aspectRatios = [
  { value: '1:1', label: '1:1' },
  { value: '16:9', label: '16:9' },
  { value: '4:3', label: '4:3' },
  { value: '21:9', label: '21:9' },
  { value: '3:2', label: '3:2' },
  { value: '9:16', label: '9:16' }
]

export const PatternControls = () => {
  const {
    type,
    backgroundColor,
    shapeColor,
    spacing,
    repeatX,
    repeatY,
    aspectRatio,
    animate,
    setType,
    setBackgroundColor,
    setShapeColor,
    setSpacing,
    setRepeat,
    setAspectRatio,
    toggleAnimation
  } = usePatternStore()

  const handleSpacingChange = (value: number[]) => {
    setSpacing(value[0])
  }

  const handleRepeatXChange = (value: number[]) => {
    setRepeat(value[0], repeatY)
  }

  const handleRepeatYChange = (value: number[]) => {
    setRepeat(repeatX, value[0])
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 p-6 space-y-6">
      {/* Pattern Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Pattern Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as PatternType)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-gray-300"
        >
          {patternTypes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400">Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Background</label>
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded border border-gray-700"
                style={{ backgroundColor }}
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs w-20 text-gray-300"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Shape</label>
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded border border-gray-700"
                style={{ backgroundColor: shapeColor }}
              />
              <input
                type="text"
                value={shapeColor}
                onChange={(e) => setShapeColor(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs w-20 text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div className="space-y-2">
        <label className="text-xs text-gray-500">Aspect Ratio</label>
        <div className="grid grid-cols-3 gap-2">
          {aspectRatios.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setAspectRatio(value)}
              className={cn(
                'px-2 py-1 text-xs border rounded transition-colors',
                aspectRatio === value
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Properties */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400">Properties</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs text-gray-500">Spacing</label>
            <span className="text-xs text-gray-500">{spacing}px</span>
          </div>
          <Slider
            value={[spacing]}
            min={10}
            max={100}
            step={1}
            onValueChange={handleSpacingChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs text-gray-500">Repeat X</label>
            <span className="text-xs text-gray-500">{repeatX}x</span>
          </div>
          <Slider
            value={[repeatX]}
            min={1}
            max={10}
            step={1}
            onValueChange={handleRepeatXChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs text-gray-500">Repeat Y</label>
            <span className="text-xs text-gray-500">{repeatY}x</span>
          </div>
          <Slider
            value={[repeatY]}
            min={1}
            max={10}
            step={1}
            onValueChange={handleRepeatYChange}
          />
        </div>
      </div>

      {/* Animation Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400">Animation</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={animate.position}
              onChange={() => toggleAnimation('position')}
              className="rounded bg-gray-800 border-gray-700 text-blue-600"
            />
            <span className="text-xs text-gray-400">Animate Position</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={animate.rotation}
              onChange={() => toggleAnimation('rotation')}
              className="rounded bg-gray-800 border-gray-700 text-blue-600"
            />
            <span className="text-xs text-gray-400">Animate Rotation</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={animate.scale}
              onChange={() => toggleAnimation('scale')}
              className="rounded bg-gray-800 border-gray-700 text-blue-600"
            />
            <span className="text-xs text-gray-400">Animate Scale</span>
          </label>
        </div>
      </div>
    </div>
  )
}
