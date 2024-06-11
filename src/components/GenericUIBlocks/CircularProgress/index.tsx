import React, { useState, useEffect } from 'react'

// styles
import './styles.scss'

const CircularProgress = () => {
   const [loader, setloader] = useState(true);

   useEffect(() => {
     setTimeout(() => {
        setloader(false)
     }, 3000);

   }, [])
   
  return <div className={`${true ? 'basic-progress' : 'hide-loader'}`}></div>;
}

export default CircularProgress