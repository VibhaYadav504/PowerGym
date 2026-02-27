
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCarousels, deleteCarousel } from "../../Service/carouselService";

const CarouselTable = () => {
  const navigate = useNavigate();
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      const data = await getCarousels();
      setCarousels(data);
    } catch (err) {
      console.error("Error fetching carousels:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this carousel?")) {
      try {
        await deleteCarousel(id);
        fetchCarousels();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-carousel/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold">Carousels</h2>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => navigate("/carousel-form")}
        >
          + Add Carousel
        </button>
      </div>

      <table className="w-full text-left border-collapse bg-gray-900 text-white">
        <thead>
          <tr className="border-b-2 border-red-600">
            <th className="p-3">Photo</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {carousels.map((carousel) => (
            <tr key={carousel._id} className="border-b border-gray-700">
              <td className="p-3">
                <img
                  src={carousel.photo}
                  alt="carousel"
                  className="w-24 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded font-bold ${
                    carousel.status === "Published"
                      ? "bg-red-600"
                      : "bg-gray-600"
                  }`}
                >
                  {carousel.status}
                </span>
              </td>
              <td className="p-3">
                <button
                  className="bg-red-600 px-2 py-1 rounded mr-2 hover:bg-red-700"
                  onClick={() => handleEdit(carousel._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700"
                  onClick={() => handleDelete(carousel._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const styles = { header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", }, heading: { color: "#fff", }, addButton: { padding: "10px 20px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", transition: "0.3s", }, table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#141414", }, th: { color: "#fff", padding: "12px", textAlign: "left", borderBottom: "2px solid #ff0000", cursor: "pointer", }, tr: { borderBottom: "1px solid #333", transition: "0.2s", }, td: { padding: "12px", color: "#fff", verticalAlign: "middle", }, photo: { width: "100px", height: "60px", objectFit: "cover", borderRadius: "6px", }, status: { padding: "5px 10px", borderRadius: "6px", color: "#fff", fontWeight: "bold", }, editButton: { padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", marginRight: "5px", cursor: "pointer", fontWeight: "bold", }, deleteButton: { padding: "5px 10px", backgroundColor: "#555", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", }, };


export default CarouselTable;