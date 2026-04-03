import { useState, useEffect } from "react";

export default function TaskForm({
    initialData,
    isEditing,
    onSubmit,
    onCancel,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Не начато");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Синхронизация полей при переключении на редактирование другой задачи
    useEffect(() => {
        if (isEditing && initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitle(initialData.title);
            setDescription(initialData.description);
            setStatus(initialData.status);
        } else {
            // Сброс при переходе в режим создания или отмене
            setTitle("");
            setDescription("");
            setStatus("Не начато");
        }
        setErrors({});
        setTouched({});
    }, [initialData, isEditing]);

    const validateField = (name, value) => {
        switch (name) {
            case "title":
                if (!value.trim()) return "Название обязательно для заполнения";
                if (value.trim().length < 3) return "Минимум 3 символа";
                break;
            case "description":
                if (value && value.trim().length < 5)
                    return "Описание слишком короткое (минимум 5 символов)";
                break;
            default:
                return null;
        }
        return null;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value) || "",
        }));
    };

    const handleChange = (name, value) => {
        if (name === "title") setTitle(value);
        if (name === "description") setDescription(value);
        if (name === "status") setStatus(value);

        if (touched[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, value) || "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        const titleError = validateField("title", title);
        const descError = validateField("description", description);

        if (titleError) newErrors.title = titleError;
        if (descError) newErrors.description = descError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched({ title: true, description: true });
            return;
        }

        const taskPayload = {
            ...(isEditing && initialData ? { id: initialData.id } : {}),
            title: title.trim(),
            description: description.trim() || "Без описания",
            status,
            category: initialData?.category || "Общее",
        };

        onSubmit(taskPayload);

        // При создании очищаем форму сразу. При редактировании закрываем режим.
        if (!isEditing) {
            setTitle("");
            setDescription("");
            setStatus("Не начато");
            setErrors({});
            setTouched({});
        }
        if (onCancel) onCancel();
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            noValidate
        >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {isEditing ? "✏️ Редактировать задачу" : "➕ Добавить задачу"}
            </h3>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="task-title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Название *
                    </label>
                    <input
                        id="task-title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            errors.title && touched.title
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                        }`}
                        placeholder="Например: Подготовить отчет"
                    />
                    {errors.title && touched.title && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="task-desc"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Описание
                    </label>
                    <textarea
                        id="task-desc"
                        name="description"
                        value={description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                        onBlur={handleBlur}
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            errors.description && touched.description
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                        }`}
                        placeholder="Краткое описание задачи"
                    />
                    {errors.description && touched.description && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.description}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="task-status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Статус
                    </label>
                    <select
                        id="task-status"
                        name="status"
                        value={status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="Не начато">Не начато</option>
                        <option value="В работе">В работе</option>
                        <option value="Выполнено">Выполнено</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isEditing ? "Сохранить изменения" : "Создать задачу"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Отмена
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
