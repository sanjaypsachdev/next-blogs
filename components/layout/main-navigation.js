import React from 'react'
import Link from 'next/link'

import Logo from './logo'

import classes from './main-navigation.module.css'

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <ul>
        <li>
          <Link href="/posts">Posts</Link>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  )
}

export default MainNavigation
