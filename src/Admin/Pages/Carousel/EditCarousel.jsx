
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarouselById, updateCarousel } from "../../Service/carouselService";

const EditCarousel = () => {
  const { id } = useParams(); // get the carousel ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: null,
    status: "Draft",
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing carousel data
  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const data = await getCarouselById(id);
        setFormData({
          photo: data.photo || null,
          status: data.status || "Draft",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch carousel:", err);
        setLoading(false);
      }
    };
    fetchCarousel();
  }, [id]);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCarousel(id, formData);
      alert("Carousel updated successfully!");
      navigate("/carousels");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update carousel");
    }
  };

  if (loading) return <p className="text-white text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-6 bg-gray-800 p-6 rounded border border-red-600 shadow-lg">
      <h2 className="text-red-600 text-xl font-bold mb-4 text-center">Edit Carousel</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Photo */}
        <div>
          <label className="text-white font-bold mb-1 block">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full p-2 rounded border border-red-600 bg-gray-900 text-white"
          />
          {formData.photo && typeof formData.photo === "string" && (
            <img
              src={formData.photo}
              alt="Current"
              className="mt-2 w-32 h-20 object-cover rounded border border-gray-600"
            />
          )}
        </div>

        {/* Status */}
        <div>
          <label className="text-white font-bold mb-1 block">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded border border-red-600 bg-gray-900 text-white"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
        >
          Update Carousel
        </button>
      </form>
    </div>
  );
};

const styles = { container: { backgroundColor: "#141414", padding: "30px", borderRadius: "10px", color: "#fff", border: "1px solid #ff0000", maxWidth: "500px", margin: "auto" }, heading: { color: "#ff0000", marginBottom: "20px" }, form: { display: "flex", flexDirection: "column", gap: "15px" }, label: { fontWeight: "bold" }, input: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff" }, select: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff" }, submitButton: { padding: "12px 20px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }, };



export default EditCarousel;