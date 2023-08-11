"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { LuEdit3 } from "react-icons/lu";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { useSession } from "next-auth/react";

import Image from "next/image";

const ImageThumb = ({
  image,
  setViewDelete,
  viewEdit,
  setViewEdit,
  viewMode,
  viewComment,
  setViewComment,
  likeImage,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <div className="relative mt-5 prompt_card transition-all flex flex-col items-center">
        <div className="z-30 absolute bottom-3  left-3 flex flex-col gap-2 backdrop-blur-lg p-0.5 rounded-lg">
          <div
            className="flex z-30 items-center gap-2"
            onClick={() => likeImage(image._id)}>
            {image.likes.includes(session.user.id) ? (
              <AiFillHeart className="z-30 transition-all delay-200 w-6 h-6 hover:scale-105 text-red-600" />
            ) : (
              <AiOutlineHeart className="z-30 text-gray-700 mix-blend-difference transition-all delay-200 w-6 h-6 hover:scale-105" />
            )}
            <h1 className="gray_gradient mix-blend-difference">
              {image.likes.length}
            </h1>
          </div>
        </div>
        <div className="z-30 absolute bottom-3 text-gray-600 right-3 flex flex-col gap-2 backdrop-blur-lg p-0.5 rounded-lg">
          <div
            className="flex items-center gap-2"
            onClick={() => setViewComment({ view: true, data: image })}>
            <MdOutlineInsertComment className="text-gray-700 mix-blend-difference transition-all delay-200 w-6 h-6 hover:scale-105" />{" "}
            <h1 className="gray_gradient mix-blend-difference">
              {image.comments.length}
            </h1>
          </div>
        </div>

        <div className="z-30 absolute top-3 right-3">
          {editMode ? (
            <div>
              <button
                className="hover:scale-105  hover:bg-green-200 transition-all glassmorphism_4"
                onClick={() => setViewEdit({ view: true, data: image })}>
                <LuEdit3 />
              </button>
              <button
                className="hover:scale-105 hover:bg-red-200 transition-all glassmorphism_4 ml-2"
                onClick={() => setViewDelete({ view: true, data: image })}>
                <RiDeleteBin4Line />
              </button>
            </div>
          ) : (
            <div className="z-30">
              {!viewMode && (
                <button
                  className="z-30 hover:scale-105  hover:bg-blue-200 transition-all glassmorphism_4_1"
                  onClick={() => setEditMode(!editMode)}>
                  <PiDotsThreeOutlineVerticalFill />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="absolute bottom-10 z-30 bg-slate-800 bg-opacity-50 px-2 rounded-full">
          <h1 className=" font-mono drop-shadow-2xl  text-gray-300">
            {image.caption}
          </h1>
        </div>

        <img
          className="transition-all w-full h-fit duration-700 hover:scale-105"
          // width={auto}
          // height={auto}
          src={image.image}
          alt="uploaded_images"
        />
      </div>
    </div>
  );
};

const PictureFeed = ({
  images,
  setViewDelete,
  viewEdit,
  setViewEdit,
  viewMode,
  viewComment,
  setViewComment,
  likeImage,
}) => {
  return (
    <div>
      <div className="prompt_layout">
        {images.map((image) => (
          <ImageThumb
            key={image._id}
            image={image}
            setViewDelete={setViewDelete}
            viewEdit={viewEdit}
            setViewEdit={setViewEdit}
            viewMode={viewMode}
            viewComment={viewComment}
            setViewComment={setViewComment}
            likeImage={likeImage}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureFeed;
