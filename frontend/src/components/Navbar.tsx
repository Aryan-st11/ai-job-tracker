export default function Navbar({ onAdd }: any) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">

      <h1 className="text-xl font-bold text-gray-800">
        🚀 JobTracker
      </h1>

      <div className="flex gap-3">
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}