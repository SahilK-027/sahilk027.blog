import Tooltip from "../Tooltip/Tooltip";
import "./MustReadDiv.scss";

const MustReadDiv = ({ mustReadText }) => {
  return (
    <div className="must-read-div">
      <div className="icon">
        <Tooltip content="Must Read">
          <i className="fa-solid fa-book"></i>
        </Tooltip>
      </div>
      <p>👉 Must Read: </p>{" "}
      <div dangerouslySetInnerHTML={{ __html: mustReadText }} />
    </div>
  );
};

export default MustReadDiv;
