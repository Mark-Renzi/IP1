// import Model from '../model/Model.js';

function move(model, dir) {
  if (model.puzzle.canMove(dir)) {

    model.puzzle.move(dir);
    model.numMoves += 1;
    model.isWin();
    return model.copy();
  } else return model;
}

function pickup(model) {
  if (model.puzzle.canPickup()) {
    model.puzzle.pickup();
    return model.copy();
  } else return model;
}

function reset(model) {
  return new Model(model.info);
}
