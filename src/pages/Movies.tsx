import React from 'react';
import MoviesSide from '../components/sideTap';
import MoviesCard from '../components/MoviesCard';
import TopShift from '../components/topShift';
import Pagination from '../components/pagination';
import { useEffect,useState } from 'react';

const Movies = () => {



const [display, setDisplay] = useState(true)





    useEffect(()=>{
        setTimeout(()=>{
            setDisplay(false)
        },6000)
    },[])
    return (
        <div className='movies'> 
            {display === true? 
            <div className='movies_disappear_box'>
                <div className="box_content"> 방문해주셔서 감사합니다. 오늘도 좋은 하루 되세요.</div>
            </div>:null}

            <div className='movies_container'>
                <MoviesSide/>
                <MoviesCard/>
                <TopShift/>
                <Pagination/>
                
            </div>
        </div>
    );
};

export default Movies;