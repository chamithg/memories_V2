"use client";

import React, { useEffect, useState } from "react";
import CreateImage from "./CreateImage";
import PictureFeed from "./PictureFeed";
import Loading from "./Loading";
import ImageCarousel from "./ImageCarousel";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { LuEdit3 } from "react-icons/lu";
import { TfiLayoutSlider } from "react-icons/tfi";
import { BsGrid } from "react-icons/bs";

import DeleteItem from "./DeleteItem";
import EditImage from "./EditImage";
import AddComment from "./AddComment";
import { useSession } from "next-auth/react";

const DisplayPosts = ({
  post,
  pathname,
  setViewDelete: setPostViewDelete,
  viewEdit: postViewEdit,
  setViewEdit: setPostViewEdit,
  viewMode,
}) => {
  const [uploadView, setUploadView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collectionImages, setCollectionImages] = useState([]);
  const [slideView, setSlideView] = useState(false);
  // for deleting an image
  const [viewDelete, setViewDelete] = useState({ view: false, data: "" });
  // for editing an image
  const [viewEdit, setViewEdit] = useState({ view: false, data: "" });
  // for commenting on image
  const [viewComment, setViewComment] = useState({ view: false, data: "" });
  // for like an image
  const [addingLike, setAddingLike] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const { data: session } = useSession();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api${pathname}/${post._id}/image`);
      const data = await response.json();
      setCollectionImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchImages();
  }, [uploadView, viewDelete, viewEdit, viewComment, addingLike]);

  // like an image
  const likeImage = async (image) => {
    console.log("this is image" + image._id);
    try {
      const response = await fetch(`/api/profile/album/post/${image}/like`, {
        method: "PATCH",
        body: JSON.stringify({
          commenter: session.user.id,
          image: image,
        }),
      });
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingLike(!addingLike);
    }
  };

  return (
    <div className="w-full">
      <div>
        {/* for a Image delete */}
        {viewDelete.view && (
          <DeleteItem
            viewDelete={viewDelete}
            setViewDelete={setViewDelete}
            path={`/api${pathname}/${post._id}/${viewDelete.data._id}`}
            type={"Image"}
            name={`"${viewDelete.data.caption}"`}
          />
        )}
      </div>

      <div className="w-full mt-10">
        <div className="flex place-content-between">
          <h1 className="orange_gradient text-left font-chewy text-4xl mt-2">
            {post.postname}
          </h1>
          <div className="flex justify-center items-center">
            <button
              className="grad_btn_pink"
              onClick={() => setSlideView(!slideView)}>
              {" "}
              {slideView ? <BsGrid /> : <TfiLayoutSlider />}
            </button>
            {editMode ? (
              <div>
                <button
                  className="hover:scale-105  hover:bg-green-200 transition-all glassmorphism_4 ml-2"
                  onClick={() => setPostViewEdit({ view: true, data: post })}>
                  <LuEdit3 />
                </button>
                <button
                  className="hover:scale-105 hover:bg-red-200 transition-all glassmorphism_4 ml-2"
                  onClick={() => setPostViewDelete({ view: true, data: post })}>
                  <RiDeleteBin4Line />
                </button>
              </div>
            ) : (
              <div>
                {!viewMode && (
                  <button
                    className="hover:scale-105  hover:bg-blue-200 transition-all glassmorphism_4 ml-2"
                    onClick={() => setEditMode(!editMode)}>
                    <FaRegEdit />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 h-1 w-full bg-gradient-to-r from-pink-800 via-pink-200 to-pink-400 "></div>

        <p className="mt-2 text-left font-satoshi font-semibold text-lg text-gray-700">
          {post.desc}
        </p>
        <div>
          {loading ? (
            <Loading />
          ) : slideView ? (
            <ImageCarousel
              images={collectionImages}
              viewComment={viewComment}
              setSlideView={setSlideView}
            />
          ) : (
            <PictureFeed
              images={collectionImages}
              setViewDelete={setViewDelete}
              viewEdit={viewEdit}
              setViewEdit={setViewEdit}
              viewMode={viewMode}
              viewComment={viewComment}
              setViewComment={setViewComment}
              likeImage={likeImage}
            />
          )}
          {uploadView ? (
            <CreateImage setUploadView={setUploadView} postID={post._id} />
          ) : (
            <div>
              {!viewMode && (
                <button
                  className="mt-5 h-7 w-7 hover:scale-105 rounded-full bg-gradient-to-r from-pink-800 text-white to-pink-400"
                  onClick={() => setUploadView(true)}>
                  {" "}
                  +{" "}
                </button>
              )}
            </div>
          )}
          {viewEdit.view && (
            <EditImage viewEdit={viewEdit} setViewEdit={setViewEdit} />
          )}
          {viewComment.view && (
            <AddComment
              viewComment={viewComment}
              setViewComment={setViewComment}
              user={session?.user}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayPosts;
