import "./InfoDiv.scss";

const InfoDiv = ({ infoText }) => {
  return (
    <div className="info-div">
      <div className="icon">
        <i className="fa-solid fa-circle-info"></i>
      </div>
      <p>👉 Note: </p> <div dangerouslySetInnerHTML={{ __html: infoText }} />
    </div>
  );
};

export default InfoDiv;
