import React from "react";
import { Link } from "react-router-dom";
import musicImg from "../assets/musicImg.jpg";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // console.log(artistData);
  const htmlText = artistData?.data[0].attributes?.artistBio;
  console.log(htmlText);
  return (
    <div>
      <div className="relative w-full flex flex-col ">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

        <div className="absolute inset-0 flex items-center">
          <img
            alt="profile"
            // src={
            //   artistId
            //     ? artistData?.artists[artistId].attributes?.artwork?.url
            //         .replace("{w}", "500")
            //         .replace("{h}", "500")
            //     : songData?.images?.coverart
            // }
            // artistData?.data[0].attributes?.artwork?.url
            src={
              artistId
                ? artistData?.data[0].attributes?.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images
                ? songData?.images?.coverart
                : musicImg
            }
            // src={musicImg}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />

          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {artistId
                ? artistData?.data[0].attributes?.name
                : songData?.title}
            </p>
            {/* {!artistId && (
          <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
            <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
          </Link>
        )} */}
            <p className="text-lg capitalize text-gray-400 mt-2">
              {artistId ? artistData?.data[0].type : null}
            </p>
            <p className="text-base text-gray-400 mt-2">
              {artistId
                ? artistData?.data[0].attributes?.genreNames[0]
                : songData?.genres?.primary}
            </p>
          </div>
        </div>

        <div className="w-full sm:h-44 h-24" />
      </div>
      <div
        className="text-base text-gray-400 my-2"
        dangerouslySetInnerHTML={{ __html: htmlText }}
      ></div>
    </div>
  );
};

export default DetailsHeader;
