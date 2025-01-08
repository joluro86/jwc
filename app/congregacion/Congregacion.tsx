"use client"; // Asegúrate de incluir esta directiva

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from 'next/link';
import { AiOutlinePlus } from "react-icons/ai"; 

const Congregacion: React.FC = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para obtener datos desde Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "congregacion"));
        const items = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
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

  return (
    <div>
      <div>
        <h1 className="text-center">Congregaciones creadas</h1>

        <Link
          href="/congregacion/create"
          className="px-3 py-2 rounded-md text-sm font-medium"
        >
          <AiOutlinePlus className="text-xl" />
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div >
        <table className="table-auto border-collapse border-2 border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Nombre</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Número</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="hover:bg-gray-100" key={item.id}>
                <td className="border border-gray-400 px-2 py-0">{item.name}</td>
                <td className="border border-gray-400 px-2 py-0">{item.number}</td>
                <td className="border border-gray-400 px-2 py-0"><a href="#">Editar - Eliminar</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Congregacion;


