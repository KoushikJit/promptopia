"use client"
import Form from '@components/Form'
import { Post } from '@utils/type'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const EditPage = () => {

  //functions
  async function onUpdate(post: Post) {
    console.log("update " + JSON.stringify(post))
    console.log("update " + id)
    await fetch('api/prompt/' + id, {
      method: 'PATCH',
      body: JSON.stringify(post)
    })
    router.push("/profile")
  }

  //session & router
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router= useRouter();

  //state
  const [post, setPost] = useState({})

  //useeffect
  useEffect(() => {
    fetch('api/prompt/' + id).then(res => res.json()).then(json => { setPost(json); })
  }, [])


  return (
    <div>
      <Form onSubmitHandler={onUpdate} formType="Update Prompt" post={post} />
    </div>
  )
}

export default EditPage

