import React from 'react'
import { Navbar, NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppActions } from 'hooks/useStore'
import BasketIcon from './BasketIcon/BasketIcon'
import Search from './Search/Search'
import Profile from 'components/Header/Profile/Profile'
import style from './Header.module.scss'

const Header = () => {
  const navigate = useNavigate()
  const { changeShowMenu } = useAppActions()
  return (
    <header className={style.header}>
      <Navbar fixed={'top'} bg="light" variant="light"
              className={style.navbar}>
        <div className={style.hideLogo}>
          <div className={'pr-4'}>
          <NavLink
            onClick={() => changeShowMenu()}
            className={style.toggleMenu}
          >
            <i className="bi bi-list text-4xl"/>
          </NavLink>
          </div>
        <div
          className={'hover:opacity-80'}
          onClick={() => { navigate('/') }}
        >
            <i className="bi bi-shop text-4xl"/>
        </div>
        </div>

          <Search />
          <div className={'flex'}>
            <BasketIcon />
            <Profile />
          </div>
      </Navbar>
    </header>
  )
}

export default Header
