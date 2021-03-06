import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'

import { FiUser } from 'react-icons/fi'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen((s) => !s)
  }

  return (
    <nav className="nav">
      <div className="nav__elements">
        <div className="container-fluid">
          <div className="row justify-space-between align-center">
            <NavLink to="/" className="nav__elements__logo">
              <Logo />
            </NavLink>
            <div className={`nav__elements__links  ${isOpen ? 'change' : ''}`}>
              <NavLink to="/login" className="nav__links__item">
                <FiUser /> Login
              </NavLink>
              {/* <NavLink to="/register" className="nav__links__item">
                Register
              </NavLink> */}
            </div>
            <div
              className={`nav__elements__box ${isOpen ? 'change' : ''}`}
              onClick={handleMenu}
            >
              <div
                className={`nav__elements__box-btn ${isOpen ? 'change' : ''}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
