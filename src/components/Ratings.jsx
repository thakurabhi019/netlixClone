import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as starRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Ratings(props) {

    //destructure
    const {voteAverage, voteCount} = props;

    //star divide and vote 
    const average = voteAverage / 2; 
    const starArr =[...Array(5)];
    console.log(starArr)

    return (
        <div className='py-2 flex gap-2'>
            <div className="d-flex">
                {
                    starArr.map((item, index)=>{
                        return(
                            average > index + 1 ?
                            <FontAwesomeIcon className='text-warning' icon={faStar}/>
                            : 
                            <FontAwesomeIcon icon={starRegular}/>

                        )                       
                    })
                }

            </div>
            <p className='mb-0'>{voteCount}</p>
            
        </div>
    );
}

export default Ratings;