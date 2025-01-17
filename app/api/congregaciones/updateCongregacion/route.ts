import { NextResponse } from "next/server";

// Simulación de base de datos (puedes reemplazarlo con tu lógica real)
let congregaciones = [
  { id: "1", name: "Congregación 1", number: "001", city: "Ciudad 1" },
  { id: "2", name: "Congregación 2", number: "002", city: "Ciudad 2" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const congregation = congregaciones.find((c) => c.id === id);

  if (!congregation) {
    return NextResponse.json({ error: "Congregación no encontrada" }, { status: 404 });
  }

  return NextResponse.json(congregation);
}

export async function PUT(request: Request) {
  const updatedData = await request.json();
  const index = congregaciones.findIndex((c) => c.id === updatedData.id);

  if (index === -1) {
    return NextResponse.json({ error: "Congregación no encontrada" }, { status: 404 });
  }

  // Actualizar los datos
  congregaciones[index] = { ...congregaciones[index], ...updatedData };

  return NextResponse.json({ message: "Congregación actualizada con éxito" });
}
