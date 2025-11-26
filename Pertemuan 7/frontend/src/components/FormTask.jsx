import { useState } from "react";
import Button from "./common/Button";

export const FormTask = () => {
    const [task, setTask] = useState({
        title: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!task.title) {
            setError("Title is required");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8123",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: task.title })
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const data = await response.json();
            window.location.reload();
            console.log(data);

            setTask({ title: ""});
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong while adding the task");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleAddTask}
            id="createTaskForm"
            className="mb-4 flex gap-3 items-center"
        >
            <input
                className="p-2 border-2 border-gray-400 rounded-lg flex-grow"
                type="text"
                id="taskInput"
                placeholder="Enter new task"
                onChange={(e) => setTask({title: e.target.value})}
                required
            />

            <Button
                className="bg-blue-500 text-white p-2 w-32 rounded-md"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Adding..." : "Add Task"}
            </Button>

            {/* Menampilkan error jika ada */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    )
};


