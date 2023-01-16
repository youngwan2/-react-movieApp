import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { ChangeEvent } from 'react';
import { baseSet } from '../../slice/movieSlice';
import { API_KEY } from '../../slice/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sortbySearchData } from '../../slice/sortbySearchSlice';
import { pageInfoCommunicator } from '../../slice/pageInfoSlice';

const SortbyDate = () => {

    const dispatch = useDispatch();

    const [rangeVal, setRangeVal] = useState('');
    const userRangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRangeVal(e.currentTarget.value);
        dispatch(pageInfoCommunicator(1))

    }

    const pageNum = useSelector((state: any) => { return state.pageInfo })
    const sortByYearGetMovie = useCallback((year: string, pageNum: number) => {
        baseSet.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageNum}&year=${year}&with_watch_monetization_types=flatrate`)
            .then((response) => { dispatch(sortbySearchData(response.data)) })
            .catch((error) => { console.log(error) })
    }, [dispatch])


    useEffect(() => {
        sortByYearGetMovie(rangeVal, pageNum);
    }, [rangeVal, pageNum, sortByYearGetMovie])

    return (
        <div className='sortbyDate'>
            <label
                className='range_input_label'
                htmlFor='sortDate_range_input'>
                Filter
            </label>
            <input
                id='sortbyDate_range_input'
                type={"range"}
                min="2000"
                max={"2050"}
                step={"1"}
                onChange={userRangeInput}>
            </input>
            <div className='sortbyDate_rangeVal'>{rangeVal}</div>


        </div>
    );
};

export default SortbyDate;