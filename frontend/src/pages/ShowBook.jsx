import React,{useEffect,  useState} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import config from "../config"

function ShowBook() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`${config.apiUrl}/books/find/${id}`)
    .then((response)=>{
      setLoading(false)
      setBooks(response.data.data[0]);
      // console.log(response.data.data[0]);
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
    })
  },[])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
          {
      loading ? (
        <Spinner/>
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{books._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Code</span>
            <span>{books.code}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{books.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{books.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>PublishYear</span>
            <span>{books.publishYear}</span>
          </div>
        </div>
       
      )
    }
    </div>
  )
}

export default ShowBook