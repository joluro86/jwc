"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    city: "",
  });

  useEffect(() => {
    // Cargar los datos de la congregación para editar
    const fetchCongregation = async () => {
      try {
        const response = await fetch(`/api/congregaciones/editCongregacion?id=${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchCongregation();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/congregaciones/editCongregacion`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id }),
      });

      if (response.ok) {
        alert("Datos actualizados con éxito");
        router.push("/congregacion");
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2 w-full"
      />
      <input
        name="number"
        value={formData.number}
        onChange={handleChange}
        placeholder="Número"
        className="border p-2 w-full"
      />
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Ciudad"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
};

export default EditPage;
