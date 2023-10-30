"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@utils/type";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {};


const Feed = (props: Props) => {
  //state
  const [postArray, setPostArray] = useState<Post[]>([]);

  // session
  const session = useSession().data;

  //states
  const [feedPosts, setFeedPosts] = useState([])

  // effect
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt/all", 
      {method: 'POST'}
    );
      const json = await response.json();
      console.log("feedposts received: "+ json.length)
      setFeedPosts(json)
    };
    console.log(JSON.stringify({
      userID: session?.user.id,
    }));
    fetchPosts();
  }, []);



  return (
    <>
      <div className="mt-4 flex flex-col space-y-4">
        {feedPosts.map((item, index) => {
          return <PromptCard post={item} cardKey={item._id} onTagClicked={(val) => { }} />;
        })}
      </div>
    </>
  );
};

export default Feed;

