import React from 'react'

// /1234
// tmdb.com/poster/1234

// function component(props)

function Movie({ movie, addToWatchList, removeFromWatchList, isMoviePresentInWatchList }) {

    const addEmojiDiv = (
        <div onClick={() => removeFromWatchList(movie)} className="m-4 flex justify-center h-12 w-12 items-center rounded-lg bg-white">
            &#10060;
        </div>
    )

    const removeEmojiDiv = (<div onClick={() => addToWatchList(movie)} className="m-4 flex justify-center h-12 w-12 items-center rounded-lg bg-white">
         &#128525;
    </div>)

    const renderEmojiDiv = (isMoviePresentInWatchList) => {
        return isMoviePresentInWatchList ? addEmojiDiv :
            removeEmojiDiv
    }

    return (
        <div className="h-[40vh] w-[300px] bg-center bg-cover rounded-md hover:scale-110 duration-200 hover:cursor-pointer flex flex-col justify-between items-end" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})` }}>
        <div className="text-white w-full text-center text-xl p-2 bg-gray-900/70 rounded-lg">{movie.title}</div>
            {renderEmojiDiv(isMoviePresentInWatchList)}
        </div>

    )
}

export default Movie