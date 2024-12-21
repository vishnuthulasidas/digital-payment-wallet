import React from 'react'
import DiamondIcon from "../../assets/diamond-symbol.svg"
import LockIcon from "../../assets/lock-symbol.svg"
import TelescopeIcon from "../../assets/telescope-symbol.svg"
const SymbolCard = ({type,title,content}) => {
const img={
    "diamond":DiamondIcon,
    "lock":LockIcon, 
    "telescope":TelescopeIcon
}
  return (
    <div className={`text-xl font-normal flex gap-10 items-center w-[500px] ${type==="telescope"?"col-span-2 justify-self-center":""}`}>
      <img src={img[type]} alt="card-symbol" />
      <div>
        <div className="font-semibold text-2xl">{title}</div>
        <div>{content}</div>
      </div>
    </div>
  )
}

export default SymbolCard
