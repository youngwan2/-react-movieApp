import React, {useState}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { API_KEY,baseSet } from '../slice/movieSlice';
import { useNavigate } from 'react-router-dom';
import { sortbySearchData } from '../slice/sortbySearchSlice';
import { useDispatch } from 'react-redux';


const Search = () => {

const dispatch = useDispatch();
const [inputState, setInputState] = useState(true);
const [inputVal, setInputVal] = useState('');
const navigate = useNavigate()

// 검색된 영화를 가져오는 API
const getSearchMovieDate = (inputVal:string) =>{
    return ( 
        baseSet.get(`/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputVal}`)
            .then((response)=>{dispatch(sortbySearchData(response.data))})
            .catch((error)=>{console.log("검색실패:",error)})
    )
}


    return (
        <section className='search_section'>
            <div className='search_icon'> 
               <FontAwesomeIcon icon={faMagnifyingGlass}
                onClick={()=>{
                  setInputState((result)=>{return result =!inputState})
               }}/>
               
           </div>
            {inputState === true
                ? <div className='input_container'>
                    <input  
                        className='user_input' 
                        type={"text"} 
                        name="user_input"
                        onChange={(event)=>{
                            setInputVal(event.target.value)
                        }}>
                    </input>
                    <div 
                        className='search_btn'
                        onClick={()=>{
                                if(inputVal !==''){
                                getSearchMovieDate(inputVal)
                                navigate('/movies')} 
                       
                            
                        }}>검색
                    </div>
                </div>
                : null}      
        </section>
    );
};

export default Search;