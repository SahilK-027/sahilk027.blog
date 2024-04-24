import "./MustReadDiv.scss";

const MustReadDiv = ({ mustReadText }) => {
  return (
    <div className="must-read-div">
      <div className="icon">
        <i className="fa-solid fa-book"></i>
      </div>
      <p>👉 Must Read: </p>{" "}
      <div dangerouslySetInnerHTML={{ __html: mustReadText }} />
    </div>
  );
};

export default MustReadDiv;
