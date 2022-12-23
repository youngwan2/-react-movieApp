import React from 'react';
import MoviesSide from '../components/sideTap';
import MoviesCard from '../components/MoviesCard';
import TopShift from '../components/topShift';

const Movies = () => {
    return (
        <div className='movies'> 
            <div className='movies_container'>
                <MoviesSide/>
                <MoviesCard/>
                <TopShift/>


            </div>
            
        </div>
    );
};

export default Movies;