import React, { useState } from 'react';
import { API_KEY } from '../slice/movieSlice';
import { baseSet } from '../slice/movieSlice';
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';


interface PlayerType {
    id: number
    children: string
}

const Player: React.FC<PlayerType> = ({ id }) => {
    const [previewMovie, setPreviewMovie] = useState();
    const [playerState, setPlayerState] = useState(false);
    const getPreviewMovie = () => {
        baseSet.get(`/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
               .then((res) => { return setPreviewMovie(res.data.results[0].key) })
    }


    return (
        <div className='Player'>
            <div
                className='play_btn'
                onClick={() => {
                    getPreviewMovie()
                    setPlayerState(playerState === true ? false : true)

                }}><FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
            </div>
            {playerState === true ?
                <div>
                <ReactPlayer
                    className="preview_videos"
                    controls
                    type="movie"
                    url={`http://www.youtube.com/watch?v=${previewMovie}`}>
                </ReactPlayer>
                </div> : null}

             {playerState === true?
                <div 
                    id='play_movie_layout'
                    onClick={()=>{
                        setPlayerState(false)
                    }}>
                </div> : null}
        </div>
    );
};

export default Player;