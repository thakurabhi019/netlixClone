import React, { useEffect, useState } from 'react';
import HomeScreen from '../pages/HomeScreen';

function VideoPlayer(props) {
    const { videoList, closeVideo, isHeader,isDetailsView } = props;
    const [key, setKey] = useState(null);

    useEffect(() => {
        if(videoList){
            const filter = videoList.find((item)=>{
                return item.type === 'Trailer'
            })
        setKey(filter);
        }
    },[videoList]);
  
    const oncloseVideo = () =>{
        setKey(null);
        if(oncloseVideo){
            oncloseVideo();
        }
    };

    if(!oncloseVideo){
        return <HomeScreen />;
    }
    return (
        
        <>
        {
        <div> 
        <div className={`ratio ratio-16x9 youtube-player ${isHeader ? 'vh-100':''}`}>
       <iframe width="560" height="315" src={`https://www.youtube.com/embed/${key?.key}?si=Svr4ZK6O8pB9YwsI&autoplay=1&mute=1`} title={`${key?.name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div> 
      {isDetailsView && (
              <button className='btn btn-warning cancel-btn ms-auto' onClick={closeVideo}>Cancel</button>

      )}
      </div>
        } 
      </>
    );
        
}

export default VideoPlayer;