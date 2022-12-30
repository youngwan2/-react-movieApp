import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const TopShift = () => {
    return (
        <div 
        onClick={()=>{window.scrollTo({top:0, behavior:'smooth'})}}
        className='top_move'>{<FontAwesomeIcon icon ={faArrowUp}></FontAwesomeIcon>}</div>
    );
};

export default TopShift;