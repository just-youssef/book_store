import React from 'react'
import Image from "next/image";
import BookCard from './BookCard';

const ProfileCard = ({ name, email, img, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full flex flex-col items-center my-8'>
      <div className='flex items-center'>
        <Image
          src={img}
          alt='user image'
          width={100}
          height={100}
          className='rounded-full object-contain border-gray-300 border-2'
        />
        <div className='flex flex-col justify-center ml-3'>
          <h1 className='font-semibold text-blue-700 text-3xl'>{name}</h1>
          <p className='text-gray-500'>{email}</p>
        </div>
      </div>

      <div className='books_layout'>
        {data.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            handleEdit={() => handleEdit && handleEdit(book)}
            handleDelete={() => handleDelete && handleDelete(book)}
          />
        ))}
      </div>
    </section>
  )
}

export default ProfileCard