import React from 'react'

const index = ({className,btnname,icon,onClick}) => {
  return (
    <button  onClick={onClick} className={`${className}`}>
      {btnname}{icon}
    </button>
  )
}

export default index
