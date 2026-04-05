const axios = require("axios");

exports.analyze = async (text) => {
  try {
    // Wake up ML service (important for Render free tier)
    await axios.get("https://fake-review-ml-service.onrender.com/");

    // Actual prediction request
    const response = await axios.post(
      "https://fake-review-ml-service.onrender.com/predict",
      { text },
      {
        timeout: 10000, // wait up to 10 sec
      }
    );

    // Safety check
    if (!response.data) {
      throw new Error("Empty response from ML service");
    }

    return response.data;

  } catch (error) {
    console.error("ML Service FULL ERROR:", error);

    return {
      fake_probability: 0,
      trust_score: 0,
      error: error.message || "ML service failed",
    };
  }
};