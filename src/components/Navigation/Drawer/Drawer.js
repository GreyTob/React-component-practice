import React, {Component} from "react"
import classes from "./Drawer.module.css"

const links = [
  1, 2, 3
]

class Drawer extends Component {
  renderLInks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href="#">LInk {link}</a>
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
      <nav className={cls.join(' ')}>
        <ul>
          { this.renderLInks() }
        </ul>

      </nav>

    )
  }
}

export default Drawer
