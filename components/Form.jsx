"use client";

import { uploadFile } from '@utils/uploadFile';
import Image from 'next/image';
import Link from 'next/link'
import {useState} from 'react'


const Form = ({type, book, setBook, submitting, handleSubmit}) => {
  // const [file, setFile] = useState(null);
  
  const handleChangeAndUpload = async (e) => {
    const fileUrl = await uploadFile(e.target.files[0])
    setBook({ ...book, src: fileUrl })
    // console.log(fileUrl);
  }

  // console.log(book.src);
  return (
    <section className='flex flex-col mt-5 gap-5'>
        <h1 className='font-bold text-4xl text-blue-600'>{type} Book</h1>
        <p className='text-gray-700'>Provide your Book Details!</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 max-w-2xl"
      >
        <input
          className='bg-gray-100 border border-gray-500 rounded px-4 py-2'
          placeholder='*Your book title'
          required
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        
        <div className='flex justify-between gap-5'>
          <input
            className='bg-gray-100 border border-gray-500 rounded px-4 py-2 w-full'
            placeholder='*Book Price (in EGP)'
            required
            type='number'
            value={book.price}
            onChange={(e) => setBook({ ...book, price: e.target.value })}
          />
          <input
            className='bg-gray-100 border border-gray-500 rounded px-4 py-2 w-full'
            placeholder='Any vouchers/offers? (optional)'
            value={book.offer}
            onChange={(e) => setBook({ ...book, offer: e.target.value })}
          />
        </div>

        <textarea
          className='bg-gray-100 border border-gray-500 rounded px-4 py-2 h-40'
          placeholder='Describe your book briefly (optional)'
          value={book.desc}
          onChange={(e) => setBook({ ...book, desc: e.target.value })}
        />

        {book.src ?
          <>
            <embed
              className='h-screen'
              type='application/pdf'
              src={book.src}
            />

            <div className='flex flex-col gap-1'>
              <label htmlFor="change_file" className='text-gray-700' >Change your book preview (.pdf):</label>
              <input type="file" id="change_file" onChange={handleChangeAndUpload} />
            </div>
          </>
            :
            <div className='flex flex-col gap-1'>
              <label htmlFor="add_file" className='text-gray-700' >Upload your book preview (.pdf):</label>
              <input type="file" id="add_file" required onChange={handleChangeAndUpload} />
            </div>
        }

        <div className='flex justify-end gap-2'>
          <Link href='/' className='text-gray-500 px-5 py-1.5 text-sm bg-gray-200 rounded-full active:bg-gray-300'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-orange-600 active:bg-orange-700 rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form