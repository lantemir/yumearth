import { Component } from "react";
import { Menudata } from "./menuData";
import "./navbarStyle.css";


class Navbar1 extends Component {
  state = {clicked:false};

  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    return (
      <div className="NavbarBackground">
      <nav className="NavbarItems">
        <h1 className="logo">
        YUMEARTH 
        </h1>
        <div className="menu-icons" onClick={this.handleClick}>
            <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {Menudata.map((item, index) => {
            return(
              <li key={index}><a  href={item.url} className={item.cName}><i className={item.icon}></i>{item.title}</a></li>
            )
          })}
          
        </ul>
      </nav>
      </div>
    )
  }
}

export default Navbar1












// import React from 'react'

// export function Navbar1() {
//     return (
//         <nav className="navbar navbar-expand-lg bg-light">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">Navbar</a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//           <div className="navbar-nav">
//             <a className="nav-link active" aria-current="page" href="#">Home</a>
//             <a className="nav-link" href="#">Features</a>
//             <a className="nav-link" href="#">Pricing</a>
//             <a class="nav-link disabled">Disabled</a>
//           </div>
//         </div>
//       </div>
//     </nav>
        
//     )
// }

