import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Transaction {
  id: number;
  amount: number;
  type: "income" | "expense";
  category?: { id: number; name: string } | null;
  createdAt: string;
}

function Dashboard() {
  const { token, logout } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!token) return;
        const response = await api.get<Transaction[]>("/transactions");
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // --- Calculations ---
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // Chart data
  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [income, expenses],
        backgroundColor: ["#16a34a", "#dc2626"], // green & red
      },
    ],
  };

  return (
    <MainLayout onLogout={logout}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Balance" value={`$${balance}`} color="bg-blue-600" />
        <StatCard title="Income" value={`$${income}`} color="bg-green-600" />
        <StatCard title="Expenses" value={`$${expenses}`} color="bg-red-600" />
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
        <Bar data={chartData} />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-600">No transactions yet. Add one!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.slice(0, 5).map((tx) => (
              <li key={tx.id} className="flex justify-between py-2">
                <span>
                  {tx.category?.name || "Uncategorized"} -{" "}
                  {new Date(tx.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`font-medium ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
