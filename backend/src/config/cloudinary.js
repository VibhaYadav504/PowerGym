import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import multer from "multer";


// Cloudinary configuration
    cloudinary.config({
        cloud_name: "dl1lyatxr",
        api_key:"464646712244688" ,
        api_secret: "rh8EBMcopkeBYV5BM8eYe36SBmI",
    });

// Upload buffer to Cloudinary
export const uploadToCloudinary = (fileBuffer, options = { folder: "rooms" }) => {

    

    return new Promise((resolve, reject) => {
        if (!fileBuffer) return reject(new Error("No file buffer provided"));

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", ...options },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
};


const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only images are allowed"), false);
    },
});

export default cloudinary;