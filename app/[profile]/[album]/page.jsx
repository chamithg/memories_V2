"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import Loading from "@/components/Loading";
import DeleteItem from "@/components/DeleteItem";
import EditPost from "@/components/EditPost";

const Album = () => {
  const [viewCreate, setViewCreate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //  for deleting a post
  const [viewDelete, setViewDelete] = useState({ view: false, data: "" });
  // for editing a post
  const [viewEdit, setViewEdit] = useState({ view: false, data: "" });
  //
  const [creator, setCreator] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const pathname = usePathname();
  const path = pathname.split("/");
  const { data: session } = useSession();

  pathname.split("/")[1];

  useEffect(() => {
    setLoading(true);

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api${pathname}`);
        const data = await response.json();
        if (path[1] === data.creator) {
          setViewMode(false);
        } else {
          setViewMode(true);
        }
        setPosts(data.posts);
        setAlbumName(data.albumname);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [viewCreate, viewDelete, viewEdit]);

  return (
    <div className="w-full mt-16 lg:mt-32 flex flex-col items-center">
      {loading && (
        <div className="flex gap-2 justify-center items-center">
          <Loading />
          <h1 className="orange_gradient font-semibold">
            Loading Collections ...
          </h1>
        </div>
      )}
      {/* this is for a post/collection delete */}
      {viewDelete.view && (
        <DeleteItem
          viewDelete={viewDelete}
          setViewDelete={setViewDelete}
          path={`/api${pathname}/${viewDelete.data._id}`}
          type={"Post"}
          name={viewDelete.data.postname}
        />
      )}
      {/* this is for post/collection edit */}
      {viewEdit.view && (
        <EditPost viewEdit={viewEdit} setViewEdit={setViewEdit} />
      )}
      {albumName && (
        <div className="">
          <h1 className="pink_gradient font-chewy text-5xl pb-3">
            Album : {albumName}
          </h1>
        </div>
      )}
      {posts &&
        posts.map((post) => (
          <DisplayPosts
            key={post._id}
            pathname={pathname}
            post={post}
            setViewDelete={setViewDelete}
            viewEdit={viewEdit}
            setViewEdit={setViewEdit}
            viewMode={viewMode}
          />
        ))}
      {viewCreate ? (
        <CreatePost pathname={pathname} setViewCreate={setViewCreate} />
      ) : (
        <div>
          {!viewMode && (
            <button
              className="z-40 grad_btn fixed bottom-3 left-screen/2 -translate-x-1/2 shadow-2xl"
              onClick={() => setViewCreate(true)}>
              {" "}
              + Add New Collection
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Album;
