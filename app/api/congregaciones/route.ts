import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig"; // Ajusta la ruta según tu estructura
import { collection, addDoc } from "firebase/firestore";


export async function POST(request: Request) {
  const body = await request.json();
  const { name, number, city } = body;

  if (!name || !number) {
    return NextResponse.json(
      { message: "Todos los campos son obligatorios." },
      { status: 400 }
    );
  }

  try {
    const congregacionRef = collection(db, "congregacion");
    const docRef = await addDoc(congregacionRef, { name, number, city });

    return NextResponse.json(
      { message: "Congregación creada con éxito.", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al agregar documento:", error);
    return NextResponse.json(
      { message: "Error al guardar la congregación." },
      { status: 500 }
    );
  }
}
