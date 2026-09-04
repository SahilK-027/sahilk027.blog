import Tooltip from "../Tooltip/Tooltip";
import "../../styles/callouts.scss";

// `children` = new MDX API. `insightText` (HTML string) kept for legacy blogs.
const InsightDiv = ({ insightText, children }) => {
  return (
    <aside className="callout callout--insight">
      <div className="callout__head">
        <Tooltip content="Insight">
          <span className="callout__icon">
            <i className="fa-solid fa-lightbulb"></i>
          </span>
        </Tooltip>
        <span className="callout__label">Insight</span>
      </div>
      {children ? (
        <div className="callout__body">{children}</div>
      ) : (
        <div
          className="callout__body"
          dangerouslySetInnerHTML={{ __html: insightText }}
        />
      )}
    </aside>
  );
};

export default InsightDiv;
