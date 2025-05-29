'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';

export default function MovieList() {
    const [movies, setMovies] =  useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();        
    }, [])
    const getMovies = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '49852805aad51814e1156b127f88c40f',
                language: 'pt-br',
            }
        }).then(response => {
            setMovies(response.data.results)
        });

        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (        
        <ul className="movie-list">
            {movies.map((movie) =>
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    );
}
