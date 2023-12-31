import { connectToDB } from "@/utils/database";
import Image from "@/models/image";

// Add Comment image -->
export const PATCH = async (request, { params }) => {
  const { commenter, contex, image } = await request.json();
  try {
    await connectToDB();
    // Find the existing Album by ID
    const existingImage = await Image.findById(params.image);
    if (!existingImage) {
      return new Response("Image not found", { status: 404 });
    }
    // Update the Album with new data
    existingImage.comments.push(image + ":>" + commenter + ":>" + contex);
    await existingImage.save();
    return new Response("Successfully Added comment", { status: 200 });
  } catch (error) {
    return new Response("Failed to add comment", { status: 500 });
  }
};
