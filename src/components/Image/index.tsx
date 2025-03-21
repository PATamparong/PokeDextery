import PokemonLogo from "../../assets/pokedextery.svg";
import ReactLogo from "../../assets/react.svg";

const srcImages = {
  PokemonLogo,
  React: ReactLogo,
};

type ImageNames = keyof typeof srcImages;

type Props = {
  name: ImageNames;
  className?: string;
};

export default function Images(props: Props) {
  const { name, className } = props;
  const imageSrc = srcImages[name];

  if (!imageSrc) {
    console.warn(`Image not found for: ${name}`);
    return null;
  }

  return <img className={`${className}`} src={imageSrc} alt={name} />;
}
