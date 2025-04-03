"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Chart from "../components/Chart";
import ReportTable from "../components/ReportTable";

interface Report {
    id: number;
    title: string;
    data: number[];
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetch("/api/reports")
        .then((res) => res.json())
        .then((data) => setReports(data));
    }, []);

    if (!session) {
        return (
            <motion.div
                className="min-h-screen flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <p>Please sign in to view the Dashboard</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="p-8 bg-gray-50 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {reports.map((report) => (
                <div key={report.id} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{report.title}</h2>
                    <Chart data={report.data} />
                </div>
            ))}
            <ReportTable reports={reports} />
        </motion.div>
    );
}