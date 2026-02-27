
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCarousel, updateCarousel, getCarouselById } from "../../Service/carouselService";

const CarouselForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    photo: null,
    status: "Draft",
  });

  useEffect(() => {
    if (isEditing) {
      const fetchCarousel = async () => {
        try {
          const data = await getCarouselById(id);
          setFormData({
            photo: data.photo || null,
            status: data.status || "Draft",
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchCarousel();
    }
  }, [id, isEditing]);

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
      if (isEditing) {
        await updateCarousel(id, formData);
        alert("Carousel updated successfully!");
      } else {
        await createCarousel(formData);
        alert("Carousel added successfully!");
      }
      navigate("/carousels");
    } catch (err) {
      console.error(err);
      alert("Operation failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 mt-6 rounded border border-red-600 shadow-lg">
      <h2 className="text-red-600 text-xl font-bold mb-4">
        {isEditing ? "Edit Carousel" : "Add Carousel"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-white font-bold mb-1 block">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full p-2 rounded border border-red-600 bg-gray-900 text-white"
          />
        </div>

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
          {isEditing ? "Update Carousel" : "Add Carousel"}
        </button>
      </form>
    </div>
  );
};

const styles = { container: { backgroundColor: "#141414", padding: "30px", borderRadius: "10px", color: "#fff", border: "1px solid #ff0000", maxWidth: "500px", margin: "auto" }, heading: { color: "#ff0000", marginBottom: "20px" }, form: { display: "flex", flexDirection: "column", gap: "15px" }, label: { fontWeight: "bold" }, input: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff" }, select: { padding: "10px", borderRadius: "6px", border: "1px solid #ff0000", backgroundColor: "#141414", color: "#fff" }, submitButton: { padding: "12px 20px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }, };


export default CarouselForm;