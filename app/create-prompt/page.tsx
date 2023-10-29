"use client";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { IPost } from "@models/posts";
import { Post } from "@utils/type";
import { ObjectId } from "mongoose";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const CreatePromptPage = (props: Props) => {
  //session & router
  const router = useRouter();
  const session = useSession().data;

  //state & effect

  return (
    <div>
      <Form onSubmitHandler={onCreate} formType="Create Prompt" />
    </div>
  );

  // function within function component
  async function onCreate(post: Post) {
    const userObjID = session?.user.id;
    const postModel: IPost = {
      prompt: post.prompt as string,
      tags: post.tags as string,
      user: userObjID,
    };
    // send postModel to api prompt/new POST
    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postModel),
      });
      if (response.ok) {
        router.push("/");
        const json = await response.json();
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default CreatePromptPage;
