import React from 'react';
import { baseSet } from '../../slice/movieSlice';
import { API_KEY } from '../../slice/movieSlice';
import { useEffect, useState,useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { sortbySearchData } from '../../slice/sortbySearchSlice';

type genreType = {
    id: number;
    name: string;
}


const SortbyGenre = () => {

    const dispatch = useDispatch();
    const [genre, setGenre] = useState<any>('')
 
    const [userChoiceGenre, setUserChoiceGenre] = useState('')
    const genreInfo = async () => {
        await baseSet.get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
            .then((response) => { return setGenre(response.data.genres) })
            .catch((result) => console.log(result))
    }

    useEffect(() => {
        genreInfo();
    }, [])

    const getMoiveSortByGenre = useCallback(async(selectGenre:string)=>{
        await baseSet
            .get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${selectGenre}&with_watch_monetization_types=flatrate`)
            // .then((response)=>{dispatch(sortbySearchData(response.data) console.log(response.data))})
            .then((res)=>console.log(res.data))
            .catch((error)=>{console.log("sortbyGenreError:",error)})

    },[])

    useEffect(()=>{
        getMoiveSortByGenre(userChoiceGenre)
    },[getMoiveSortByGenre,userChoiceGenre])

    return (
        <div className='sortbyGenre'>
            <h3
                className='sortbyGenre_title'>
                Genre
            </h3>
            {genre !== '' ?
                genre.map((el: genreType, i: number) => {
                    return (
                        <button
                            className='sortbyGenre_keyword'
                            key={i}
                            onClick={(e)=>{
                               setUserChoiceGenre(e.currentTarget.innerText.toLocaleLowerCase())
                            }}>{el.name}


                        </button>
                    )
                }) : <button>나옴</button>
            }

        </div>
    );
};

export default SortbyGenre;