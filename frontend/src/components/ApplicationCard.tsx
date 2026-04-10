export default function ApplicationCard({ app }: any) {
  return (
    <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
      <h3 className="font-semibold">{app.company}</h3>
      <p className="text-sm text-gray-500">{app.role}</p>
    </div>
  );
}