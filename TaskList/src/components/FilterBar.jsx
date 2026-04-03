export default function FilterBar({ value, onChange }) {
    const options = ["Все", "Не начато", "В работе", "Выполнено"];

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                            value === option
                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
