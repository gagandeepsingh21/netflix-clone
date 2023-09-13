import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css'
const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies,  setMovies] = useState([]);

    useEffect( () => {
        async function getData(){
            const data = await axios.get(fetchUrl);
            // console.log(data.data.results);
            setMovies(data.data.results);
            return data;
        } 
        getData();
    },[fetchUrl]);
    return (
    <div className='row'>

        <h2>{title}</h2>
        <div className='row__posters'>
            {movies.map((movie) => (
                <img key={movie.id} 
                 src ={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                 alt={movie.name} 
                 className={`row__poster ${isLargeRow && "row__posterLarge"}`}/>
            ))}
        </div>
        {/* container with posters */}
    </div>
  )
}

export default Row