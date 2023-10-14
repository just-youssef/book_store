"use client";

import { useEffect, useState } from 'react'
import DashboardForm from './DashboardForm';
import { useRouter } from 'next/navigation';

const EditDashboard = ({user}) => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);

  const [dashboard, setDashboard] = useState({
    balance: "",
    book_selling: "", 
    top_selling: ""
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await fetch(`/api/users/${user.id}/dashboard`);
      const data = await response.json();

      setDashboard(data);
    };

    fetchDashboard();
  }, []);


  const updateDashboard = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${user.id}/dashboard`, {
        method: "PATCH",
        body: JSON.stringify({
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
  };


  return (
    <DashboardForm
      type='Update'
      dashboard={dashboard}
      setDashboard={setDashboard}
      submitting={submitting}
      handleSubmit={updateDashboard}
    />
  )
}

export default EditDashboard