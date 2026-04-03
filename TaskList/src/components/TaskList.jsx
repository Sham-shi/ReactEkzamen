import TaskItem from "./TaskItem";

export default function TaskList({ tasks, selectedId, onSelect }) {
    if (tasks.length === 0) {
        return (
            <p className="text-gray-500 text-center py-8">Задачи не найдены</p>
        );
    }

    return (
        <ul className="space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isSelected={task.id === selectedId}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    );
}
