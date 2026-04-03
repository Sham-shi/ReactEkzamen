export default function TaskDetails({ task, onEdit }) {
    if (!task) {
        return (
            <div className="p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-500 text-lg">
                    👈 Выберите задачу из списка, чтобы увидеть подробности
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    {task.title}
                </h2>
                {onEdit && (
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                        ✏️ Редактировать
                    </button>
                )}
            </div>

            <div className="space-y-3 text-gray-700">
                <p>
                    <span className="font-medium text-gray-500">Описание:</span>{" "}
                    {task.description}
                </p>
                <p>
                    <span className="font-medium text-gray-500">Статус:</span>
                    <span
                        className={`ml-2 text-xs px-2 py-1 rounded-full ${
                            task.status === "Выполнено"
                                ? "bg-green-100 text-green-700"
                                : task.status === "В работе"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {task.status}
                    </span>
                </p>
                <p>
                    <span className="font-medium text-gray-500">
                        Категория:
                    </span>{" "}
                    {task.category}
                </p>
                <p>
                    <span className="font-medium text-gray-500">ID:</span>#
                    {task.id}
                </p>
            </div>
        </div>
    );
}
