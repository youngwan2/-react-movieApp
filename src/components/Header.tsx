import React from 'react';
import {Link} from 'react-router-dom'
import Search from './Search';
import { useNavigate } from 'react-router-dom';

// const element = <FontAwesomeIcon icon={faCoffee} />
const Header = () => {

const navigate = useNavigate();
    return (
        <header className='header'>
       
        <img
            className='header_logo' 
            onClick={()=>{
                navigate('/')
            }}
            width={90}
            height={45}
            src='/title2.png' alt='site_name'></img>
        <nav className='header_menu'>
           <Link className='link' to={'/'}>Home</Link>
           <Link className='link'to={'/movies'}>Movies</Link>
        </nav>
      
        <Search/>

     </header>
    );
};

export default Header;