import React, {useState, useEffect, useRef} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from "../config"

function EditBook() {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=>{
      axios.get(`${config.apiUrl}/books/find/${id}`)
      .then((response)=>{
        // console.log(response.data);
        setCode(response.data.data[0].code)
        setTitle(response.data.data[0].title)
        setAuthor(response.data.data[0].author)
        setPublishYear(response.data.data[0].publishYear)
      }).catch((error)=>{
        console.log(error.message);
      })
    },[])
    const data = {
        id, code, title, author, publishYear
    }
    const handleEditBook = () =>{
      // console.log(data);
        setLoading(true)
        axios.put(`${config.apiUrl}/books/update`, data)
        .then((response)=>{
            setLoading(false)
            navigate('/books')
        }).catch((error)=>{
            setLoading(false)
            console.log(error.message);
        })
    }


  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Edit Book</h1>
        {
            loading ? (
                <Spinner/>
            ): ''
        }
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Code</label>
                <input 
                    type='text'
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Title</label>
                <input 
                    type='text'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Author</label>
                <input 
                    type='text'
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
                <input 
                    type='text'
                    value={publishYear}
                    onChange={(e)=> setPublishYear(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
        </div>
    </div>
  )
}

export default EditBook