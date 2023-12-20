import React, { useEffect, useState } from 'react';
import Ratings from './Ratings';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaderVideos, fetchVideoDetails, selectHeaderVideo } from '../features/common/commonSlice';
import getYear from '../utility/getYear';
import VideoPlayer from './VideoPlayer';
import Genre from './Genre';
import { truncateText } from '../utility';

function Header(props) {
    const {video,platform} = props;

    //commonSlice 
    const dispatch = useDispatch();

    //destructure from common slice 
    const {data, status, error } = useSelector(selectHeaderVideo);
    // trailer or homescreen
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        if (video) {
            dispatch(fetchHeaderVideos({platform: platform, id: video.id}));
    }
    }, [video]);

    const playTrailer =()=>{
        setIsPlay(true);
    }

    //More info 
    const showDetails = () =>{
        dispatch(fetchVideoDetails({platform: platform, id:video.id}))
    }


    //year
    const year= getYear(data?.first_air_date);

    // video close
    const oncloseVideo = () =>{
        setIsPlay(false);
    }
    
    return (
        <div className='postion-relative vh-100'>
         {
            !isPlay ?
            <>
            <img className='header-img' src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="" />

            <div className="caption">
            <h1 className='title display-2'>{data?.name || data?.original_name || data?.title || data?.original_title}</h1>

            <h3 className='tagline text-warning'>{data?.tagline}</h3>

            <h3> Year: {getYear(data?.first_air_date || data?.release_date)}</h3>
            
                <p className='fs-4'>{ truncateText (data?.overview, 120)}</p>

                <Genre genreList={data?.genres} platform={platform} />
                
                <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count} />

                <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#details-modal" onClick={showDetails}>More Info</button>

                <button className='btn btn-info' onClick={playTrailer}>Play</button>
            </div>
            </>
            :
            < VideoPlayer videoList={data?.videos?.results} closeVideo={oncloseVideo} isHeader={true} isDetailsView={true}  />
        }
            <div className="header-vignette"></div>
            <div className="header-vignette-bottom"></div>
            
        </div>

    );
}

export default Header;