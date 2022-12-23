import React from 'react';

const TopShift = () => {
    return (
        <div 
        onClick={()=>{window.scrollTo({top:0, behavior:'smooth'})}}
        className='top_move'>▲</div>
    );
};

export default TopShift;