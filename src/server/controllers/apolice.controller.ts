import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Cobertura } from "@/src/shared/interfaces/apolice.interface";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("req.json()", body);
  const { numero, valorPremio, segurado, coberturas } = body;

  // Ensure req.body is parsed correctly
  if (!numero || !valorPremio || !segurado || !coberturas) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 404 }
    );
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
    console.log("error", error);
    return NextResponse.json(
      { error: "Unable to create apolice" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const pageParam = req.nextUrl.searchParams.get("page") || "1";
    const pageSizeParam = req.nextUrl.searchParams.get("pageSize") || "10";

    const page = Number(pageParam);
    const pageSize = Number(pageSizeParam);
    const skip = (page - 1) * pageSize;

    const idParams = req.nextUrl.searchParams.get("id");
    if (idParams) {
      const apolice = await prisma.apolice.findUnique({
        where: {
          id: Number(idParams),
        },
        include: {
          coberturas: true,
          segurado: true,
        },
      });

      return NextResponse.json(apolice, { status: 200 });
    }

    const [totalItems, apolices] = await prisma.$transaction([
      prisma.apolice.count(),
      prisma.apolice.findMany({
        include: {
          segurado: true,
          coberturas: true,
        },
        skip,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json(
      {
        content: apolices,
        page,
        totalItens: totalItems,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Error to get data" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") || null;

    if (!id) return NextResponse.json({ error: "ID does not found" });

    const apoliceId = typeof id === "string" ? parseInt(id, 10) : undefined;
    const body = await req.json();
    const { numero, valorPremio, segurado, coberturas } = body;

    if (
      !apoliceId ||
      !numero ||
      !valorPremio ||
      !segurado ||
      !coberturas ||
      !Array.isArray(coberturas)
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 404 }
      );
    }

    // ensure insert the data right
    const coverages: Cobertura[] = coberturas.map((it: Cobertura) => ({
      nome: it.nome,
      valor: it.valor,
    }));

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
            data: coverages,
          },
        },
      },
      include: {
        segurado: true,
        coberturas: true,
      },
    });

    return NextResponse.json(updatedApolice, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update apolice" },
      { status: 500 }
    );
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
  }
}
