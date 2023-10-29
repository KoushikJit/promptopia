import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

export async function GET(req: Request, res: Response) {
  console.log("GETTING prompts list for all");
  const queryDBRes = await queryDB();
  const posts = await queryDBRes.json();
  console.log("got posts: " + JSON.stringify(posts));
  console.log(posts);
  return new Response(JSON.stringify(posts), { status: 200 });
}

async function queryDB(): Promise<Response> {
  try {
    await connectToDB();
    console.log("querying db for all posts")
    const posts = await PostModel.find({})
    // .populate("user");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("db error occurred!", { status: 500 });
  }
}
