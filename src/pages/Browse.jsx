import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectNetflixOriginals } from '../features/tv/tvSlice';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import { requests } from '../utility/apirequests';
import axios from '../utility/axios';
import Row from '../components/Row';
import shuffleArray from '../utility/shuffleArray';

function Browse(props) {
    const param = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nowPlayingMovies = useSelector(selectNowPlayingMovies);
    const collection = useSelector(param.platform === 'tv' ? selectNetflixOriginals : selectNowPlayingMovies);
    const {data, error, status} = collection;

    const [genreList, setGenreList] = useState(null);

    //navbar tv or movie
    useEffect(() => {
        if(param.platform ==='tv'){
            dispatch(fetchNetflixOriginals());
        }else if(param.platform ==='movie'){
            dispatch(fetchNowPlayingMovies());
        }else{
            navigate('/browse/tv')
        }
    },[param])

    const random = Math.floor(Math.random()* data?.results.length);

    //Genre list 
    const fetchGenreList = async (type) => {
        const response = await axios.get(requests.getGenreList(type))
        setGenreList(response.data?.genres);
    }

    useEffect(() => {
        if(param){
            fetchGenreList(param.platform);
        }
    },[param])

    //// Shuffle and take the first six elements

    const shuffledGenreList = shuffleArray(genreList || []).slice(0, 6); 


    return (
       <>
       {
         <Header video={data?.results[random]} platform={param.platform} />
       }
       <br />
       <div className="container-fluid">

        {
         shuffledGenreList.map((genre) =>(
                <Row title={genre.name} isGenre={true} platform={param.platform} genreId={genre.id}/>
            )) 
        }

       </div>
       </>
    );
}

export default Browse;