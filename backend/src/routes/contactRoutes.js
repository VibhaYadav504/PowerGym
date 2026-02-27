import express from "express";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../Controller/contactController.js";



const router = express.Router();


router.get("/", getContacts);

router.get("/:id",getContactById);
router.post("/", createContact);


router.put("/:id", updateContact);


router.delete("/:id", deleteContact);

export default router;