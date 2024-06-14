import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = () => {
    if(desc === ''||task==='') alert("Both feild Is required")
      else axios.post('http://localhost:3000/add', { task, desc })
    .then(result => {
      console.log(result);
      setTask('');  // Clear the task input field
      setDesc('');  // Clear the description input field
    })
    .catch(err => console.log(err));
    
  };

  return (
    <div className=' max-md:w-full max-md:px-10 w-1/2 flex flex-col justify-around items-center gap-3  mb-12'>
      
      <input 
        className=' max-sm:w-full bg-transparent border outline-none rounded-md px-4 py-1 w-1/2 text-white' 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder='Enter Your Task' 
        required
      />
      <input 
        className=' max-sm:pb-5 bg-transparent border outline-none rounded-md px-4 pt-2 pb-10 w-full  text-white' 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
        placeholder='Describe Your Task' 
        required
      />
     
      <button className=' max-sm:w-60 bg-blue-900 px-5 py-1 rounded-md' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
