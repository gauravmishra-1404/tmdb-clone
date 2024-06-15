// 1. I need to sync data from my localStorage in a this.state.
// 2. Dynamically render the tbody

import { useState, useEffect } from 'react';
import { LOCALSTORAGE_KEY } from './Home';
import genreids, { getGenreString } from '../utils/utils';

function WatchList({ watchList, setWatchList }) {
  // const [watchList, setWatchList] = useState([])
  const [search, setSearch] = useState("")

  const [genreList, setGenreList] = useState(["All Genres", "Thriller", "Action"])
  const [curGenre, setCurGenre] = useState("All Genres")


  useEffect(() => {
    const genreStringList = watchList.map((item) => genreids[item.genre_ids[0]])

    const genreStringListSet = new Set(genreStringList)

    setGenreList(["All Genres", ...genreStringListSet])

    // console.log(genreStringList)
  }, [ watchList ])

  useEffect(() => {
    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
      setWatchList(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)))
    }
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleAscendingRating = () => {

    console.log("Called?")
    // Sort the current WatchList and store it in a new array
    const sortedArray = watchList.sort((a, b) => a.vote_average - b.vote_average)

    // Set the new state
    setWatchList([...sortedArray])
  }

  const handleDescendingRating = () => {
    // Sort the current WatchList and store it in a new array
    const sortedArray = watchList.sort((a, b) => b.vote_average - a.vote_average)

    // Set the new state
    setWatchList([...sortedArray])
  }

  const filteredWatchList = watchList.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase())).filter((movie) => curGenre === "All Genres" ? true : genreids[movie.genre_ids[0]] === curGenre)

  const handleGenreClick = (genre) => {
    setCurGenre(genre)
  }

  const removeFromWatchList = (movie) => {
    const filteredList = watchList.filter((item) => item.id !== movie.id)

    setWatchList(filteredList)

    // HW: Update local storage
  }

  return (

    <>
      {/* Genre */}
      <div className="flex justify-center m-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleGenreClick(genre)}
              className={
                curGenre == genre
                  ? "mx-4 flex justify-center items-center bg-blue-400 h-[3rem] w-[9rem] text-white font-bold border rounded-xl"
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
        </div>
        <div className="flex justify-center my-10">
          <input
            placeholder="Search Movies"
            className="h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border border-slate-600"
            type="text"
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                <th>
                  <div className="flex gap-3 align-center">
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={handleAscendingRating}
                    ></i>
                    <div>Ratings</div>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={handleDescendingRating}
                    ></i>
                  </div>
                </th>
                <th>
                  <div className="flex">
                    <div>Popularity</div>
                  </div>
                </th>
                <th>
                  <div className="flex">
                    <div>Genre</div>
                  </div>
                </th>
                <th>
                  <div className="flex">
                    <div>Delete</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {
                filteredWatchList.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-50">
                    <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                      <img
                        className="h-[6rem] w-[10rem] object-cover"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt=""
                      />
                      <div className="font-medium text-gray-700 text-sm">{movie.title}</div>
                    </td>
                    <td className="pl-6 py-4">
                      {movie.vote_average}
                    </td>
                    <td className="pl-6 py-4">
                      {movie.popularity}
                    </td>
                    <td className="pl-2 py-4">
                      {genreids[movie.genre_ids[0]]}
                      {/* {getGenreString(movie.genre_ids)} */}
                    </td>
                    <td onClick={()=>removeFromWatchList(movie)} className="text-red-500">Delete</td>

                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </>
      );
}
      export default WatchList;