"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react'
import DashboardForm from './DashboardForm';
import { useRouter } from 'next/navigation';



const CreateDashboard = ({user}) => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);

  const [dashboard, setDashboard] = useState({
    balance: "",
    book_selling: "", 
    top_selling: ""
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch(`/api/users/${user.id}/dashboard`)
      const data = await res.json();
      
      setDashboard(data);
    };

    fetchDashboard();
  }, []);


  const createDashboardHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${user.id}/dashboard`, {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          balance: dashboard.balance,
          book_selling: dashboard.book_selling,
          top_selling: dashboard.top_selling,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    
  }

  return (<>
  {
    dashboard?.user ?
    <div className='flex flex-col my-10 gap-6'>
      <p className="text-4xl font-bold text-blue-700">You already have an active dashboard!</p>
      <p className="text-3xl font-semibold text-gray-700">Want to view it?</p>
      <Link href="/dashboard">
        <button className='text-white bg-blue-700 active:bg-blue-800 rounded-full px-6 py-2'>
          View Dashboard
        </button>
      </Link>
    </div>
    :
    <DashboardForm
      type="Create"
      dashboard={dashboard}
      setDashboard={setDashboard}
      submitting={submitting}
      handleSubmit={createDashboardHandler}
    />
  }
  </>)
}

export default CreateDashboard