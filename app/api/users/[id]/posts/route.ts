import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

async function gethandler(req: Request, {params}, res: Response): Promise<Response> {
  const posts = await (await queryDB(params.id)).json();
  return new Response(JSON.stringify(posts), { status: 200 });
}

async function queryDB(userObjID: any): Promise<Response> {
  try {
    await connectToDB();
    if (userObjID) {
      console.log("user posts for: " +userObjID)
      const posts = await PostModel.find({ user: userObjID }).populate("user");
      return new Response(JSON.stringify(posts), { status: 200 });
    } else {
      const posts = await PostModel.find({}).populate("user");
      return new Response(JSON.stringify(posts), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("db error occurred!", { status: 500 });
  }
}

export { gethandler as GET };
