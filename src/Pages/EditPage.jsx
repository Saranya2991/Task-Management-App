import {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"

function EditPage(){
    const navigate = useNavigate();
const { id } = useParams();
const index = parseInt(id, 10);


const stored = JSON.parse(localStorage.getItem("tasks")) || [];
const task = stored[index] || {};


const [title, setTitle] = useState(task.title || "");
const [description, setDescription] = useState(task.description || "");
const [status, setStatus] = useState(task.status || "pending");


const handleUpdate = () => {
const updated = [...stored];
updated[index] = { title, description, status };
localStorage.setItem("tasks", JSON.stringify(updated));
navigate('/Dashboard');
};

    return(
        <>
        <div className="mx-auto max-w-2xl shadow-md mt-10 p-10">
            <h1 className='text-2xl font-bold text-center  bg-blue-50 p-3'>Edit Page</h1>
        
            <form className='border rounded-lg p-6 mt-10'>
                <label>Title</label>
                <input className='w-full p-2 border rounded mb-4' type='text' placeholder='Title' required
                value={title}
                onChange={(e) => setTitle(e.target.value)}></input><br></br>
                <label>Description</label>
                <input className='w-full p-2 border rounded mb-4' type='text' placeholder='Enter a Description' required
                value={description}
                onChange={(e) => setDescription(e.target.value)}></input><br></br>
                 <label>Status</label>
                 <select className='w-full p-2 border rounded mb-4' placeholder="None" required
                 value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                     <option value="pending">Pending</option>
        <option value="completed">Completed</option>
                    
                 </select><br></br>
                 <div className='flex justify-between'>
                 <button className='p-2 bg-blue-500 text-white px-4 py-2 rounded' type ="submit" 
                 onClick={handleUpdate}>Update Task
                </button>
                
                </div>
            </form>
        </div>
        </>
    );

}

export default EditPage