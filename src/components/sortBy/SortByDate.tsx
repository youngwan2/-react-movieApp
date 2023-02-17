import React from 'react';
import styles from './SortByDate.module.css'
import { useEffect, useState, useCallback } from 'react';
import { ChangeEvent } from 'react';
import { baseSet } from '../../slice/MovieSlice';
import { API_KEY } from '../../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { sortBySearchData } from '../../slice/SortBySearchSlice';


const SortByData = () => {

    const dispatch = useDispatch();

    const [rangeVal, setRangeVal] = useState('');
    console.log(rangeVal)
    const userRangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRangeVal(e.currentTarget.value);

    }

    const pageNum = useSelector((state: any) => { return state.pageInfo })
    const sortByYearGetMovie = useCallback((year: string, pageNum: number) => {
        baseSet.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageNum}&year=${year}&with_watch_monetization_types=flatrate`)
            .then((response) => { dispatch(sortBySearchData(response.data)) })
            .catch((error) => { console.log(error) })
    }, [dispatch])


    useEffect(() => {
        sortByYearGetMovie(rangeVal, pageNum);
    }, [rangeVal, pageNum, sortByYearGetMovie])

    return (
        <div className={styles.sortByDate}>
            <div className={styles.range_input_label_con}>
                <label
                    className={styles.range_input_label}
                    htmlFor='sortDate_range_input'>
                    Filter
                </label>
            </div>
            <input
                id={styles.sortByDate_range_input}
                type={"range"}
                min="2000"
                max={"2030"}
                step={"1"}
                onChange={userRangeInput}>
            </input>
            <div className={styles.sortByDate_rangeVal}>{rangeVal}</div>
        </div>
    );
};

export default SortByData;