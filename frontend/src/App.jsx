import React from 'react';
import {Routes, Route} from "react-router-dom";
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import ShowBook from './pages/ShowBook';
import DeleteBook from './pages/DeleteBook';
import HomeBook from './pages/HomeBook';

function App() {
  return (
    <Routes>
      <Route path='/bookstore' element={<HomeBook/>} />
      <Route path='/bookstore/create' element={<CreateBook />} />
      <Route path='/bookstore/edit/:id' element={<EditBook/>} />
      <Route path='/bookstore/details/:id' element={<ShowBook/>} />
      <Route path='/bookstore/delete/:id' element={<DeleteBook/>} />
    </Routes>
  )
}

export default App
