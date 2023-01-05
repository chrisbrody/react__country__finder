import { useState, useRef } from "react"

const SearchInput = ({ onSearch }) => {
  const formRef = useRef(null)

  const [input, setInput] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();

    onSearch(input)
  }
  
  return (
    <form onSubmit={submitHandler} id="searchForm" ref={formRef}>
      <input id="searchInput" type="text" placeholder="Search a country..." value={input} onChange={(e) => setInput(e.target.value)}  />
      <button className="ml-1" onClick={submitHandler}>Search</button>
    </form>
  )
}

export default SearchInput
