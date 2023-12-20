import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import Card from './Card';
import axios from '../utility/axios';
import { requests } from '../utility/apirequests';


function Row(props) {

    //disturctur from homescreeen and row.jsx
    const {title, action, selector, isPoster, platform, isGenre, genreId} = props;

    const collection = useSelector(!isGenre ? selector : () => { } );
    const dispatch = useDispatch();

    //genre data
    const[genreData, setGenreData] = useState(null);

    const fetchVideosByGenre = async (platform, id) =>{
        const response = await axios.get(requests.getByGenre(platform, id));
        setGenreData(response.data?.results);
    }

    useEffect(() => {
        if(!isGenre){
            dispatch(action());
        }else{
            fetchVideosByGenre(platform, genreId )
        }
    },[isGenre])

    return (
        <div className='text-white py-4'>
            <h3 className='mb-3'>{title}</h3>
          <Swiper
      spaceBetween={20}
      slidesPerView={5}
      modules={[Navigation]}
      navigation
    >
      {
        !isGenre ?
       collection.data?.results.map((movie) => {
            return(
                <SwiperSlide key={movie.id}>
                    <Card video={movie} isPoster={isPoster} platform={platform}/>
                </SwiperSlide>
            )
        }) : genreData?.map((movie) => {
            return(
                <SwiperSlide key={movie.id}>
                    <Card video={movie} isPoster={isPoster} platform={platform}/>
                </SwiperSlide>
            )
        })
       
      }
    </Swiper>
            
        </div>
    );
}

export default Row;