import React, { useState, useEffect } from 'react'
import Banner from './Banner'
import Movies from './Movies';
import axios from 'axios';


// Two Kinds of Pagination
// Client-side pagination - Load all data and chunk in based on page on client side
// Server-side pagination  - Client doesn't handle pagination, it simply calls server with the page variable

const LOCALSTORAGE_KEY = "movies"

const MOVIE_API_ENDPOINT = (page) => `https://api.themoviedb.org/3/trending/movie/week?api_key=df48702248a626119c66f71fb632512d&language=en-US&page=${page}`

export default function Home({ watchList, setWatchList }) {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1)
	// const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "[]"))

	useEffect(() => {
		axios.get(MOVIE_API_ENDPOINT(page))
			.then((res) => {
				const results = res.data.results

				if (results) {
					setMovies(results)
				}
			})
	}, [ page ])




	return (
		<div className='flex flex-col gap-10'>
			<Banner name={movies[0]?.title} url={movies[0]?.backdrop_path} />
			<Movies watchList={watchList} setWatchList={setWatchList} movies={movies} />

			{/* Homework: Make it a separate Pagination Component */}
			<div className='flex justify-center align-middle gap-2'>
				<button onClick={() => setPage(page > 1 ? page - 1: 1)} className='p-3 border border-gray-600'>Prev Page</button>
				<p>Page No: {page}</p>
				<button onClick={() => setPage(page + 1)}
				className='p-3 border border-gray-600'>Next Page</button>
			</div>
		</div>
	)
}

export {
	LOCALSTORAGE_KEY
}

