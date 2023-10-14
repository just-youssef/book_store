"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import LoadPage from './LoadPage';


const BookPreview = ({currentUser, bookId}) => {
    const [book, setBook] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch (`/api/books/${bookId}`);
            const data = await response.json();

            setBook(data);
        }

        bookId && fetchBook();
    }, [bookId])
    
    const handleEdit = () => {
        router.push(`/books/edit?id=${bookId}`)
    }

    const handleDelete = async (book) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this book?"
          );
      
          if (hasConfirmed) {
            try {
              await fetch(`/api/books/${bookId.toString()}`, {
                method: "DELETE",
              });
            } catch (error) {
              console.log(error);
            }
          }
    }
    
    console.log(book);
    if(!book.owner) return <LoadPage />

    return (
    <div className='flex flex-col my-5 gap-5'>
        <div className='flex justify-between bg-gray-100 border border-gray-500 rounded-xl px-8 py-6 shadow-xl'>
            <div className='flex flex-col gap-2 w-2/3'>
                <h1 className='text-blue-700 max-sm:text-4xl text-5xl font-bold'>{book.title}</h1>
                <p  className='text-gray-600 md:text-lg cursor-pointer'
                    onClick={() => router.push(`/profile/${book.owner._id}`)}
                >
                    Owner: {book.owner.given_name} {book.owner.family_name}
                </p>

                {book.desc &&
                    <div className='flex flex-col mt-5'>
                        <p className='font-semibold'>Description:</p>
                        <p className='text-gray-500'>{book.desc}</p>
                    </div>
                }

                {currentUser?.id === book.owner._id ?
                <div className='flex justify-between max-sm:gap-2 gap-5 lg:w-5/6 mt-8'>
                    <button
                        className='offer_btn'
                        onClick={() => router.push(`/offer?bookId=${book._id}`)}
                        >
                        Offer <span className='max-md:hidden'>/Voucher</span>
                    </button>
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
                :
                <button className='outline-btn lg:w-1/2 mt-5'>
                    Buy Book
                </button>
                }
            </div>

            <div className='flex flex-col md:text-lg items-end w-1/3 gap-5'>
                <p className='bg-orange-600 text-white rounded px-3'>Price: {book.price} EGP</p>
                {book.offer && <p className='bg-green-600 text-white rounded px-3'>{book.offer}</p>}
            </div>
        </div>

        <embed
            type="application/pdf"
            className='h-screen w-full rounded-lg border border-gray-500 shadow-xl'
            src={book.src}
        />
    </div>
    )
}

export default BookPreview