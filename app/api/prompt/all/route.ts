import PostModel from "@models/posts";
import { connectToDB } from "@utils/database";

async function gethandler(req: Request, res: Response) {
    console.log("GETTING prompts list for all");
    const posts= await (await queryDB(null)).json();
    
    return new Response(JSON.stringify(posts), { status: 200 });
}

async function posthandler(req: Request, res: Response) {
  console.log("post in prompt of user");
  
  const json= await req.json()
  console.log(json)

  const userObjID= json.userID

  const posts= await (await queryDB(userObjID)).json();
  
  return new Response(JSON.stringify(posts), { status: 200 });
}

export { gethandler as GET, posthandler as POST };

async function queryDB(userObjID: any): Promise<Response> {
  try {
    await connectToDB();
    if (userObjID) {
        const posts= await PostModel.find({ user: userObjID })
        return new Response(JSON.stringify(posts), {status: 200})
    }else{
        const posts= await PostModel.find({}).populate('user')
        return new Response(JSON.stringify(posts), {status: 200})
    }

  } catch (error) {
    console.error(error);
    return new Response("db error occurred!", {status: 500})
  }
}
