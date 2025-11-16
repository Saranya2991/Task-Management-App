import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"


function Dashboard(){
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");


useEffect(() => {
const stored = JSON.parse(localStorage.getItem("tasks")) || [];
setTasks(stored);
}, []);

const handleDelete = (index) => {
const updated = tasks.filter((_, i) => i !== index);
setTasks(updated);
localStorage.setItem("tasks", JSON.stringify(updated));
};


const filtered = tasks.filter(task => {
const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
task.description.toLowerCase().includes(search.toLowerCase());

if (!matchesSearch) return false;

if (filter === "all") {
return true;
} else if (filter === "completed") {
return task.status === "completed";
} else if (filter === "pending") {
return task.status === "pending";
} else if (filter === "none") {
return false;
}
return true;
});


    return(
        <>
        <div className="mx-auto max-w-2xl shadow-md">
        <div className="flex justify-between p-8 mx-auto max-w-2xl mt-10 bg-blue-50">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            
            <button className='p-2 bg-blue-500 text-white px-4 py-2 ml-48 rounded-3xl' onClick={() => navigate('/CreateNew')}>Create New</button>
            
        </div>
        <div className="flex justify-between p-2 mx-auto max-w-2xl">
           <input className="border p-2 rounded-lg w-72" type="text" placeholder="Search"
           value={search}
            onChange={(e) => setSearch(e.target.value)}></input>
           <select className="border p-2 rounded-lg w-72" type="text" placeholder="Filter"
           value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="none">None</option>
           </select>
        </div>
        <table className='w-full border mt-6'>
            <thead>
                <tr className='bg-gray-100'>
                    <th className='border p-2'>Title</th>
                    <th className='border p-2'>Description</th>
                    <th className='border p-2'>Status</th>
                     <th className='border p-2 text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
            
                    {filtered.map((task, idx) => {
                    const actualIndex = tasks.indexOf(task);
                    return (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3">{task.title}</td>
                        <td className="p-3">{task.description}</td>
                        <td className="p-3 capitalize">{task.status}</td>
                        <td className="p-3 flex gap-4 justify-center">
                        <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => navigate(`/EditPage/${actualIndex}`)}
                            >Edit</button>
                            <button
                            className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleDelete(actualIndex)}
                            >Delete</button>
                        </td>
                    </tr>
                    );
                    })}
                    {filtered.length === 0 && (
                    <tr>
                    <td className="p-3" colSpan="4">No tasks found.</td>
                    </tr>
                    )}

            </tbody>
        </table>
        </div>
        </>
    )
}

export default Dashboard