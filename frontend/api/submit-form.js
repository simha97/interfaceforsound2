// This is the content of /api/submit-form.js

module.exports = (req, res) => {
  // Set CORS headers to allow requests from your frontend
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://interfaceforsound2-frontend.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle the preflight request
  if (req.method === "OPTIONS") {
    // Preflight request. End it without further processing
    return res.status(200).end();
  }

  // Your existing POST request handling code goes here
  // For example, you might have logic here to process a form submission.
};
