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
      <Route path='/books' element={<HomeBook/>} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/edit/:id' element={<EditBook/>} />
      <Route path='/books/details/:id' element={<ShowBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />
    </Routes>
  )
}

export default App