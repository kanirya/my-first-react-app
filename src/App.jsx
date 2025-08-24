import React, { useState, useEffect } from 'react'
import Search from "./components/Search.jsx";
import Loader from "./utils/utils.jsx";
import MovieCard from "./components/MovieCard.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY_AUTH = import.meta.env.VITE_TMDB_KEY_ACCESS;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY_AUTH}`
    }
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchMovies = async () => {
        try {
            setIsLoading(true);
            setErrorMessage('');
            const response = await fetch(
                `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`,
                API_OPTIONS
            );

            if (!response.ok) {
                throw new Error(`Failed fetching movies: ${response.status}`);
            }

            const data = await response.json();
            if(data.Response=='False'){
                setErrorMessage(data.Error||"Failed to fatch movies");
                setMovieList([]);
                return;
            }
            setMovieList(data.results||[]);
            console.log(data); // ✅ You should now see movie results
        } catch (err) {
            console.error(err);
            setErrorMessage("Error fetching movies!");
        }finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? (
                        <>
                            <Loader />
                        </>

                    ):errorMessage?(
                        <p className="text-red-500">{errorMessage}</p>
                    ):(
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>
            </div>
        </main>
    );
};

export default App;
