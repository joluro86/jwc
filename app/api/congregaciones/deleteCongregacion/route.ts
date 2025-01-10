import { NextResponse } from "next/server";
import { db } from "../../../../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "El ID es obligatorio" }, { status: 400 });
    }

    const docRef = doc(db, "congregacion", id);
    await deleteDoc(docRef);

    return NextResponse.json(
      { message: `Documento con id ${id} eliminado exitosamente` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
    return NextResponse.json(
      { message: "Error al eliminar el documento" },
      { status: 500 }
    );
  }
}
