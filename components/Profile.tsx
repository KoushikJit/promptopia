import React from 'react'
import Image from 'next/image'
import PromptCard from './PromptCard'
import { Post } from '@utils/type'

type Props = {
  user: any,
  contentList: never[],
  handleDelete?: (post: any)=> void,
  handleEdit?: (post: any)=> void,
}

const Profile = ({ user, contentList, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {user&& <ProfileBanner user={user}/>}
      {contentList.map((post: Post, index) => {
        return (<section className="mt-4 flex flex-col space-y-4">
          <PromptCard post={post} onTagClicked={() => { }} cardKey={0} handleDelete={handleDelete} handleEdit={handleEdit}/>
        </section>);
      })}
    </>
  );


}


export default Profile

function ProfileBanner({user}: any) {
  return <section className="mt-4 mb-8 flex font-medium items-center justify-center">
    <section className="w-10/12 max-w-md mx-auto bg-slate-900 border border-gray-600 rounded-2xl px-8 py-6 shadow-lg">
      <div className="mt-6 w-fit mx-auto">
        <Image width={80} height={80} src={user.image} className="rounded-full w-28 " alt="profile picture" />
      </div>

      <div className="mt-8 ">
        <h2 className="text-white font-bold text-2xl tracking-wide">{user.name}</h2>
        <h2 className="text-white text-opacity-50 font-normal text-lg tracking-normal">{user.email}</h2>

      </div>
      <div className="mt-3 text-white text-sm">
        <span className="text-gray-400 font-semibold">Posts:</span>
        <span>3</span>
      </div>
    </section>
  </section>
}
