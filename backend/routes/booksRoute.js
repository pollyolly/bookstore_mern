import express from "express";
import mongoose from "mongoose"
import { Book } from "../models/bookModel.js"

const route = express.Router();

//save books
route.post('/create', async (request, response) => {
    try {
    // const { title, author, publishYear } = request.body; //undefined
    const code = request.body.code;
    const title = request.body.title;
    const author = request.body.author;
    const publishYear = request.body.publishYear;
   
        if( !code || !title || !author || !publishYear ) {
            response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        // .create([{},{}]) //multiple insert
        const book = await Book.create({
            code: code,
            title: title,
            author: author,
            publishYear: publishYear
        })
        response.status(200).send(book);
    } catch(err) {
        console.log(err);
        response.status(500).send({message: err.message })
    }
    // return response.status(200).send('Successfully saved!')
})

route.get('/list', async(request, response)=>{
  try {
        const books = await Book.find();
        response.status(200).json({
        count: books.length,
        data: books
    });
    } catch(err){
        console.log(err.message);
        response.status(500).send({message: err.message})
}
})

route.get('/find/:id', async (request, response) => {
    try {
        // const title = sanitize(request.params.title);
        const _id = request.params.id;
        const books = await Book.find({"_id":_id});
        response.status(200).json({
            count: books.length,
            data: books
        })
    } catch(err) {
        response.status(500).send({message: err.message})
    }
})

route.put('/update', async (request, response)=>{
    try {
        const id = request.body.id; //666815defe3227ef7259c522
        const _id = new mongoose.Types.ObjectId(id);
        const code = request.body.code;
        const title = request.body.title;
        const author = request.body.author;
        const publishYear = request.body.publishYear;
        if(!_id || !code || !title || !author || !publishYear){
            response.status(400).send('Send all required fields: _id, code, title, author, publishYear');
        }
        const books = await Book.updateOne({ "_id": _id }, [
            {
                $set: { "code":code, "title":title, "author": author, "publishYear": publishYear }
            }
        ]);
        response.status(200).send(books);
    } catch(err) {
        response.status(500).send({message: err.message});
    }
})

route.post('/delete', async (request, response) =>{
    try {
        const id = request.body.id;
        const _id = new mongoose.Types.ObjectId(id);
        const books = await Book.deleteOne({"_id": _id})
        response.status(200).send(books)
    } 
    catch(error) {
        response.status(500).send({message: error.message})
    }
})

export default route