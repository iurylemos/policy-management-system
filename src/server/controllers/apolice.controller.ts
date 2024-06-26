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
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const apoliceId = typeof id === "string" ? parseInt(id, 10) : undefined;
    const body = await req.json();
    const { numero, valorPremio, segurado, coberturas } = body;

    if (!apoliceId || !numero || !valorPremio || !segurado || !coberturas) {
      return NextResponse.json({ error: "Missing required fields" });
    }

    const updatedApolice = await prisma.apolice.update({
      where: { id: apoliceId },
      data: {
        numero,
        valorPremio,
        segurado: {
          update: segurado,
        },
        coberturas: {
          deleteMany: {},
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

    return NextResponse.json(updatedApolice, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update apolice" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const apoliceId = typeof id === "string" ? parseInt(id, 10) : undefined;

    if (!apoliceId) {
      return NextResponse.json({ error: "Missing apolice ID" });
    }

    const deletedApolice = await prisma.apolice.delete({
      where: { id: apoliceId },
    });

    return NextResponse.json(deletedApolice, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to delete apolice" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
