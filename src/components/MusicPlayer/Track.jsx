import React from "react";
import { Link } from "react-router-dom";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activeSong?.images?.coverart}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {/* {activeSong?.title ? activeSong?.title : "No active Song"} */}
        <Link to={`/songs/${activeSong?.key}`}>
          {activeSong?.title ? activeSong?.title : "No active Song"}
        </Link>
      </p>
      <div className="flex flex-row">
        {activeSong?.artists?.map((artist, i) => (
          <p className="text-sm truncate text-gray-300 mt-1 hover:underline">
            <Link
              to={
                artist
                  ? `/artists/${activeSong?.artists[i]?.adamid}`
                  : "/top-artists"
              }
            >
              {activeSong?.subtitle
                ? activeSong.subtitle.split(/[,&]/)[i].trim()
                : "No active Song"}
            </Link>
            {i === activeSong.artists.length - 1 ? " " : ","}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default Track;
