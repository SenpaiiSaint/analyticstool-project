"use client";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface ChartProps {
    data: number[];
}

export default function Chart({ data }: ChartProps) {
    const chartData = {
        labels: data.map((_, i) => `Point ${i + 1}`),
        datasets: [
            {
                label: "Dataset",
                data,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <Line data={chartData} />
        </div>
    );
}