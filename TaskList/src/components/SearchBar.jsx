export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative mb-6">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Поиск по названию задачи..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
                aria-label="Поиск задач"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                🔍
            </div>
        </div>
    );
}
