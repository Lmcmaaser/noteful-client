import React from 'react'
import './CircleButton.css'

export default function NavCircleButton(props) {
  /* ... is a spread operator. spreads over the object and get all its properties. 
  then overwrite the existing properties with the ones we're passing.*/
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
