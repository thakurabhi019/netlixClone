import React, { useEffect, useState } from 'react';
import { requests } from '../utility/apirequests';
import { useSelector } from 'react-redux';
import { selectSearchString } from '../features/common/commonSlice';
import axios from '../utility/axios';
import Card from '../components/Card';

function Search(props) {
    const query = useSelector(selectSearchString);
    const [searchData, setSearchData] = useState(null);

    const fetchSearchVideo = async (type, query) => {
        const response = await axios.get(requests.getSearch(type, query));
        setSearchData(response.data.results);
    }

    useEffect(() => {
        if (query !== "") {
            fetchSearchVideo("movie", query);
        }
    }, [query])

    return (
        <div className='container-fluid py-5'>
            <div className='row g-3'>
                {
                    searchData?.map((video) => (
                        <div className='col-md-3'>
                            <Card video={video} platform="movie" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Search;