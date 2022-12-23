import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//타입지정
interface GenreType{
    id:number
    name:string
}

//컴포넌트
const MoviesCard = () => {

const navigate = useNavigate();
const searchDate = useSelector((state:any)=>{return state.sortbySearch.data.results});



const genre = useSelector((state:any)=>{
    if(state.movies.data ===''){
        return null
    } else{
        return state.movies.data.genreInfo.genres
    }
});


    return (
        <div className='movies_card'>

            { searchDate?
            searchDate.map((data:any,i:number)=>{
                return (
                    <div 
                    key={i}
                    className='movies_card_img'
                    style={{
                        //이미지 빈 배경일 시 대체 이미지 처리해야 함.
                        backgroundPosition:"center",
                        backgroundSize:"cover",
                        backgroundImage:
                        "url("+`https://image.tmdb.org/t/p/w500${data.poster_path}`+")"
                        }}
                    onClick={()=>{
                        navigate(`/detail/${data.id}`)
                    }}>                         
                        
                        <div className='movies_card_content'>
                            <h3 className='movies_card_title'>{data.title}</h3>
                            {genre &&
                            data.genre_ids.map((ids:number,i:number)=>{
                                return (
                                    <span
                                        className='movies_card_genre' 
                                        key={i}>{genre.find((genreEl:GenreType)=> genreEl.id === ids).name}</span>
                                )
                            
                                })
                            }
                         
                            <div>{data.release_date}</div>
                            <div>{data.adult === false? "청소년 가능":"성인이상"}</div>
                            <div>{data.vote_average+"점("+data.vote_count+"명)"}</div>
                        </div>
                </div>
    
                )
            }):null}
        </div>
    );
};

export default MoviesCard;