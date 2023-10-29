import PostModel, { IPost } from "@models/posts";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { Jost } from "next/font/google";

function gethandler(req: Request, res: NextApiResponse) {
  return NextResponse.json({ hello: "world!" });
}

async function posthandler(req: Request, res: NextApiResponse) {
  const json = await req.json();
  console.log(json)
  console.log("req json: ^ >"+json)
  const saveSuccess= await (await saveToDB(json)).json();
  
  return new Response(JSON.stringify(saveSuccess),{status: 201})
}

export { gethandler as GET, posthandler as POST };

async function saveToDB(json: IPost): Promise<Response> {
  try {
    await connectToDB();
    PostModel.create(json);
    return new Response(JSON.stringify(json), {status: 201})
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({message: "db error"}), {status: 500})
  }
}
