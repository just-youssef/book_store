"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");

  const [submitting, setIsSubmitting] = useState(false);
  const [book, setBook] = useState({ title: "", desc: "", src: "", price: "", offer: "" });

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`/api/books/${bookId}`);
      const data = await response.json();

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


  const handleSubmit = async (e) => {
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
    <form
      className="flex flex-col items-center my-8 gap-5 bg-gray-100 border border-gray-500 lg:w-1/2 mx-auto px-10 py-14 rounded-md shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-4xl text-blue-600 mb-3">{book.title} Offer</h1>

      <div className="flex flex-col items-start w-full gap-1">
        <label htmlFor="offer" className='text-gray-700 font-semibold' >Enter book Offer/Voucher:</label>
        <input
            id="offer"
            className='input_box'
            placeholder='*Book Offer/Voucher?'
            required
            value={book.offer}
            onChange={(e) => setBook({ ...book, offer: e.target.value })}
        />
      </div>
      <div className="flex flex-col items-start w-full gap-1">
        <label htmlFor="price" className='text-gray-700 font-semibold' >Enter book new price:</label>
        <input
            id="price"
            className='input_box'
            placeholder='*New Price'
            required
            value={book.price}
            onChange={(e) => setBook({ ...book, price: e.target.value })}
        />
      </div>

      <div className='flex justify-end gap-2 w-full mt-5'>
          <Link href={`/books/${bookId}`} className='text-gray-500 px-5 py-2 bg-gray-200 rounded-full active:bg-gray-300 min-w-[90px]'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-2 bg-orange-600 active:bg-orange-700 rounded-full text-white min-w-[90px]'
          >
            {submitting ? `Saving...` : "Save"}
          </button>
      </div>


    </form>
  )
}

export default page