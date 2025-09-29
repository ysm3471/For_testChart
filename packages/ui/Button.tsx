import React from 'react' 

interface props {
  num:number
  handleClick:() => void
  selected:number
}

export default function Button({selected,num,handleClick}:props) {
  return (
    <button className={selected === num ? `button selected` : `button`} onClick={handleClick}>  
      {num}
    </button> 
  )
}
