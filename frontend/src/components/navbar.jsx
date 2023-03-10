import React, { useState, useEffect } from 'react'
import { Menudata } from "./menuData";
import "./navbarStyle.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const Navbar1 = ()=>  {
  // state = {clicked:false};


  const [clicked, setclicked] = useState(false);

  const store = useSelector(state => state.GetAuthStore)
  


  const handleClick = () => {
    // this.setState({clicked: !this.state.clicked})

    setclicked(!clicked)
  }

  // const navbar = () => {
  //   console.log(store)
  // }

  
    return (
      <div className="NavbarBackground">
      <nav className="NavbarItems">
        <h1 className="logo">
        YUMEARTH 
        </h1>
        <div className="menu-icons" onClick={handleClick}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {Menudata.map((item, index) => {
            return(
              <li key={index}><Link  to={item.url} className={item.cName}><i className={item.icon}></i>{item.title}</Link></li>
            )
          })}

          { store.isAuth ? <li><a  href="/cabinet" className="nav-links-mobile"><i className="fa-regular fa-user"></i>Личный кабинет</a></li>
          : <li><Link  to="/login" className="nav-links-mobile"><i className="fa-regular fa-user"></i>Войти</Link></li>}

          {/* <li><a  href="/cabinet" className="nav-links-mobile"><i className="fa-regular fa-user"></i>Личный кабинет</a></li> */}

          {/* <button onClick={navbar}>navbar</button> */}

          


          
        </ul>
      </nav>
      </div>
    )
  
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

