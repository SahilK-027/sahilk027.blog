import Tooltip from "../Tooltip/Tooltip";
import "./InfoDiv.scss";

const InfoDiv = ({ infoText }) => {
  return (
    <div className="info-div">
      <div className="icon">
        <Tooltip content="Extra Info">
          <i className="fa-solid fa-circle-info"></i>
        </Tooltip>
      </div>
      <p>👉 Note: </p> <div dangerouslySetInnerHTML={{ __html: infoText }} />
    </div>
  );
};

export default InfoDiv;
