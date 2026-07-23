import Tooltip from "../Tooltip/Tooltip";
import "./InsightDIV.scss";

// `children` = new MDX API. `insightText` (HTML string) kept for legacy blogs.
const InsightDiv = ({ insightText, children }) => {
  return (
    <div className="insight-div">
      <div className="icon">
        <Tooltip content="Insight">
          <i className="fa-solid fa-lightbulb"></i>
        </Tooltip>
      </div>
      <p>👉 Insight: </p>{" "}
      {children ? (
        <div>{children}</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: insightText }} />
      )}
    </div>
  );
};

export default InsightDiv;
