//SOURCE ONLY

let model = null
let setModel = null;

function App() {
  //default to level 1
  [model, setModel] = React.useState(new Model(level1));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]);

  const moveHandler = (direction) => {
    let newModel = move(model, direction);
    setModel(newModel);
  }

  const pickupHandler = () => {
    let newModel = pickup(model);
    setModel(newModel);
  }

  const resetHandler = () => {
    let newModel = reset(model);
    setModel(newModel);
  }

  handleChange = (e) => {
    if (e.target.value == 1){
          model = new Model(level1);
        } else if (e.target.value == 2) {
          model = new Model(level2);
        } else if (e.target.value == 3) {
          model = new Model(level3)
        }
    
        model.level = e.target.value;
        let newModel = reset(model);
        setModel(newModel);
  }
  
  return(
    <main ref={appRef}>
      <div className = "is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-evenly">
        <canvas tabIndex="1"
                ref={canvasRef}
                width={layout.canvas.width}
                height={layout.canvas.height}
                />
        <div className="is-flex is-align-items-center is-flex-direction-row is-justify-content-space-evenly is-flex-grow-1 box">
          <div style={layout.buttons} className = "is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
            <button className = "button is-size-4" 
                    style={layout.button}
                    >a
            </button>  
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                      onClick={(e) => moveHandler(Up)} 
                      disabled={!model.puzzle.canMove(Up)}
                      >^
            </button>
            <button className = "button is-size-4" 
                    style={layout.button}
                    >a
            </button> 
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                    onClick={(e) => moveHandler(Left)} 
                    disabled={!model.puzzle.canMove(Left)}
                    >&lt;
            </button>
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                    onClick={(e) => moveHandler(Down)} 
                    disabled={!model.puzzle.canMove(Down)} 
                    >v
            </button>
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                    onClick={(e) => moveHandler(Right)} 
                    disabled={!model.puzzle.canMove(Right)} 
                    >&gt;
            </button>
          </div>
          <div className="is-flex is-flex-direction-column is-justify-content-space-evenly is-align-content-space-evenly">
            <div className="select mb-1 mx-1">
              <select onChange={this.handleChange}>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </select>
            </div>
            <button className="button is-success" onClick={(e) => pickupHandler()} disabled={!model.puzzle.canPickup()}>
              Pickup Key
            </button>
          </div>
          <div className="is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
            <label className="box has-background-black-ter has-text-white-ter">
              {"Moves: " + model.numMoves}
            </label>
            <button className="button is-danger is-large" onClick={(e) => resetHandler()}>Reset</button>
          </div>
        </div>
      </div>
      

    </main>
  );
}
