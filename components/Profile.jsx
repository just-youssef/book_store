"use client"

import { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import { useRouter } from "next/navigation";

const Profile = ({ user }) => {
    const router = useRouter();
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchUserBooks = async () => {
          const res = await fetch(`/api/users/${user.id}/books`);
          const data = await res.json();
          setBooks(data);
        }
        user?.id && fetchUserBooks();
    }, []);

    const handleEdit = (book) => {
        router.push(`/books/edit?id=${book._id}`)
    }

    const handleDelete = async (book) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this book?"
          );
      
          if (hasConfirmed) {
            try {
              await fetch(`/api/books/${book._id.toString()}`, {
                method: "DELETE",
              });
      
              const filteredBooks = books.filter((item) => item._id !== book._id);
      
              setBooks(filteredBooks);
            } catch (error) {
              console.log(error);
            }
          }
    }

    return (
        <div>
            {
                user?
                <ProfileCard
                    name={user.given_name+" "+user.family_name}
                    email={user.email}
                    img={user.picture}
                    data={books}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                :
                <div className='w-full flex flex-col items-center'>
                    <p className="text-4xl font-semibold">You are not Signed In !</p>
                </div>
            }
        </div>
    )
}

export default Profile