import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Balance" value="$12,500" color="bg-blue-600" />
        <StatCard title="Income" value="$4,200" color="bg-green-600" />
        <StatCard title="Expenses" value="$2,800" color="bg-red-600" />
      </div>

      {/* Placeholder for future widgets */}
      <p className="text-gray-600">More analytics and charts coming soon 📊</p>
    </div>
  );
}

export default Dashboard;
