"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

const SignInComponent = (props: Props) => {
  // session
  const {data: session, status}= useSession();

  //use effect
  if (session && session.user) {
    return(
      <div>
        <p>{session.user.name}</p>
        <button onClick={()=>signOut()} className='text-red-600 border border-red-600 p-4'>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={()=> signIn()} className='text-green-600 border border-green-600 p-4'>Sign In</button>
    </div>
  )
}

export default SignInComponent