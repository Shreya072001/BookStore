import BookShow from "./BookShow"
import { useContext } from "react"
import BooksContext from "../context/books"

function useBooksContext(){
  return useContext(BooksContext)
}

function BookList() {
  const { books } = useBooksContext()

  const renderedBooks = books.map((book) => {
    return <BookShow key={book.id} book={book} />
  })

  return <div className="book-list">{renderedBooks}</div>
}

export default BookList
