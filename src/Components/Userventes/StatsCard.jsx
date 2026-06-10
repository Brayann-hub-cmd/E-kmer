export default function StatsCard({ title, value }) {
  return (
    <div>
      <p className="text-sm opacity-90">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}