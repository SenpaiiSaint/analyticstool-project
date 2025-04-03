import { NextResponse } from "next/server";
import reports from "@/data/simulatedReports.json";

export async function GET() {
    return NextResponse.json(reports);
}
