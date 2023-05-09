import { createContext, useState, useCallback } from "react"
import axios from "axios"

const BooksContext = createContext()

function Provider({ children }) {
  const [books, setBooks] = useState([])

  const fetchBooks = useCallback( async () => {
    const response = await axios.get("http://localhost:3001/books")
    setBooks(response.data)
  },[])

  const stableFetchBooks= useCallback(fetchBooks,[])

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    })
    const updatedBooks = books.map((book) => {
      if (book.id == id) {
        return { ...book, ...response.data }
      }
      return book
    })
    setBooks(updatedBooks)
  }

  const deleteBookById = async (id) => {
    const response = await axios.delete(`http://localhost:3001/books/${id}`)
    const updatedBooks = books.filter(
      (
        book //filter creates it's new array
      ) => {
        return book.id !== id //if returns false then it means that item is deleted
      }
    )
    setBooks(updatedBooks) //update state with new changes
  }

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    })
    const updatedBooks = [
      ...books, //storing previous data
      response.data,
    ]
    setBooks(updatedBooks) //update the state
  }
  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  }
  return (
    <BooksContext.Provider value={ valueToShare }>
      {children}
    </BooksContext.Provider>
  )
}
export { Provider }
export default BooksContext
