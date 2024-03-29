import React from 'react'
import Banner from './Banner'
import Navigation from './Navigation'

const Header = () => {
  return (
    <header className="header">
      <Navigation />
      <Banner />
    </header>
  )
}

export default Header
