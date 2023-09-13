import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies,  setMovies] = useState([]);
    const [trailerUrl,  setTrailerUrl] = useState("");

    useEffect( () => {
        async function getData(){
            const data = await axios.get(fetchUrl);
            // console.log(data.data.results);
            setMovies(data.data.results);
            return data;
        } 
        getData();
    },[fetchUrl]);
    const opts = { 
        height:"390",
        width:"100%",
        playerVars: {
            autoPlay: 1
        },
    };
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'));
            }).catch((error)=> console.log(error))
        }
    }
    return (
    <div className='row'>

        <h2>{title}</h2>
        <div className='row__posters'>
            {movies.map((movie) => (
                <img key={movie.id} 
                 src ={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                 onClick={ () => handleClick(movie)}
                 alt={movie.name} 
                 className={`row__poster ${isLargeRow && "row__posterLarge"}`}/>
            ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>
}    </div>
  )
}

export default Row