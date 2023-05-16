import React from 'react'
import "./footersStyle.css";
import { Link } from 'react-router-dom';


export function Footer1() {
    return (
        <div>
            <footer>
                <div className="footer-content">
                    <h3>YumEarth</h3>
                    <p>yumearth — леденцы, сладости.</p>
                </div>
                <ul className="socials">
                
                
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                   
                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a ></li >
                    <li><a href="#"><i className="fab fa-youtube"></i></a ></li >
                 
                </ul >
                <div className="footer-bottom">
                  YumEarth <p>copyright &copy;2023  </p>
                </div>

                
                
                
            </footer >

            <nav class="bottom-menu">
                <ul>
                <li ><Link  to="/"><i className="fa-solid fa-house-user"></i><p>Главная</p></Link></li>
                <li ><Link  to="/sweets" ><i className="fa-solid fa-candy-cane"></i><p>Вся продукция</p></Link></li>
                
                <li ><Link  to="/basket" ><i className="fa-sharp fa-solid fa-basket-shopping"></i><p>Корзина</p></Link></li>
                </ul>
            </nav>

            

        </div >
    )
}

