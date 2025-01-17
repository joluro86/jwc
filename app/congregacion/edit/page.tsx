import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditPage = () => {
  const router = useRouter();
  const { id, data } = router.query;

  const [item, setItem] = useState<{
    id: string;
    name: string;
    number: string;
    city: string;
  } | null>(null);

  useEffect(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data as string); // Parseamos los datos
        setItem(parsedData);
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    }
  }, [data]);

  if (!item) {
    return <div>Cargando...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    console.log("Datos actualizados:", item);
    // Aquí puedes agregar la lógica para guardar los datos en el backend
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Editar Congregación</h2>
      <form>
        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Número:
          <input
            type="text"
            name="number"
            value={item.number}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Ciudad:
          <input
            type="text"
            name="city"
            value={item.city}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditPage;
