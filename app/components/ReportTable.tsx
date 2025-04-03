"use client";

interface Report {
    id: number;
    title: string;
    data: number[];
}

interface ReportTableProps {
    reports: Report[];
}

export default function ReportTable({ reports }: ReportTableProps) {
    return (
        <div className="overflow-x-auto mt-8">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{report.id}</td>
                            <td className="py-2 px-4 border">{report.title}</td>
                            <td className="py-2 px-4 border">{report.data.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}