"use client"; // Asegúrate de incluir esta directiva

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from 'next/link';
import { FcPlus } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



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
    <div className="mx-auto mt-8 h-full">
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
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Nombre</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Número</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Ciudad</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="hover:bg-gray-100" key={item.id}>
                <td className="border border-gray-400 px-2 py-0">{item.name}</td>
                <td className="border border-gray-400 px-2 py-0">{item.number}</td>
                <td className="border border-gray-400 px-2 py-0">{item.city}</td>
                <td className="border border-gray-400 px-2 py-0"><div className="flex justify-center gap-4"><a href="#" className="text-blue-900"><CiEdit /></a><a href="#" className="text-red-500 hover:text-red-700"><RiDeleteBinLine /></a></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="number" header="Número"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="city" header="Ciudad"></Column>
        <Column field="" header="Acciones"></Column>
      </DataTable>
    </div>
  );
};

export default Congregacion;


