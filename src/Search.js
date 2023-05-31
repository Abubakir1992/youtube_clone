import React, { useRef, useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const ref = useRef();

  const handleChange = (event) => {
    setSearch(ref.current.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(search);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input placeholder="Search..." type="text" value={search} onChange={handleChange} ref={ref} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
