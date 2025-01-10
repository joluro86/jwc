"use client";

import { useState } from "react";

const CreateCongregacion = () => {
  const [formData, setFormData] = useState({ name: "", number: "", city:"" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/congregaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Congregación creada con nombre: ${data.name} y número ${data.number}`);
        setFormData({ name: "", number: "", city:"" });
      } else {
        const errorData = await response.json();
        setMessage(`Error-1: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 mx-auto block max-w-sm p-6 bg-blue-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-xl text-center font-bold mb-4">Crear Congregación</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="number" className="block font-medium">
            Número
          </label>
          <input
            type="numero"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="city" className="block font-medium">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}
    </div>
  );
};

export default CreateCongregacion;
