"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "components/Form";
const EditBook = ( {user} ) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  const [book, setBook] = useState({ title: "", desc: "", src: "", price: "", offer: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`/api/books/${bookId}`);
      const data = await response.json();

      // console.log(data.src);
      setBook({
        title: data.title,
        desc: data.desc,
        src: data.src,
        price: data.price,
        offer: data.offer,
      });
    };

    if (bookId) getBookDetails();
  }, [bookId]);

  const updateBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!bookId) return alert("Missing bookId!");

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({
            title: book.title,
            desc: book.desc,
            src: book.src,
            price: book.price,
            offer: book.offer,
        }),
      });

      if (response.ok) {
        router.push(`/books/${bookId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
        type='Edit'
        book={book}
        setBook={setBook}
        submitting={submitting}
        handleSubmit={updateBook}
    />
  )
}

export default EditBook