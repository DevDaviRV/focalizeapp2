import LogoSvg from "../assets/ROXO/ícone-Logo.png";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "lg"; 
  justify?: "justify-center"; 
}

export function Logo({ size = "lg", justify }: LogoProps) {
  const height = size === "sm" ? "h-8" : "h-10";
  const fontSize = size === "sm" ? "text-xl" : "text-2xl";

  let classes = "flex items-center gap-3";
  if (justify === "justify-center") classes += " justify-center";
  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");

  return (
    <div className={classes} role="button" onClick={navigateToHome}>
      <img className={height} src={LogoSvg} alt="logo" />
      <h2 className={`${fontSize} tracking-widest font-medium mb-0.5`}>
        Focalize<span className="text-primary"></span>
      </h2>
    </div>
  );
}
