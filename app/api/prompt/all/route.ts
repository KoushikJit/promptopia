import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

async function gethandler(req: Request, res: Response) {
  console.log("GETTING prompts list for all");
  const queryDBRes= await queryDB()
  const posts = await queryDBRes.json();
  console.log('got posts: '+JSON.stringify(queryDBRes))
  return new Response(JSON.stringify(queryDBRes), { status: 200 });
}

export { gethandler as GET };

async function queryDB(): Promise<Response> {
  try {
    await connectToDB();

    const posts = await PostModel.find({}).populate("user");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("db error occurred!", { status: 500 });
  }
}
