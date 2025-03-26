import { colors } from "../assets/colors";
import "../App.css";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  subtitle: string;
  iconClass: string;
  route: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  iconClass,
  route,
}) => {
  return (
    <Link to={`${route}`} className="text-decoration-none">
      <div className="container-fluid">
        <div
          className="card p-4 rounded-4 position-relative overflow-hidden"
          style={{
            background: colors.secondary,
            minHeight: "150px",
          }}
        >
          {/* Background Icon */}
          <i
            className={`${iconClass}`}
            style={{
              fontSize: "5rem",
              opacity: 0.4,
              left: "10px",
              top: "10px",
              color: colors.lightBackground,
            }}
          ></i>

          {/* Arrow Icon (Top-Right) */}
          <i
            className="bi bi-chevron-right position-absolute"
            style={{
              fontSize: "1.5rem",
              color: colors.lightText,
              right: "15px",
              top: "15px",
            }}
          ></i>

          <div className="text-light fs-5 fw-semibold py-2">{title}</div>
          <div className="text-secondary">{subtitle}</div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
