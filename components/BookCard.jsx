"use client"

import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation";

const BookCard = ({ book, handleEdit, handleDelete }) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleProfileClick = () => {
    router.push(`/profile/${book.owner._id}`);
  };

  if(!book) return <div>no book</div>;

  return (
    <section className='flex flex-col bg-gray-100 border border-gray-400 p-6 rounded'>
      <div
        className='flex justify-start items-center gap-3 cursor-pointer'
        onClick={handleProfileClick}
      >
        <Image
          src={book.owner.picture}
          alt='user_image'
          width={40}
          height={40}
          className='rounded-full object-contain'
        />

        <div className='flex flex-col'>
          <h3 className='font-semibold text-gray-900'>
            {book.owner.given_name} {book.owner.family_name}
          </h3>
          <p className='text-sm text-gray-500'>
            {book.owner.email}
          </p>
        </div>
      </div>

      <div className='flex flex-col mt-4 gap-2'>
        <div className='flex justify-between w-full'>
          <h1 className='font-semibold text-xl text-blue-700 w-2/3'>{book.title}</h1>

          <div className='flex flex-col justify-between w-1/3 items-end'>
            <h1 className='font-semibold'>{book.price} EGP</h1>
            <h1 className='font-semibold text-green-600'>{book.offer}</h1>
          </div>
        </div>

        <div className='flex flex-col text-sm '>
        {book.desc &&
          <>
          <p className='font-semibold'>Description:</p>
          <p className='text-gray-500'>{book.desc}</p>
          </>
        }
        </div>

        <button
          className='w-full mt-4 preview-btn'
          onClick={()=> router.push(`/books/${book._id}`)}
        >
          Preview Book
        </button>

        {pathName === "/profile" && (
          <div className='flex justify-between items-center gap-2'>
            <button
              className='edit_btn'
              onClick={handleEdit}
            >
              Edit
            </button>
            <button 
              className='del_btn' onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default BookCard