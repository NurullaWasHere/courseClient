import React from 'react'
import s from './Header.module.scss'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className={s.mainHead}>
        <div className={s.leftHead}>
            <Link to={'/'} className={s.links}><p>Мои курсы</p></Link>
        </div>
        <div className={s.rightHead}>
            <img src="account-icon.svg" alt="" height={35}/>
            <p>Мой аккаунт</p>
            
        </div>
    </div>
  )
}

export default Header;
