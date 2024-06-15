import React from "react";

function Banner({ url, name }) {
    return (
        <div
            className=" backgroundImage h-[20vh] md:h-[55vh] bg-cover bg-center flex items-end"
            style={{
                backgroundImage:
                `url(https://image.tmdb.org/t/p/original/${url})`
            }}
        >
            <div className="text-white w-full text-center text-2xl">
                {name}
            </div>
        </div>
    );
}
export default Banner;