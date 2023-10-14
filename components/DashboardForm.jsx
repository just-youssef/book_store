import Link from "next/link"

const DashboardForm = ({type, dashboard, setDashboard, submitting, handleSubmit}) => {
  return (
    <form
      className='flex flex-col items-center my-8 gap-8 bg-gray-100 border border-gray-500 lg:w-1/2 mx-auto px-10 py-16 rounded-md shadow-2xl'
      onSubmit={handleSubmit}
    >
      <h1 className='font-bold text-4xl text-blue-600'>{type} Dashboard</h1>

      <input
          className='input_box'
          placeholder='*Current weekly balance'
          required
          type='number'
          value={dashboard.balance}
          onChange={(e) => setDashboard({ ...dashboard, balance: e.target.value })}
      />

      <input
          className='input_box'
          placeholder='*Current weekly Book Selling'
          required
          type='number'
          value={dashboard.book_selling}
          onChange={(e) => setDashboard({ ...dashboard, book_selling: e.target.value })}
      />

      <input
          className='input_box'
          placeholder='*Current Top Selling book '
          required
          value={dashboard.top_selling}
          onChange={(e) => setDashboard({ ...dashboard, top_selling: e.target.value })}
      />

      <div className='flex justify-end gap-2 w-full'>
          <Link href='/dashboard' className='text-gray-500 px-5 py-2 bg-gray-200 rounded-full active:bg-gray-300'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-2 bg-orange-600 active:bg-orange-700 rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
      </div>
    </form>
  )
}

export default DashboardForm