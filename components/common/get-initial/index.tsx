import React from 'react'

interface InitialImageProps {
  name: string
  className?: string
}

const InitialImage = (props: InitialImageProps) => {
  const backgroundColor = stringToRGB(props.name)
  const text = props.name.toString().substring(0, 1).toUpperCase()
  return (
    <div
      style={{ backgroundColor: `#${backgroundColor}` }}
      className={`relative w-8 h-8 rounded-full ${props.className}`}
    >
      <span className="absolute inset-0 text-white text-sm flex justify-center items-center">
        {text}
      </span>
    </div>
  )
}

export default InitialImage

const stringToRGB = (str: string) => {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.toUpperCase().charCodeAt(i) + ((hash << 5) - hash)
  }
  var color = ''
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    color += ('8' + value.toString(16)).substring(-2)
  }

  return color.substring(0, 6)
}
