import BinBug from "../models/BinBug.js"; // Adjust the path based on your project structure

// Controller function for inserting a new BinBug
export const createNewBinBug = async (req, res) => {
  try {
    // Log the request body for debugging purposes
    console.log("Request Body:", req.body);

    // Destructure necessary fields from the request body
    const { compId, binId, proofImageUrl } = req.body;

    // Validate that required fields are present
    if (!compId || !binId) {
      return res
        .status(400)
        .json({ message: "compId and binId are required." });
    }

    // Create a new BinBug instance
    const newBinBug = new BinBug({
      compId,
      binId,
      proofImageUrl, // Optional field
    });

    // Save the new BinBug record to the database
    await newBinBug.save();

    // Respond with success message and the newly created bin bug
    res.status(201).json({
      message: "New BinBug created successfully.",
      binBug: newBinBug,
    });
  } catch (error) {
    // Log any errors and return a server error response
    console.error("Error creating BinBug:", error);
    res.status(500).json({
      message: "Failed to create new BinBug.",
      error: error.message,
    });
  }
};

export const getBinBugs = async (req, res) => {
  try {
    const { compId, binId } = req.query;

    // Build the query object
    const query = {};
    if (compId) query.compId = compId;
    if (binId) query.binId = binId;

    // Fetch bin bugs based on the query parameters
    const binBugs = await BinBug.find(query);

    // Respond with the fetched bin bugs
    return res.status(200).json(binBugs);
  } catch (error) {
    // Log the error and send a server error response
    console.error("Error fetching bin bugs:", error);
    return res.status(500).json({ error: "Error fetching bin bugs" });
  }
};
