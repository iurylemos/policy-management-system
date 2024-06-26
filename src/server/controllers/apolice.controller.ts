import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { numero, valorPremio, segurado, coberturas } = await req.json();

  // Ensure req.body is parsed correctly
  if (!numero || !valorPremio || !segurado || !coberturas) {
    return NextResponse.json({ error: "Missing required fields" });
  }

  try {
    const newApolice = await prisma.apolice.create({
      data: {
        numero,
        valorPremio,
        segurado: {
          create: segurado,
        },
        coberturas: {
          createMany: {
            data: coberturas,
          },
        },
      },
      include: {
        segurado: true,
        coberturas: true,
      },
    });

    return NextResponse.json(newApolice, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create apolice" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const apolices = await prisma.apolice.findMany({
      include: {
        segurado: true,
        coberturas: true,
      },
    });

    return NextResponse.json(apolices, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error to get data" }, { status: 500 });
  }
}
