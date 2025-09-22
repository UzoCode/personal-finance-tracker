type StatCardProps = {
  title: string;
  value: string;
  color: string;
};

function StatCard({ title, value, color }: StatCardProps) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md text-white ${color} flex flex-col`}
    >
      <span className="text-sm uppercase font-medium opacity-80">
        {title}
      </span>
      <span className="text-2xl font-bold mt-2">{value}</span>
    </div>
  );
}

export default StatCard;
