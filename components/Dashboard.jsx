"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const Dashboard = ({user}) => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState({})

    useEffect(() => {
      const fetchDashboard = async () => {
        const res = await fetch(`/api/users/${user.id}/dashboard`)
        const data = await res.json();
        setDashboard(data);
      };
  
      fetchDashboard();
    }, []);


    const handleDelete = async () => {
      const hasConfirmed = confirm(
          "Are you sure you want to delete your dashboard?"
        );
    
        if (hasConfirmed) {
          try {
            await fetch(`/api/users/${user.id}/dashboard`, {method: "DELETE"});
            router.push(`/`)
          } catch (error) {
            console.log(error);
          }
        }
  }

  
  const handleEdit = () => {
    router.push(`/dashboard/edit`)
}

  return (<>
  {
    !dashboard.user?
    <div className='flex flex-col my-10 gap-6'>
      <p className="text-4xl font-bold text-blue-700">You currently don't have an active dashboard!</p>
      <p className="text-3xl font-semibold text-gray-700">Want to create a one?</p>
      <Link href="/dashboard/create">
        <button className='text-white bg-blue-700 active:bg-blue-800 rounded-full px-6 py-2'>
          Create Dashboard
        </button>
      </Link>
    </div>
    :
    <div className='lg:ml-8 flex flex-col my-8 gap-10 bg-gray-100 max-sm:py-12 px-10 py-16 border border-gray-400 rounded-md max-w-4xl shadow-2xl'>
      <h1 className='font-bold max-sm:text-4xl text-5xl text-blue-600'>Your Weekly Dashboard</h1>

      <div className='grid grid-cols-2 max-sm:text-xl text-2xl border border-gray-400 rounded-md py-8 px-6 gap-y-8'>
        <p className='font-semibold text-gray-700'>Weekly Balance: </p>
        <p className="text-orange-500 text-end">{dashboard.balance} EGP</p>

        <p className='font-semibold text-gray-700'>Book Selling this week: </p>
        <p className="text-orange-500 text-end">{dashboard.book_selling} book</p>

        <p className='font-semibold text-gray-700'>Top Selling this week: </p>
        <p className="text-orange-500 text-end">{dashboard.top_selling}</p>
      </div>

      <div className='flex justify-end gap-2'>
        <button
          className='bg-red-700 active:bg-red-800 text-white rounded-full px-6 py-3 min-w-[100px]'
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
            className='bg-green-700 active:bg-green-800 text-white rounded-full px-6 py-3 min-w-[100px]'
            onClick={handleEdit}
          >
          Edit
        </button>
      </div>
    </div>
  }
  </>)
}

export default Dashboard