import React from 'react'
import "./footersStyle.css";


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

        </div >
    )
}

