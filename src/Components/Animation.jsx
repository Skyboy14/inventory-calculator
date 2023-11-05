import React from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from './../Assets/Json/90901-furniture-animation.json'

export default function Animation() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: '100%', height: '80%' }}
    />
  )
}