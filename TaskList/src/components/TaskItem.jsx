export default function TaskItem({ task, isSelected, onSelect }) {
    return (
        <li
            onClick={() => onSelect(task)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
        >
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-500 mt-1 truncate">
                {task.description}
            </p>
            <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
                    task.status === "Выполнено"
                        ? "bg-green-100 text-green-700"
                        : task.status === "В работе"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                }`}
            >
                {task.status}
            </span>
        </li>
    );
}
