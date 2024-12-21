import React from 'react'

const Button = ({text,clickHandler=()=>{}}) => {
  return (
    <button 
    className='bg-secondary text-white px-10 py-2 rounded-md hover:bg-primary transition-all duration-300'
    onClick={clickHandler}
    >{text}</button>
  )
}

export default Button
