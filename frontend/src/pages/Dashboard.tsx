import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import AddApplicationModal from "../components/AddApplicationModal";

export default function Dashboard() {
  const [apps, setApps] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = ["Applied", "Interview", "Offer", "Rejected"];

  const fetchApps = async () => {
    try {
      const res = await API.get("/applications");
      setApps(res.data);
    } catch (err) {
      console.error("Error fetching apps", err);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // 🚀 FIXED DRAG LOGIC
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    // 🔥 optimistic update (instant UI)
    const updatedApps = apps.map((app) =>
      String(app._id) === draggableId
        ? { ...app, status: newStatus }
        : app
    );

    setApps(updatedApps);

    try {
      await API.put(`/applications/${draggableId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Drag update failed", err);
      fetchApps(); // rollback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      <Navbar onAdd={() => setIsModalOpen(true)} />

      <div className="p-6">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Job Tracker Dashboard
          </h1>
          <p className="text-gray-500">
            Track your applications like a pro 
          </p>
        </div>

        <input
          placeholder="Search company or role..."
          className="w-full p-3 mb-4 rounded-xl border focus:ring-2 focus:ring-blue-400"
        />

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {columns.map((col) => (
            <div
              key={col}
              className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow border"
            >
              <p className="text-sm text-gray-500">{col}</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {apps.filter((a) => a.status === col).length}
              </h2>
            </div>
          ))}
        </div>

        {/* BOARD */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6 items-start">

            {columns.map((col) => {
              const filteredApps = apps.filter((a) => a.status === col);

              return (
                <Droppable droppableId={col} key={col}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-white/60 backdrop-blur-xl border border-gray-200 shadow-xl p-4 rounded-3xl w-80 min-w-[320px] flex flex-col max-h-[75vh] min-h-[200px]"
                    >
                      {/* HEADER */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-700 text-lg">
                          {col}
                        </h2>

                        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                          {filteredApps.length}
                        </span>
                      </div>

                      {/* CARDS */}
                      <div className="space-y-3 overflow-y-auto pr-1 min-h-[100px]">

                        {filteredApps.length === 0 && (
                          <div className="text-center mt-10">
                            <p className="text-4xl">📭</p>
                            <p className="text-gray-400 mt-2">
                              No applications yet
                            </p>
                          </div>
                        )}

                        {filteredApps.map((app, index) => {
                          const statusColors: any = {
                            Applied: "bg-blue-100 text-blue-600",
                            Interview: "bg-yellow-100 text-yellow-600",
                            Offer: "bg-green-100 text-green-600",
                            Rejected: "bg-red-100 text-red-600",
                          };

                          return (
                            <Draggable
                              key={app._id}
                              draggableId={String(app._id)} // 🔥 FIX
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                  className={`p-4 rounded-2xl border bg-white transition-all cursor-grab
                                  ${
                                    snapshot.isDragging
                                      ? "shadow-2xl scale-105 rotate-1"
                                      : "shadow hover:shadow-lg hover:-translate-y-1"
                                  }`}
                                >
                                  <h3 className="font-semibold text-gray-900 text-lg">
                                    {app.company}
                                  </h3>

                                  <p className="text-sm text-gray-500 italic">
                                    {app.role}
                                  </p>

                                  <div className="mt-3 flex justify-between items-center">
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${statusColors[app.status]}`}
                                    >
                                      {app.status}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                      • just now
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}

          </div>
        </DragDropContext>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition text-xl"
      >
        +
      </button>

      {isModalOpen && (
        <AddApplicationModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchApps}
        />
      )}
    </div>
  );
}