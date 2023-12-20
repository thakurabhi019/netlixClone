const API_KEY = '12746975f4f8166ff66c4183951667b7';

export const requests = {
    getNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    getCollection: (platform, endpoint) => `${platform}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
    getDetails:(requestValues)=>`${requestValues.platform}/${requestValues.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
    getGenreList:(platform)=>`genre/${platform}/list?api_key=${API_KEY}`,
    getByGenre:(platform, genreId, page) => `/discover/${platform}?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=1`,
    getSearch:(platform, querystring) => `/search/${platform}?api_key=${API_KEY}&query=${querystring}&language=en-US&page=1`


}

export const platformType ={
    tv:"tv",
    movie:"movie"
}
export const endpoint ={
    popular:"popular",
    topRated:"top_rated",
    airingToday:"airing_today",
    onTheAir:"on_the_air",
    upcoming:"upcoming",
    nowPlaying:"now_playing"
}
