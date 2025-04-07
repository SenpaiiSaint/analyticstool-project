import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      include: { User: true },
    });
    return NextResponse.json(reports);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, data, userId } = await request.json();

    if (!title || !data || !userId) {
      return NextResponse.json(
        { error: "Missing fields (title, data, userId)" },
        { status: 400 }
      );
    }

    const newReport = await prisma.report.create({
      data: {
        title,
        data,
        userId,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create Report" },
      { status: 500 }
    );
  }
}
