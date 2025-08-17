import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//for cross origin resource sharing
app.use(cors({
    origin:'https://contank.netlify.app',
    credentials:true
}));

const PORT = process.env.PORT || 8000;
//allows server to understand json data sent from the client
app.use(express.json());
//for serving static files
app.use(express.static("public"));
//lets express read form data
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

//importing routes
import userRouter from './routes/user.route.js'
import noteRouter from './routes/note.route.js'

app.use('/api/v1/users',userRouter);
app.use('/api/v1/notes',noteRouter)

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// Catch-all for unmatched API routes
app.all('/api/{*splat}', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});
// Serve frontend in production

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get(/^\/(?!api).*/,(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server connected to port : ${PORT}`)
})