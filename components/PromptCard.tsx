import { Post } from "@utils/type";
import React, { useState } from "react";
import { LuCopy, LuCopyCheck, LuPencil, LuTrash2 } from "react-icons/lu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  post: Post,
  onTagClicked: (tag: string) => void,
  cardKey: number,
  handleDelete?: (post: any)=>void,
  handleEdit?: (post: any)=>void,
};

function copyPrompt(prompt: String) {
  navigator.clipboard.writeText(prompt as string);
}

const PromptCard = ({ post, onTagClicked, cardKey, handleDelete, handleEdit }: Props) => {
  //state
  const [promptCopied, setPromptCopied] = useState(false);

  //session
  const { data: session } = useSession();
  const pathname= usePathname()

  return (
    <>
      <div key={cardKey} className=" bg-white px-4 pb-4 flex flex-col border rounded-lg border-gray-400 max-w-sm">
        <p className=" text-gray-600 flex justify-end">
          {!promptCopied && (
            <LuCopy onClick={() => {
              copyPrompt(post.prompt); setPromptCopied(true); setTimeout(() => {
                setPromptCopied(false)
              }, 1000);
            }}
              className="cursor-pointer stroke-2 hover:stroke-2 stroke-slate-300 hover:stroke-black relative top-6 right-0 rounded-md h-8 w-8 p-1" />
          )}
          {promptCopied && (
            <LuCopyCheck onClick={() => { setPromptCopied(true); }}
              className="cursor-default stroke-2 hover:stroke-2 stroke-emerald-500  hover:stroke-emerald-600 relative top-6 right-0 rounded-md h-8 w-8 p-1" />
          )}
        </p>



        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl mb-2 pr-6">
            {post.prompt.length > 40
              ? post.prompt.slice(0, 40) + "..."
              : post.prompt}
          </div>
          <p className="text-gray-700 text-base">{post.prompt}</p>
          <div className="mt-4">
            {post.tags
              .split("#")
              .map(
                (tag, index) =>
                  tag.length != 0 && (
                    <span onClick={() => { onTagClicked(tag) }} className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      # {tag}
                    </span>
                  )
              )}
          </div>
        </div>
        {post.user && <PostedByUser user={post.user} />}
        {(session?.user.id === post.user._id && pathname=== '/profile') && <EditDeleteButtons handleDelete={handleDelete} handleEdit={handleEdit} post={post}/>}
      </div>
    </>
  );
};

export default PromptCard;


function PostedByUser({ user }: any) {
  return (
    <div className="flex items-center">
      <Image
        className="w-10 h-10 rounded-full mr-4"
        width={50}
        height={50}
        src={user.image}
        alt="avatar"
      />
      <div className="text-sm">
        <p className="text-gray-900 leading-none">{user.username}</p>
        <p className="text-gray-600 text-xs leading-snug">
          ({user.email})
        </p>
      </div>
    </div>
  );
}

function EditDeleteButtons({handleEdit,handleDelete,post}: any) {
  return (
    <p className=" text-gray-600 flex justify-end">
      <LuPencil
        onClick={() => {
          console.log(post._id.slice(0,10))
          handleEdit(post);
        }}
        className="cursor-pointer stroke-2 hover:stroke-2 stroke-slate-300 hover:stroke-black relative bottom-6 right-0 rounded-md h-8 w-8 p-1" />
      <LuTrash2
        onClick={() => {
          console.log(post._id.slice(0,10))
          handleDelete(post);
        }}
        className="cursor-pointer stroke-2 hover:stroke-2 stroke-slate-300 hover:stroke-black relative bottom-6 right-0 rounded-md h-8 w-8 p-1" />
    </p>
  );
}