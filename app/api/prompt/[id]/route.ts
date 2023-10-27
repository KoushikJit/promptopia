import PostModel, { IPost } from "@models/posts";
import { connectToDB } from "@utils/database";
import { Post } from "@utils/type";

async function gethandler(req: Request, { params }, res: Response) {
  console.log(params.id);
  await connectToDB();
  const post = await PostModel.findById(params.id).populate("user");
  return post
    ? new Response(JSON.stringify(post), { status: 200 })
    : new Response("Prompt with ID not found!", { status: 404 });
}

async function patchhandler(req: Request, { params }, res: Response) {
  const reqBody: Post | null = await req.json();
  console.log(reqBody);
  if (!reqBody) {
    return new Response("Request body invalid!", { status: 400 });
  }

  await connectToDB();
  try {
    const post: (IPost & Document) | null = await PostModel.findById(params.id);
    if (!post) {
      return new Response("Prompt with ID not found..", { status: 404 });
    } else {
      console.log(post);
      post.prompt = reqBody.prompt as string;
      post.tags = reqBody.tags as string;
      await post.save();
      return new Response("Prompt Updated!", { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to Update!", { status: 500 });
  }
}

async function deletehandler(req: Request, { params }, res: Response) {
  connectToDB();
  try {
    await PostModel.findByIdAndRemove(params.id);
    console.log("Deleted: "+params.id)
    return new Response("Deleted!!", {status:200})
  } catch (error) {
    console.error(error)
    return new Response("Couldn't Delete!", {status: 500})
  }
}

export { gethandler as GET, patchhandler as PATCH, deletehandler as DELETE };
