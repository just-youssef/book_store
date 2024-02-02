"use client";

import { Form } from '@components'
import { useState } from 'react'
import { useRouter } from "next/navigation";

const AddBook = ({ user }) => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [book, setBook] = useState({ title: "", desc: "", src: "", price: "", offer: "" });

  const addBookHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/books/new/", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          title: book.title,
          desc: book.desc,
          src: book.src,
          price: book.price,
          offer: book.offer,
        }),
      });

      if (response.ok) {
        router.push("/");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {
        user ?
          <Form
            type="Add"
            book={book}
            setBook={setBook}
            submitting={submitting}
            handleSubmit={addBookHandler}
          />
          :
          <div className='flex justify-center'>
            <p className="text-4xl font-semibold">You are not Signed In!</p>
          </div>
      }
    </div>
  )
}

export default AddBook