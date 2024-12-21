import FullLogo from '../Logo/FullLogo'
import Button from '../Button/Button'
import FloatingMenu from '../MenuBar/FloatingMenu'
import downArrow from '../../assets/downArrow.png'
import upArrow from '../../assets/upArrow.png'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className='font-aleo shadow-sm sticky top-0 z-50 py-5 px-32 bg-white w-full flex items-center justify-between'>
      <a href="#"><FullLogo/></a>
      <div>
        <ul className='text-xl font-semibold flex items-center justify-between gap-6'>
          <li className={`flex items-center gap-2 cursor-pointer hover:text-secondary ${showMenu && "text-secondary"}`} onClick={()=>setShowMenu(!showMenu)}>Products <img src={showMenu?upArrow:downArrow} alt="" /></li>
          <li className='hover:text-secondary'><a href="#why-us">Why Us?</a></li>
          <li className="hover:text-secondary"><a href="#help">Help</a></li>
          <li className='ml-5'>
            <Button text='Sign In' clickHandler={()=>navigate("/auth")} />
            </li>
        </ul>
        <FloatingMenu visibility={showMenu}/>
      </div>
    </div>
  )
}

export default LandingNavbar
