//SOURCE ONLY

let model = null;
let setModel = null;
function App() {
  //default to level 1
  [model, setModel] = React.useState(new Model(level1));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]);
  const moveHandler = direction => {
    let newModel = move(model, direction);
    setModel(newModel);
  };
  const pickupHandler = () => {
    let newModel = pickup(model);
    setModel(newModel);
  };
  const resetHandler = () => {
    let newModel = reset(model);
    setModel(newModel);
  };
  handleChange = e => {
    if (e.target.value == 1) {
      model = new Model(level1);
    } else if (e.target.value == 2) {
      model = new Model(level2);
    } else if (e.target.value == 3) {
      model = new Model(level3);
    }
    model.level = e.target.value;
    let newModel = reset(model);
    setModel(newModel);
  };
  return /*#__PURE__*/React.createElement("main", {
    ref: appRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-evenly"
  }, /*#__PURE__*/React.createElement("canvas", {
    tabIndex: "1",
    ref: canvasRef,
    width: layout.canvas.width,
    height: layout.canvas.height
  }), /*#__PURE__*/React.createElement("div", {
    className: "is-flex is-align-items-center is-flex-direction-row is-justify-content-space-evenly is-flex-grow-1 box"
  }, /*#__PURE__*/React.createElement("div", {
    style: layout.buttons,
    className: "is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button is-size-4",
    style: layout.button
  }, "a"), /*#__PURE__*/React.createElement("button", {
    className: "button has-background-dark has-text-white-ter is-size-4",
    onClick: e => moveHandler(Up),
    disabled: !model.puzzle.canMove(Up)
  }, "^"), /*#__PURE__*/React.createElement("button", {
    className: "button is-size-4",
    style: layout.button
  }, "a"), /*#__PURE__*/React.createElement("button", {
    className: "button has-background-dark has-text-white-ter is-size-4",
    onClick: e => moveHandler(Left),
    disabled: !model.puzzle.canMove(Left)
  }, "<"), /*#__PURE__*/React.createElement("button", {
    className: "button has-background-dark has-text-white-ter is-size-4",
    onClick: e => moveHandler(Down),
    disabled: !model.puzzle.canMove(Down)
  }, "v"), /*#__PURE__*/React.createElement("button", {
    className: "button has-background-dark has-text-white-ter is-size-4",
    onClick: e => moveHandler(Right),
    disabled: !model.puzzle.canMove(Right)
  }, ">")), /*#__PURE__*/React.createElement("div", {
    className: "is-flex is-flex-direction-column is-justify-content-space-evenly is-align-content-space-evenly"
  }, /*#__PURE__*/React.createElement("div", {
    className: "select mb-1 mx-1"
  }, /*#__PURE__*/React.createElement("select", {
    onChange: this.handleChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Level 1"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Level 2"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "Level 3"))), /*#__PURE__*/React.createElement("button", {
    className: "button is-success",
    onClick: e => pickupHandler(),
    disabled: !model.puzzle.canPickup()
  }, "Pickup Key")), /*#__PURE__*/React.createElement("div", {
    className: "is-flex is-flex-direction-column is-justify-content-center is-align-content-center"
  }, /*#__PURE__*/React.createElement("label", {
    className: "box has-background-black-ter has-text-white-ter"
  }, "Moves: " + model.numMoves), /*#__PURE__*/React.createElement("button", {
    className: "button is-danger is-large",
    onClick: e => resetHandler()
  }, "Reset")))));
}