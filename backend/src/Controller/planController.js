import Plan from "../model/plan.js";


//  Get All Plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Single Plan by ID
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  Create Plan
export const createPlan = async (req, res) => {
  try {
    const { price, service, status } = req.body;

    const newPlan = new Plan({
      price,
      service,
      status,
    });

    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//  Update Plan
export const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Plan
export const deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};