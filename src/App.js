import React from "react"
import Layout from "./hoc/Layout/Layout"

class App extends React.Component {
  render() {
    return (
      <Layout>


        <div style={{width: 400, border: '1px solid black'}}>
          <h1>Layout works</h1>
        </div>
      </Layout>
    )
  }
}

export default App;