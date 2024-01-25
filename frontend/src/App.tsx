import {useEffect, useState} from 'react'
import './App.css'
import {ViewAllBooks} from "./components/view-all-books.tsx";
import {EditBook} from "./components/edit-book.tsx";
import ViewBook from "./components/view-book.tsx";
import {Book} from "./types/Book.ts";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import AddNewBook from "./AddNewBook.tsx";
import NavBar from "./components/Navbar.tsx";
import NoPage from "./components/NoPage.tsx";
import Home from "./components/home.tsx";


function App() {

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        axios.get("/api/books").then(response => setBooks(response.data))
    }, [])

    const addBook =(bookToSave : Book)=>{
         setBooks([...books, bookToSave ])
         axios.post("/api/books", bookToSave).then(response => console.log(response.data))
    }

  const deleteBook = (id: string) => {
    axios.delete(`/api/books/${id}`)
        .then(response => {
          setBooks([...books.filter(book => id !== book.id)]);
          return console.log(response.data)
        })
  }

    const editBook = (book: Book): void => {
        axios.put(`/api/books/${book.id}`, book).then(response => setBooks(books.map((item) => (item.id === book.id ? response.data : book)))
        )
    }

    return (
        <><NavBar/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/list" element={<ViewAllBooks books={books}/>}/>
                <Route path="/books/:id" element={<ViewBook handleBookDelete={deleteBook}/>}/>
                <Route path="/books/:id/edit" element={<EditBook books={books} editBook={editBook}/>}/>
                <Route path={"/books/add"} element={<AddNewBook saveBook={addBook}/>}/>
                <Route path={"/*"} element={<NoPage/>}/>
            </Routes>
        </>
    )
}

export default App
