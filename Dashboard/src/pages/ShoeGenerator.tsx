import { useState } from "react";
import axios from "axios";

const ShoeGenerator = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setImage(null);

    const API_KEY = "sk-hCU80kl6mZo7lH4v21ApDLB5MpfeuXSM4rIUTK29W3HI4UGg"; // ⚠️ Replace with your Stability AI key
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", "webp");

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/ultra",
        formData,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "image/*",
          },
        }
      );

      if (response.status === 200) {
        // Convert arrayBuffer to Base64 (since Buffer is not available in browsers)
        const base64Image = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), "")
        );

        setImage(`data:image/webp;base64,${base64Image}`);
      } else {
        console.error("❌ API Error:", response.status, response.data);
      }
    } catch (error) {
      console.error("❌ Error making API request:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>AI Shoe Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter shoe description..."
        style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Generating..." : "Generate Shoe"}
      </button>
      {image && (
        <div>
          <h3>Generated Shoe:</h3>
          <img src={image} alt="Generated Shoe" style={{ width: "300px", marginTop: "10px" }} />
        </div>
      )}
    </div>
  );
};

export default ShoeGenerator;