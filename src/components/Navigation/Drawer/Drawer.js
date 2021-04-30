import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/BackDrop/Backdrop'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-create', label: 'Создать тест', exact: false },
]

class Drawer extends Component {
  clickHandeler = () => {
    this.props.onClose()
  }

  renderLInks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandeler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLInks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    )
  }
}

export default Drawer
