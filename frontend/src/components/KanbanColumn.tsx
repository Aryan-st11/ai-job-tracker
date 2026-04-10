import ApplicationCard from "./ApplicationCard";

export default function KanbanColumn({ title, apps }: any) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl w-72">
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {apps.map((app: any) => (
          <ApplicationCard key={app._id} app={app} />
        ))}
      </div>
    </div>
  );
}