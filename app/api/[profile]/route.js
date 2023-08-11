import { connectToDB } from "@/utils/database";
import Album from "@/models/album";
import User from "@/models/user";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // fetching own albums
    const albums = await Album.find({ creator: params.profile }).populate(
      "creator"
    );

    // fetching users to access the shared albums array
    const user = await User.findById(params.profile);

    // instantiate an array to hold shared albums
    const sharedAlbums = [];

    //iterate over the albums array and fetch each shred albums, push them to shared albums array
    for (let i = 0; i < user.albums.length; i++) {
      const foundAlbum = await Album.findById(user.albums[i]).populate(
        "creator"
      );
      if (foundAlbum) {
        sharedAlbums.push(foundAlbum);
      }
    }

    return new Response(
      JSON.stringify({ albums: albums, sharedAlbums: sharedAlbums }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("failed to fetch all albums", { status: 500 });
  }
};
