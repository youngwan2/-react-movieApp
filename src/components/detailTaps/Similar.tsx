import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseSet } from '../../slice/movieSlice';
import { API_KEY } from '../../slice/movieSlice';
import {useState,useEffect,useCallback} from 'react'


// interface SimilarType{
//     id:number
// :React.FC<SimilarType> 
// }


interface similarType{
    apiData:any
}

const Similar:React.FC<similarType>= ({apiData}) => {
    console.log(apiData)
    const navigate = useNavigate();
    const [genreData,setGenreData] = useState<any[]>([])

    const genreDataApi = async() =>{
    await baseSet.get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
          .then((res)=> {return setGenreData(res.data.genres)} )
          .catch((error)=>{console.log("similar:",error)})
    }




    useEffect(()=>{
        genreDataApi()
    },[])


    return (
        <div className='similar'>
            {apiData.results !==undefined ?

            apiData.results.map((movieList:any,i:number)=>{
                return (
                
                    <div
                        onClick={()=>{
                            navigate(`/detail/${movieList.id}`)
                            window.scrollTo(0,0)

                        }}
                        className='similar_card'
                        key={i}
                        style={{
                            backgroundColor :"white",
                            width :"200px",
                            height : "200px",
                            backgroundSize:"cover",
                            backgroundPosition:"center",
                            backgroundImage :"url("+`https://image.tmdb.org/t/p/w500${movieList.poster_path}`+")",
                    
                   
                   
                   }}>
                    
                    <div className='similar_content'>
                        <h2  className='similar_title'>{movieList.title}</h2>

                        {genreData !==undefined?
                         <div className='similar_genre'>{movieList.genre_ids.map((ids:number,i:number)=>{
                            return (
                                <span key={i} className='similar_genre_info'>{genreData.find((data)=>{return data.id === ids }).name}</span>)
                            })}
                        </div>:null      
                       }
                       
                        <div className='similar_date'>{movieList.release_date}</div>
                        <div className='similar_age'>{movieList.adult === false? '청소년가능':'성인이상'}</div>
                        <div className='similar_grade'>
                            <span>{movieList.vote_average}점</span>
                            <span>({movieList.vote_count}명)</span>
                        </div>
                    </div>
                
                
                </div>

                )
            }):null
          
      
            }
            </div>
    );
};

export default Similar;









