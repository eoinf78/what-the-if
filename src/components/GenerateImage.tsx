import { useState, type FC } from "react";
import { imageQuery } from "../pages/api/imageGen";
import type { UserData } from "./UserForm";
import ollama from 'ollama';
import { friends } from "../utils/freinds";
import FullModal from "./FullModal.astro";

interface GenerateImageProps {
  userData: UserData;
}

export const GenerateImage: FC<GenerateImageProps> = ({ userData }) => {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string>();
  const [input, setInput] = useState<string>("Astronaut riding a horse");
  const [generatingStory, setGeneratingStory] = useState<boolean>(false);
  const [generatedStory, setGeneratedStory] = useState<string>();

  const generateImage = async () => {
    let friendPrompt = input;

    if (selectedFriend === 'custom') {
      friendPrompt = input;
    } else {
      const friend = friends.find(friend => friend.id === selectedFriend);
      if (!friend) {
        return;
      }
      friendPrompt = friend.prompt;
    }
    setLoading(true);
    setError(null);
    try {
      const genImageBlob = await imageQuery({"inputs": friendPrompt});
      const url = URL.createObjectURL(genImageBlob);
      setImage(url);

      setGeneratingStory(true);
      ollama.generate({
        model: 'llama3.2',
        prompt: `write a story about a child name ${userData.name} who is ${userData.age} years old and ${userData.friendName}, a ${friendPrompt}`,
      }).then(output => {
        console.log(output.response);
        setGeneratedStory(output.response);
      }).finally(() => {
        setGeneratingStory(false);
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectFriend = (val: string) => {
    console.log(val);
    const thisFriend = friends.find(friend => friend.id === val);
    console.log(thisFriend);
  }

  return (
    <div>
      <div className="generateContainer">
        <p>{`Hi ${userData.name}, do you want to go find ${userData.friendName}? Select the type friend they are...`}</p>
        {selectedFriend === 'custom' && (
          <textarea
            style={{ width: 300, height: 100 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
        <select onChange={e => setSelectedFriend(e.target.value)}>
          <option value="llama">Llama</option>
          <option value="monster">Monster</option>
          <option value="dinosaur">Dinosaur</option>
          <option value="robot">Robot</option>
          <option value="custom">Custom</option>
        </select>
        <button onClick={generateImage} disabled={loading} className="selfieButtons">
          {!loading ? 'Find my friend!' : 'Looking for your friend...'}
        </button>
        {error && <p>Error: {error}</p>}
        {image && (
          <img src={image} alt="Generated Image" style={{ width: 300, height: 300 }} />
        )}
        {generatingStory && <p>Creating a story...</p>}
        {generatedStory && (
          <div>
            <h2>{`A story about ${userData.name} and her friend ${userData.friendName}`}</h2>
            {generatedStory?.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateImage;