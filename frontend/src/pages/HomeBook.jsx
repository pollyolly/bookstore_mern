import React, {useEffect, useState} from 'react'
import axios from "axios";
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import config from "../config"

function HomeBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    // const cancelToken = axios.CancelToken.source()
    // axios.get('http://localhost:8080/books/list', {cancelToken: cancelToken.token})
    setLoading(true)
    axios.get(`${config.apiUrl}/books/list`)
    .then((response)=>{
      setBooks(response.data.data)      
      // console.log(response.data);
      setLoading(false)
    }).catch((error)=>{
      // if(axios.isCancel(error)){
      //   console.log('cancelled');
      // }
      setLoading(false)
    });
    // return () => {
    //   cancelToken.cancel();
    // }
  },[]) //w/o dependency, this will re-render if state and props change
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/bookstore/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      { loading ? (
        <Spinner/> 
      ): (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Code</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>PublishYear</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((book, index) =>(
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.code}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                  {book.author}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                  {book.publishYear}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/bookstore/details/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/bookstore/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-800'/>
                      </Link>
                      <Link to={`/bookstore/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-800'/>
                      </Link>
                    </div>
                  </td>
                 </tr>
              ))
            }
          </tbody>
        </table>
      )
      }
        
    </div>
  )
}

export default HomeBook
