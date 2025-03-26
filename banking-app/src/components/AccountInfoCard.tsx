import { colors } from "../assets/colors";

const AccountInfoCard = ({ title, content, active }) => {
  return (
    <div>
      <div className="container-fluid">
        <div
          className="card p-3 rounded-4 pb-4"
          style={{ background: colors.secondary, color: "white" }}
        >
          <div className="text-secondary fs-6">{title}</div>
          <div className="text-light fs-4">{content}</div>
          <div
            className={`mx-auto position-absolute bottom-0 start-0 w-100 ${active ? 'bg-primary' : 'bg-danger'} bg-opacity-75 rounded-bottom-4`}
            style={{
              height: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;
