"use client"; // Asegúrate de incluir esta directiva

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs} from "firebase/firestore";
import Link from 'next/link';
import { FcPlus } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface Item {
  id: string;
  number: string;
  name: string;
  city: string;
}

const Congregacion: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEdit = (item: any) => {
    // Redirige a la página de edición con el ID de la congregación
    router.push(`/api/congregacion/edit/${item.id}`);
  };

  useEffect(() => {
    // Función para obtener datos desde Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "congregacion"));
        const items: Item[] = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            number: docData.number || 0, // Valor por defecto si no existe en Firestore
            name: docData.name || "Unknown", // Valor por defecto si no existe
            city: docData.city || "Unknown", // Valor por defecto si no existe
          };
        });
        setData(items);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError(
          "No se pudo obtener los datos. Revisa la consola para más detalles."
        );
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const response = await fetch("/api/congregaciones/deleteCongregacion", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error("No se pudo eliminar el documento.");
      }
  
      // Actualizar la lista localmente
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      console.log(`Documento con id ${id} eliminado exitosamente`);
    } catch (err) {
      console.error(`Error al eliminar el documento con id ${id}:`, err);
    }
  };

   
  return (
    <div className="mx-auto mt-8 h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center align-items-center gap-4 border-solid border-b-2 border-sky-600 mb-4 pb-1">
        <h1 className="">Congregaciones registradas</h1>

        <Link
          href="/congregacion/create"
          className="rounded-full"
        >
          <FcPlus className="text-xl" />
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="">
        <table className="table-fixed bg-white text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Nombre</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Número</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Ciudad</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                <td className="border border-gray-400 px-2 py-0">{item.name}</td>
                <td className="border border-gray-400 px-2 py-0">{item.number}</td>
                <td className="border border-gray-400 px-2 py-0">{item.city}</td>
                <td className="border border-gray-400 px-2 py-0"><div className="flex justify-center gap-4"><a href="#" className="text-blue-900" onClick={() => handleEdit(item)}><CiEdit /></a><a href="#" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}><RiDeleteBinLine /></a></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Congregacion;


