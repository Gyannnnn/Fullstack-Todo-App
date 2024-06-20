import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';
import './Home.css';
import { RiDeleteBin3Line } from "react-icons/ri";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://todo-app-api-two.vercel.app/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }); 

  const handleDelete = (id) => {
    axios.delete(`https://todo-app-api-two.vercel.app/delete/${id}`) 
    .then(result => {
      console.log(result);
      setTodos(todos.filter(todo => todo._id !== id)); 
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <div className="home">
      <h1 className='text-2xl pb-10' >Enter Your Task</h1>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2 className='text-blue-300'>No Todos</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div className='max-md:w-screen max-md:px-5 border  flex justify-between items-center w-1/2 mb-2 rounded-md px-2 py-2' key={index}>
            <div className='flex flex-col gap-1'>
              <h3>{todo.task}</h3>
              <h3 className='text-cyan-400'>{todo.desc}</h3>
            </div>
            <RiDeleteBin3Line
              onClick={() => handleDelete(todo._id)}
              className='text-2xl items-center hover:text-red-600 cursor-pointer'
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
