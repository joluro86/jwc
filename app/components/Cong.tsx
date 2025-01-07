"use client"; // Asegúrate de incluir esta directiva

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Cong: React.FC = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para obtener datos desde Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "congregacion"));
        const items = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          console.log("Documento obtenido:", doc.id, docData); // Log para depuración
          return {
            id: doc.id,
            ...docData,
          };
        });
        setData(items);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError("No se pudo obtener los datos. Revisa la consola para más detalles.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Datos desde Firebase</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cong;
