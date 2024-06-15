import React from 'react'
import Movie from './Movie'
import { LOCALSTORAGE_KEY } from './Home'

function Movies({ movies, watchList, setWatchList }) {

  const addToWatchList = (movie) => {
    const updatedWatchList = [ ...watchList, movie ]
		setWatchList(updatedWatchList)
    localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(updatedWatchList))
	}

	const removeFromWatchList = (movie) => {
		const filteredWatchList = watchList.filter((item) => {
			return item.id !== movie.id
		})
		setWatchList(filteredWatchList)
    localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(filteredWatchList))
	}

  return (
    <div className='flex justify-evenly flex-wrap gap-8 '>
      {movies.map((moviesObj) => {
        const isMoviePresentInWatchList = watchList.find((item) => {
          return item.id === moviesObj.id
        })

        return (
          <Movie isMoviePresentInWatchList={isMoviePresentInWatchList} removeFromWatchList={removeFromWatchList} addToWatchList={addToWatchList} key={moviesObj.title} movie={moviesObj} />
        )
      })}
    </div>
  )
}

export default Movies