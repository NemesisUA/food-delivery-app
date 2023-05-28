import React from 'react'
import './Button.css'

const Button = ({onClick, children, className = 'styled-btn', 
type, disabled = false}) => {
  return (
    <button 
      className={className}
      onClick={onClick} 
      type={type} 
      disabled={disabled} 
    >
      {children}
    </button>
  )
}

export default Button