import { useState } from "react";
import { imageQuery } from "../pages/api/imageGen";

export const GenerateImage = () => {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("Astronaut riding a horse");

  const generateImage = async () => {
    console.log("Generating image with input:", input);
    setLoading(true);
    setError(null);
    try {
      const genImageBlob = await imageQuery({"inputs": input});
      
        console.log(genImageBlob);
        const url = URL.createObjectURL(genImageBlob);
        setImage(url);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <textarea
          style={{ width: 300, height: 100 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={generateImage}>
          {!loading ? 'Generate Image' : 'Generating Image'}
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {image && (
        <img src={image} alt="Generated Image" style={{ width: 300, height: 300 }} />
      )}
    </div>
  );
}

export default GenerateImage;