import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";

export default function PokemonCry({
  className,
  pokemonId,
  label,
}: {
  className?: string;
  pokemonId: number;
  label?: string;
}) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (pokemonId) {
      const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
      setAudio(new Audio(cryUrl));
    }
  }, [pokemonId]);

  const playCry = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <button
      onClick={playCry}
      className={`${className} flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`}
    >
      <Volume2 size={20} />
      {label && <span>{label}</span>}
    </button>
  );
}
