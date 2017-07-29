import React, { Component, PropTypes } from 'react'

import styles from './ThreadsList.css'

const ThreadsList = ({ children }) =>(
  <div className={styles.root}>
    { children }
  </div>
)

ThreadsList.propTypes = {
  children: PropTypes.node,
}

export default ThreadsList