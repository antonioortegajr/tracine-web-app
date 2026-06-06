"use client";

type OpacitySliderProps = {
  opacity: number;
  onChange: (value: number) => void;
};

export default function OpacitySlider({ opacity, onChange }: OpacitySliderProps) {
  return (
    <div className="fixed bottom-24 left-0 right-0 px-6 pb-safe-or-4 z-20">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={opacity}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className="w-full h-2 appearance-none bg-white/40 rounded-full cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-[44px]
          [&::-webkit-slider-thumb]:h-[44px]
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-[44px]
          [&::-moz-range-thumb]:h-[44px]
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:border-0"
      />
    </div>
  );
}
