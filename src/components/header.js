import React from "react";

import GithubIcon from "./icons/github";
import CogIcon from "./icons/cog";

import styles from "./header.module.scss"

const Header = () => {

  return(
    <header className={ styles.header }>
      <div className="logo">Standuptimer</div>

      <div>
        <a className={styles.icon} href="/settings">
          <CogIcon color="#fff" />
        </a>

        <a className={styles.icon} href="https://github.com/cs-ferguson/standuptimer" target="_blank">
          <GithubIcon color="#fff" />
        </a>
      </div>

    </header>
  )
}

export default Header
