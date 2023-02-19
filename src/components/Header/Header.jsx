import React from 'react'
import s from './Header.module.scss'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const onLeave = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className={s.mainHead}>
        <div className={s.leftHead}>
            <Link to={'/'} className={s.links}><p>Мои курсы</p></Link>
        </div>
        <div className={s.rightHead}>
            <img src="account-icon.svg" alt="" height={35}/>
            <p>Мой аккаунт</p>
            <p onClick={onLeave} className={s.leave}>Выйти</p>
        </div>
    </div>
  )
}

export default Header;
