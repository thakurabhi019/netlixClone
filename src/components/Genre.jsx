import React from 'react';
import { Link } from 'react-router-dom';
function Genre(props) {
    const {genreList, platform} = props;
    return (
        <div className='d-flexd gap-2'>
            {
                genreList?.map((genre)=>{
                    return(
                        <Link key={genre.id} to={`/browsebygenre/${platform}/${genre.id}`} class="badge text-bg-warning me-2">{genre?.name}</Link>
                    )
                })
            }
            
        </div>
    );
}

export default Genre;