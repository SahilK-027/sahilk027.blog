import Tooltip from "../Tooltip/Tooltip";
import "./InfoDiv.scss";

// `children` is the new MDX-friendly API. `infoText` (HTML string) is kept for
// backward compatibility with not-yet-migrated legacy blogs.
const InfoDiv = ({ infoText, children }) => {
  return (
    <div className="info-div">
      <div className="icon">
        <Tooltip content="Extra Info">
          <i className="fa-solid fa-circle-info"></i>
        </Tooltip>
      </div>
      <p>👉 Note: </p>{" "}
      {children ? (
        <div>{children}</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: infoText }} />
      )}
    </div>
  );
};

export default InfoDiv;
