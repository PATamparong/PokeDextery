import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useGetPokemonByNameQuery } from "../../services/pokeApi";
import html2canvas from "html2canvas";

export default function Customizer() {
  const { name } = useParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const [background, setBackground] = useState("#ffffff");
  const [border, setBorder] = useState("4px solid gray");
  const [textColor, setTextColor] = useState("#000000");
  const [fontStyle, setFontStyle] = useState("sans-serif");
  const [glow, setGlow] = useState("none");
  const [image, setImage] = useState("");
  const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <p>Loading Pokémon...</p>;
  if (error) return <p className="text-red-500">Error fetching Pokémon</p>;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (!cardRef.current) return;

    html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${name}-custom-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-500">
        Customize {name}'s Card
      </h1>

      <div
        ref={cardRef}
        style={{
          backgroundColor: background,
          border: border,
          color: textColor,
          fontFamily: fontStyle,
          boxShadow: glow,
        }}
        className="flex flex-col items-center justify-center mt-6 p-6 rounded-lg shadow-lg w-64"
      >
        <img
          src={image || pokemon?.sprites?.front_default}
          alt={name}
          className="mb-2 bg-contain"
        />
        <p className="text-xl font-bold capitalize text-center">{name}</p>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-gray-600">Background color</h3>
        <div className="flex space-x-2 items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setBackground("#3b82f6")}
          >
            Blue
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => setBackground("#ef4444")}
          >
            Red
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => setBackground("#10b981")}
          >
            Green
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
            onClick={() => setBackground("#facc15")}
          >
            Yellow
          </button>
        </div>
        <h3 className="text-gray-600">Border</h3>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 border-4 border-black rounded-lg"
            onClick={() => setBorder("4px solid black")}
          >
            Black Border
          </button>
          <button
            className="px-4 py-2 border-4 border-dashed border-gray-500 rounded-lg"
            onClick={() => setBorder("4px dashed gray")}
          >
            Dashed Border
          </button>
        </div>
        <h3 className="text-gray-600">Font color</h3>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 text-white bg-black rounded-lg"
            onClick={() => setTextColor("#ffffff")}
          >
            White Text
          </button>
          <button
            className="px-4 py-2 text-red-600 bg-gray-200 rounded-lg"
            onClick={() => setTextColor("#dc2626")}
          >
            Red Text
          </button>
          <button
            className="px-4 py-2 text-blue-600 bg-gray-200 rounded-lg"
            onClick={() => setTextColor("#2563eb")}
          >
            Blue Text
          </button>
        </div>
        <h3 className="text-gray-600">Font style</h3>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 font-sans bg-gray-300 rounded-lg"
            onClick={() => setFontStyle("sans-serif")}
          >
            Sans-serif
          </button>
          <button
            className="px-4 py-2 font-serif bg-gray-300 rounded-lg"
            onClick={() => setFontStyle("serif")}
          >
            Serif
          </button>
          <button
            className="px-4 py-2 font-mono bg-gray-300 rounded-lg"
            onClick={() => setFontStyle("monospace")}
          >
            Monospace
          </button>
        </div>
        <h3 className="text-gray-600">Glow</h3>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            onClick={() => setGlow("0px 0px 15px rgba(255, 255, 255, 0.8)")}
          >
            Glow Effect
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            onClick={() => setGlow("none")}
          >
            No Glow
          </button>
        </div>
        <h3 className="text-gray-600">Image</h3>
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 border rounded-lg"
          />
        </div>

        <button
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg w-full"
          onClick={handleSaveImage}
        >
          Save as Image
        </button>
      </div>
    </div>
  );
}
