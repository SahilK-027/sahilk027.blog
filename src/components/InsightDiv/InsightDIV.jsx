import Tooltip from "../Tooltip/Tooltip";
import "./InsightDIV.scss";

const InsightDiv = ({ insightText }) => {
  return (
    <div className="insight-div">
      <div className="icon">
        <Tooltip content="Insight">
          <i class="fa-solid fa-lightbulb"></i>
        </Tooltip>
      </div>
      <p>👉 Insight: </p>{" "}
      <div dangerouslySetInnerHTML={{ __html: insightText }} />
    </div>
  );
};

export default InsightDiv;
