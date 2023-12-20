import { useSelector } from 'react-redux';
import { selectVideoDetails } from '../features/common/commonSlice';
import VideoPlayer from './VideoPlayer';
import Ratings from './Ratings';
import getYear from '../utility/getYear';
import { useState } from 'react';
import formatRuntime from '../utility/convertime';


function Details(props) {

    const video = useSelector(selectVideoDetails);
    const{ data, error, status } = video;
 

    return (
        <div className="modal" tabIndex="-1" id='details-modal'> 
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-bottom-0" data-bs-theme="dark">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <VideoPlayer videoList={data?.videos?.results} isDetailsView={false} />
                <br />
                <br />
                <div className="container-fluid py-3">
                    <div className="row">

                        <div className="col-md-8">

                            <h1 className='title display-2'>{data?.name || data?.original_name || data?.title || data?.original_title} ({ getYear(data?.release_date || data?.first_air_date)}) </h1>

                            <h3 className='tagline fs-5 text-warning'>{data?.tagline}</h3>
                        
                            <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count} />
                            <p>{data?.overview}</p>

                            <p>Run Time : {formatRuntime(data?.runtime)}</p>

                            <p>Revenue : {data?.revenue}</p>

                            <p className='color'>Spoken Languages : {
                            data?.spoken_languages.map((language) => (
                                <span key={language?.id}>{language?.name}</span>
                            ))
                            }</p>
                        <p className='color'>Production Countries : {
                            data?.production_countries.map((countries) => (
                                <span key={countries?.id}>{countries?.name}</span>
                            ))
                            }</p>

                        </div>
                            <div className="col-md-4">
                                <p className='color'>Production Compaines : {
                                    data?.production_companies.map((company) => (
                                        <span key={company?.id}>{company?.name}</span>
                                    ))
                                    }
                                    </p>
                                    <p></p>

                            </div>
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Details;