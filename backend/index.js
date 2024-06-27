import express from "express";
import config from "./config.js";
import mongoose from "mongoose";
// import sanitize from "mongo-sanitize";
import mongoSanitize from "express-mongo-sanitize";
// import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());  //allow json data
app.use(mongoSanitize()); //sanitize all inputs 

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial')
})

app.use('/books',booksRoute);

mongoose.connect(config.mongodburl).then(()=>{
    console.log('App connected to database');
    app.listen(config.port, ()=>{
        console.log(`App is listening to port: ${config.port}`);
    })
}).catch((error)=>{
    console.log(error);
})


//Global Http Error Handlers (Always at the bottom)
//404 and 500
app.use((req, res, next) => {
    res.status(404).send({message: "Sorry Not Found!"})
})
app.use((err, req, res, next) => {
    res.status(500).send({message: 'Something is broken!'})
})

