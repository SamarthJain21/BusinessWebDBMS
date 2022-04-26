import React , { Component } from 'react'
import Login from './Login'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
      }

  render() {
    if (!localStorage.getItem("userGST")) return <Login />;

    return (
      <div>
         Home

      </div>
    )
  }
}
