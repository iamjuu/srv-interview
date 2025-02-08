import React from 'react'

const index = ({className,btnname,icon}) => {
  return (
    <button className={`${className}`}>
      {btnname}{icon}
    </button>
  )
}

export default index
