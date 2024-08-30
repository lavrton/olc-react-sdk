import React from 'react'

// styles
import './styles.scss'

const TextArea = (props:any) => {
    const { label,value, placeholder } = props;
  return (
    <div className='text-area-layout'>
      <label className="basic-label">{label ? label : ''}</label>
    <textarea className='basic-text-area' 
    value={value} 
    placeholder={placeholder} />
    </div>
  )
}

export default TextArea