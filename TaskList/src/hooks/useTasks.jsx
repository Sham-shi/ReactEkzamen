import { useState, useEffect } from "react";
import { initialTasks } from "../data/tasks";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Имитация асинхронной загрузки
        const timer = setTimeout(() => {
            try {
                setTasks(initialTasks);
                setLoading(false);
            } catch {
                setError("Не удалось загрузить данные. Попробуйте позже.");
                setLoading(false);
            }
        }, 1500); // 1.5 сек задержки для демонстрации индикатора

        return () => clearTimeout(timer);
    }, []);

    const addTask = (newTask) => {
        setTasks((prev) => {
            const maxId =
                prev.length > 0 ? Math.max(...prev.map((t) => t.id)) : 0;
            return [...prev, { ...newTask, id: maxId + 1 }];
        });
    };

    const updateTask = (updatedTask) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === updatedTask.id ? { ...t, ...updatedTask } : t,
            ),
        );
    };

    return { tasks, loading, error, addTask, updateTask };
}
