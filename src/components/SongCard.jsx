import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import defaultImg from "../assets/musicImg.jpg";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  // console.log("song", song);
  // console.log("activeSong", activeSong);
  // console.log("data", data);
  const dispatch = useDispatch();
  // click play/pause sẽ dispatch action thay state trong store của slice player
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    // console.log(song.subtitle);
  };
  // console.log(activeSong);
  console.log(song);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ">
      <div className="relative w-full group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.key === song.key
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.images ? song.images.coverart : defaultImg}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate  ">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        {/* <p className="text-sm truncate text-gray-300 mt-1 hover:underline">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p> */}
        <div className="flex flex-row">
          {song?.artists?.map((artist, i) => (
            <p className="text-sm truncate text-gray-300 mt-1 hover:underline">
              <Link
                to={
                  artist
                    ? `/artists/${song?.artists[i]?.adamid}`
                    : "/top-artists"
                }
              >
                {song.subtitle.split(/[,&]/)[i].trim()}
              </Link>
              {i === song.artists.length - 1 ? " " : ","}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
