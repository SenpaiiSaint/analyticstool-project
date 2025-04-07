"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Chart from "../components/Chart";
import ReportTable from "../components/ReportTable";

interface Report {
  id: number;
  title: string;
  data: number[];
  userId?: string; 
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch reports only if user is signed in
  useEffect(() => {
    if (!session?.user) return;

    fetch("/api/reports")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Fetch error: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Report[]) => setReports(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [session]);

  // If no user session, prompt to sign in
  if (!session) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Please sign in to view the Dashboard.</p>
      </motion.div>
    );
  }

  // If there's an error, display it
  if (error) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-red-500">Error: {error}</p>
      </motion.div>
    );
  }

  // Otherwise, render the dashboard
  return (
    <motion.div
      className="p-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{report.title}</h2>
            {/* Example usage of Chart component */}
            <Chart data={report.data} />
          </div>
        ))
      )}
      {/* Example usage of ReportTable component */}
      <ReportTable reports={reports} />
    </motion.div>
  );
}
