import { colors } from "../assets/colors";

const ServiceCard = ({ iconClass, title, subtitle }) => {
  return (
    <>
    <div className="container-fluid col-12 col-sm-6 col-md-4">
      <div
        className="card rounded-4 text-start p-4 mb-3"
        style={{ background: colors.secondary, color: "white" }}
        >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "60px",  // Width of the circle
            height: "60px", // Height of the circle
            borderRadius: "50%",  // Make it a circle
            backgroundColor: colors.primary, // Circle color
            color: "white", // Icon color
            marginBottom: "15px", // Space between icon and text
          }}
          >
          <i className={`${iconClass} fs-2`}></i> {/* Bootstrap Icon */}
        </div>
        <div className="fs-3 pt-2 pb-2">{title}</div>
        <div style={{ color: colors.lightText }}>{subtitle}</div>
      </div>
          </div>
    </>
  );
};

export default ServiceCard;
