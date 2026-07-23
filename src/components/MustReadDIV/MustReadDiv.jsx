import Tooltip from "../Tooltip/Tooltip";
import "./MustReadDiv.scss";

// `children` = new MDX API. `mustReadText` (HTML string) kept for legacy blogs.
const MustReadDiv = ({ mustReadText, children }) => {
  return (
    <div className="must-read-div">
      <div className="icon">
        <Tooltip content="Must Read">
          <i className="fa-solid fa-book"></i>
        </Tooltip>
      </div>
      <p>👉 Must Read: </p>{" "}
      {children ? (
        <div>{children}</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: mustReadText }} />
      )}
    </div>
  );
};

export default MustReadDiv;
