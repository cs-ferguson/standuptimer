import React from "react";

import GithubIcon from "./icons/github"

import styles from "./header.module.scss"

const Header = () => {

  return(
    <header className={ styles.header }>
      <div className="logo">Standuptimer</div>

      <a className={styles.icon} href="https://github.com/cs-ferguson/standuptimer" target="_blank">
        <GithubIcon color="#fff" />
      </a>

    </header>
  )
}

export default Header
