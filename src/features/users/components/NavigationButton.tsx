import { NavLink } from "react-router";
import "../../../index.css";

interface NavigationButtonProps {
  to: string;
  label: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  label,
}) => {
  return (
    <NavLink className="navigationButton" to={to}>
      {label}
    </NavLink>
  );
};
