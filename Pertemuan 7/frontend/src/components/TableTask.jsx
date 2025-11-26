import { useEffect, useState } from 'react';
import Button from './common/Button';
import axios from 'axios';

export const TableTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8123');
                setTasks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        getTasks();
    }, []);

    const updateTask = async (taskId) => {
        try {
            const response = await fetch("http://localhost:8123", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: taskId }),
            });
            const data = await response.json();
            window.location.reload();
            console.log(data);

            setTasks((prevTasks) => 
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            )
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }

    const deleteTask = async (taskId) => {
        try{
            const response = await fetch("http://localhost:8123", {
                method: "DELETE",
                body: JSON.stringify({ id: taskId }),
            });
            const data = await response.json();
            console.log(data);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task:', error);
    
        }

    };

    return (
        <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
                <tr className="text-center">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Task</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Action</th>
                </tr>
            </thead> 
            <tbody>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <tr className="text-center" key={task.id}>
                            <td className="border px-4 py-2 border-slate-400">{task.id}</td>
                            <td className="border px-4 py-2 border-slate-400">{task.task}</td>
                            <td className="border px-4 py-2 border-slate-400">
                                {task.completed ? "Completed" : "Pending"}
                            </td>
                            <td className="flex gap-3 justify-center border border-slate-400 h-full">
                                <Button
                                    className={"bg-green-500 w-fit"}
                                    onClick={() => updateTask(task.id)}
                                >
                                    Complete
                                </Button>
                                <Button
                                    className={"bg-red-500 w-fit"}
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td 
                            className="border px-4 py-2" colSpan="4"
                        >
                            No tasks available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}