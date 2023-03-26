const Die = (props) => {
  return (
    <div>
      <h1
        style={{ background: props.isHeld ? "#59E391" : "#fff" }}
        className="die--face"
        onClick={props.toggle}
      >
        {props.value}
      </h1>
    </div>
  );
};

export default Die;
