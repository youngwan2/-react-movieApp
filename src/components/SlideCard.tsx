
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


interface SlideCardType {
    movieList: any

}


const SlideCard: React.FC<SlideCardType> = ({ movieList }) => {
    let navigate = useNavigate();

    const genre = useSelector((state: any) => state.movies.data.genreInfo.genres)
    // console.log("장르정보:",genre)
    // console.log("장르ID:",movieList.genre_ids)


    // console.log("카드:",popular)
    return (

        <div
            onClick={() => {
                console.log("클릭됨", movieList.id)
                navigate(`/detail/${movieList.id}`)
            }}
            className='slide_card'>
            <div style={{
                width: "360px",
                height: "200px",
                borderRadius: "15px",
                backgroundSize: "cover", backgroundPosition: "50% 50%",
                backgroundImage: "url(" + `https://image.tmdb.org/t/p/w500${movieList.poster_path}` + ")"

            }}>
                <div className='overlay'>
                    <h2>{movieList.title}</h2>
                    {movieList.genre_ids.map((ids: any, i: number) => {
                        return (
                            <span
                                className='genre'
                                key={i}> {genre.find((g: any) => g.id === ids).name}</span>
                        )
                    })
                    }


                    <p>{movieList.release_date}</p>
                    <p>{movieList.adult ? "성인" : "청소년가능"}</p>
                    <div>
                        <span>{movieList.vote_average}점(</span>
                        <span>{movieList.vote_count}명)</span>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default SlideCard;