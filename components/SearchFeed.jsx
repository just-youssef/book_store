"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookCardList = ({ data }) => {
    return (
      <div className='books_layout'>
        {data.map((book) => 
          <BookCard
            key={book._id}
            book={book}
          />
        )}
      </div>
    );
};
  
const SearchFeed = () => {
  const [allBooks, setAllBooks] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setAllBooks(data);
    };

    fetchAllBooks();
  }, []);

  const filterBooks = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allBooks.filter(
      (item) =>
        regex.test(item.owner.given_name) ||
        regex.test(item.owner.family_name) ||
        regex.test(item.title) ||
        regex.test(item.desc)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterBooks(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className='flex flex-col items-center gap-2 w-full'>
      <h1 className="text-6xl font-bold text-blue-700">Book Store</h1>
      <p className="text-gray-500">Helps you to find your book!</p>
      <input
        type='text'
        placeholder='Search for a book or an owner..'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_bar'
      />

      {/* All Prompts */
        searchText ?
        <BookCardList data={searchedResults} />
        :
        <BookCardList data={allBooks} />
      }
    </section>
  )
}

export default SearchFeed