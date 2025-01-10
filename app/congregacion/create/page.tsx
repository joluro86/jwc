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
    <div className="mt-8 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-xl font-medium text-gray-900 dark:text-white">Crear Congregación</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Número
          </label>
          <input
            type="numero"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
