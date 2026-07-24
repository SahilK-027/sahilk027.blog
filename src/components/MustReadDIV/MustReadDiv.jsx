import Tooltip from "../Tooltip/Tooltip";
import "../../styles/callouts.scss";

// `children` = new MDX API. `mustReadText` (HTML string) kept for legacy blogs.
const MustReadDiv = ({ mustReadText, children }) => {
  return (
    <aside className="callout callout--mustread">
      <div className="callout__head">
        <Tooltip content="Must Read">
          <span className="callout__icon">
            <i className="fa-solid fa-book"></i>
          </span>
        </Tooltip>
        <span className="callout__label">Must read</span>
      </div>
      {children ? (
        <div className="callout__body">{children}</div>
      ) : (
        <div
          className="callout__body"
          dangerouslySetInnerHTML={{ __html: mustReadText }}
        />
      )}
    </aside>
  );
};

export default MustReadDiv;
