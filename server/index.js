const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const TodoModel = require('./models/todos');

app.use(express.json());
app.use(cors({
    origin: ["https://mern-stack-todoapp.vercel.app"],
    methods: ["POST", "GET", "DELETE"], 
    credentials: true 
}));

// const corsOptions = {
//   origin: 'https://mern-stack-todoapp.vercel.app', // Update with your frontend URL
//   methods: 'GET,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// };

// app.use(cors(corsOptions));


mongoose.connect("mongodb+srv://higyanaranjanpatra:X2u25J89nT27KUhq@cluster0.o6iabhd.mongodb.net/todoapp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Mongodb Connected Successfully"))
.catch(err => console.log(err));
app.get('/',(req,res)=>{
  res.send("Hellow")
})

app.post('/add', (req, res) => {
  const { task, desc } = req.body;
  TodoModel.create({ task, desc })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});
// app.post('/delete',(req,res)=>{
//   const {id} = req.body;
//   TodoModel.findByIdAndDelete(id)
//   .then(result => res.json(result))
//   .catch(err => res.json(err));
// })
const handleDelete = (id) => {
  axios.delete(`https://todo-app-api-two.vercel.app/delete/${id}`) // Add slash before id
  .then(result => {
    console.log(result);
    setTodos(todos.filter(todo => todo._id !== id)); // Remove the deleted item from state
  })
  .catch(err => {
    console.log(err);
  })
}


app.listen(3000, () => {
  console.log("Server Is Running");
});
