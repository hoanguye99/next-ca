import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface RangeSliderProps{

}

const RangeSlider = (props: RangeSliderProps) => {
  const [value, setValue] = useState(84)
  return (
    <Slider
      min={0}
      max={100}
      defaultValue={84}
      step={2}
      value={value}
      // onChange={(nextValue) => setValue(nextValue as number)}
      // className="cursor-pointer select-none"
      railStyle={{
        height: 4,
        backgroundColor: '#d2ddec',
        borderRadius: 5
      }}
      trackStyle={{
        height: 4,
        backgroundColor: '#2c7be5',
      }}
      handleStyle={{
        borderColor: '#2c7be5',
        boxShadow: 'none',
        opacity: '0'
      }}
    />
  )
}

export default RangeSlider