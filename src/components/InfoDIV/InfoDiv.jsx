import Tooltip from "../Tooltip/Tooltip";
import "../../styles/callouts.scss";

// `children` is the new MDX-friendly API. `infoText` (HTML string) is kept for
// backward compatibility with not-yet-migrated legacy blogs.
const InfoDiv = ({ infoText, children }) => {
  return (
    <aside className="callout callout--info">
      <div className="callout__head">
        <Tooltip content="Extra Info">
          <span className="callout__icon">
            <i className="fa-solid fa-circle-info"></i>
          </span>
        </Tooltip>
        <span className="callout__label">Note</span>
      </div>
      {children ? (
        <div className="callout__body">{children}</div>
      ) : (
        <div
          className="callout__body"
          dangerouslySetInnerHTML={{ __html: infoText }}
        />
      )}
    </aside>
  );
};

export default InfoDiv;
