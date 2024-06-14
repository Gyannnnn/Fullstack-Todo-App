const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const TodoModel = require('./models/todos');

app.use(express.json());
app.use(cors(
    {
        origin: ["https://mern-stack-todoapp.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

mongoose.connect("mongodb+srv://higyanaranjanpatra:X2u25J89nT27KUhq@cluster0.o6iabhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Mongodb Connected Successfully"))
.catch(err => console.log(err));

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
app.delete("/delete/:id",(req,res)=>{
  const {id} =req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

app.listen(3000, () => {
  console.log("Server Is Running");
});
