import { useContext, useState } from "react"
import BooksContext from "../context/books"

function BookCreate() {
  const [title, setTitle] = useState("")
  const {createBook} = useContext(BooksContext)
  const handleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault() //to prevent the actual behaviour
    createBook(title) //on create title on input box
    setTitle('') // to empty the input box
  }
  return (
    <div className="book-create">
      <form onSubmit={handleSubmit}>
        <label>Type here!</label>
        <input className="input" value={title} onChange={handleChange} />
        <button className="button">Create!</button>
      </form>
    </div>
  )
}
export default BookCreate
