import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='copy_text'>
            <p>© Academlo 2022</p> 
            </div>
             
            <div className="social_media">
            <a href="https://www.instagram.com/academlohq/">

             <i className="fa-brands fa-instagram"></i>
                   </a>
             <a href="https://www.linkedin.com/company/academlo/" >

              <i className="fa-brands fa-linkedin-in"></i>    

             </a>
               <a href="https://www.youtube.com/c/academlo" >

               <i className="fa-brands fa-youtube"></i>
                  </a>

            </div>
        </footer>
       
         

        
    );
};

export default Footer;