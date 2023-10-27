"use client"
import { Post } from "@utils/type";
import Link from "next/link";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";

type FormProps = {
  onSubmitHandler?: (post: Post) => void,
  formType: String,
  post?: any
};

const Form = ({ onSubmitHandler, formType, post }: FormProps) => {
  //state
  const [promptText, setPromptText] = useState("");
  const [tagsText, setTagsText] = useState("")
  const [item, setItem] = useState<Post>({ prompt: "", tags: "" })

  //effect 1st render, +
  useEffect(() => {
    post && setItem(post)
  }, [post]) // here post variable is fetched from the parent edit-prompt page via an async function. hence on the first render of the Form, the post variable will be a promise. Hence, useEffect() should subscribe to changes in post variable to rerender Form component when post (promise) actually resolves to json object.


  return (
    <div className="m-10 max-w-xl">
      <label className="block mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        {/* {<p>{JSON.stringify(post)}</p>} */}
        Prompt
      </label>
      <textarea
        value={item.prompt as string}
        onChange={(event) => {
          setItem({
            tags: item.tags,
            prompt: event.target.value
          });
        }}
        rows={6}
        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
        placeholder="Your awesome prompt..."
      ></textarea>
      <br />
      <label className="block mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Tags
      </label>
      <textarea
        value={item.tags as string}
        onChange={(event) => {
          setItem({
            prompt: item.prompt,
            tags: event.target.value
          });
        }}
        rows={1}
        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
        placeholder="#ideas #ai #prompt ..."
      ></textarea>
      <br />
      <div className="flex justify-end space-x-2">
        {/* form buttons */}
        <Link
          href="/"
          className="p-3 border border-gray-50 rounded-lg hover:bg-gray-800 hover:text-orange-500"
        >
          Cancel
        </Link>
        <Link
          onClick={() => {
            onSubmitHandler && onSubmitHandler(item);
          }}
          href="#"
          className="p-3 bg-orange-600 border border-gray-50 rounded-lg hover:bg-gray-800 hover:text-orange-500"
        >
          {formType}
        </Link>
      </div>
    </div>
  );
};

export default Form;

function getPostObject(promptText: String, tagsText: String): Post {
  return {
    prompt: promptText,
    tags: tagsText,
  };
}


