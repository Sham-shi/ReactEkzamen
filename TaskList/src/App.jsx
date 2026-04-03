import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import TaskForm from "./components/TaskForm";

function App() {
    const { tasks, loading, error, addTask, updateTask } = useTasks();
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("Все");
    const [editingTask, setEditingTask] = useState(null);

    const handleSelectTask = (task) => {
        setSelectedTask(task);
        setEditingTask(null);
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        }); // Прокрутка к форме
    };

    const handleFormSubmit = (taskData) => {
        if (editingTask) {
            updateTask(taskData);
            setSelectedTask(taskData); // Обновляем детали на экране
            setEditingTask(null);
        } else {
            addTask(taskData);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesFilter =
            filterStatus === "Все" || task.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Состояние: Загрузка
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                <p className="mt-3 text-gray-600 font-medium">
                    Загрузка задач...
                </p>
            </div>
        );
    }

    // Состояние: Ошибка
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm">
                    ⚠️ {error}
                </div>
            </div>
        );
    }

    // Состояние: Успешная загрузка
    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Список задач
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Управляйте задачами, просматривайте детали
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <section>
                        <h2 className="text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">
                            Поиск
                        </h2>
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </section>
                    <section>
                        <h2 className="text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">
                            Фильтр по статусу
                        </h2>
                        <FilterBar
                            value={filterStatus}
                            onChange={setFilterStatus}
                        />
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <section className="md:col-span-1">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Задачи ({filteredTasks.length})
                        </h2>

                        {filteredTasks.length === 0 ? (
                            <p className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
                                {searchQuery || filterStatus !== "Все"
                                    ? `🔍 По запросу «${searchQuery}» ничего не найдено`
                                    : "Задачи отсутствуют"}
                            </p>
                        ) : (
                            <TaskList
                                tasks={filteredTasks}
                                selectedId={selectedTask?.id}
                                onSelect={handleSelectTask}
                            />
                        )}
                    </section>

                    <section className="md:col-span-2">
                        <TaskDetails
                            task={selectedTask}
                            onEdit={handleEditClick}
                        />
                        <TaskForm
                            initialData={editingTask}
                            isEditing={!!editingTask}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setEditingTask(null)}
                        />
                    </section>
                </div>
            </div>
        </main>
    );
}

export default App;
