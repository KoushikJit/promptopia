"use client"
import Profile from '@components/Profile'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import config from '../../tailwind.config';
import { useRouter } from 'next/navigation'

type Props = {}



const ProfilePage = (props: Props) => {
    //function declarations
    const handleDelete = async (post: any) => {
        console.log("DELETE!!! " + post._id);
        const hasconfirmed = confirm("Sure to Delete?")
        if (hasconfirmed) {
            await fetch('api/prompt/' + post._id, {
                method: "DELETE",
            })
            fetchUserPosts();
        }
    }
    const handleEdit = async (post: any) => {
        router.push("/edit-prompt?id=" + post._id);
    }

    // router
    const router = useRouter();

    //state
    const [postList, setPostList] = useState([])

    //#### VERY IMPORTANT!!!!####
    const { data: session, status } = useSession();

    var geturl = 'api/users/' + session?.user.id + "/posts"
    function fetchUserPosts() {
        fetch(geturl).then(res => res.json()).then(json => { console.log(json); setPostList(json) })
    }
    //effect
    useEffect(() => {
        if (status != 'loading' && session?.user) {
            fetchUserPosts()
        }
    }, [session, status])


    return (
        <section className="p-4 flex-col">
            {/* assign postList to content List */}
            {status === 'loading' && <p className="bg-slate-600 h-screen text-center">Loading...</p>}
            {status != 'loading' && <Profile user={session?.user} contentList={postList} handleDelete={handleDelete} handleEdit={handleEdit} />}
        </section>
    )
}

export default ProfilePage
