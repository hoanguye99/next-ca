
import Image from 'next/future/image'
import React from 'react'

interface InitialImageProps {
  name: string
}

const InitialImage = (props: InitialImageProps) => {
  return (
    <Image src={stringToLinkImg(props.name)} width="32" height="32" className="rounded-full" alt="" />
  )
}

export default InitialImage

const stringToRGB = (str : string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = str.toUpperCase().charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const stringToLinkImg = (str: string) => {
  var backgroundColor = stringToRGB(str);
  var text = str.toString().substring(0, 1).toUpperCase()
  var url = `https://via.placeholder.com/300/${backgroundColor}/fff.jpg?text=${text}`;
  return url;
}