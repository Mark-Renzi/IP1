class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }  
}

const Down = new MoveType(1, 0, "down");
const Up = new MoveType(-1, 0, "up");
const Left = new MoveType(0, -1, "left");
const Right = new MoveType(0, 1, "right");
const NoMove = new MoveType(0, 0, "*");

class Wall {

    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let s = new Wall(this.row, this.column, this.color)
        return s;
    }

    remove() {
        this.color = "white";
    }

}

class Door {

    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let s = new Door(this.row, this.column, this.color)
        return s;
    }

    remove() {
        this.color = "white";
    }

}

class Key {

    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let s = new Key(this.row, this.column, this.color)
        return s;
    }

    remove() {
        this.color = "white";
    }

}

class Player {
    constructor (row, col) {
        this.row = row;
        this.column = col;
        this.held = null;
    }
    setHeld(key) {
        this.held = key;
    }
    location() {
        return new Coordinate(this.row, this.column);
    }
    copy() {
        let s = new Player(this.row, this.column)
        s.setHeld(this.held);
        return s;
    }
    move(dir) {
        this.row = this.row + dir.deltar;
        this.column = this.column + dir.deltac;
    }
}

class Puzzle {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.walls = this.initWalls();
        this.doors = [];
        this.keys = [];
        this.player = new Player(0, 0);
    }

    initWalls() {
        var allWalls = [];
        for (let row = 0; row < this.rowNum; row++) {
            for (let col = 0; col < this.colNum; col++) {
                allWalls.push(new Wall(row, col, "white"));
            }
        }
        return allWalls;
    }

    setPlayer(row, col) {
        this.player.row = row;
        this.player.column = col;
    }

    clone() {
        let copy = new Puzzle(this.rowNum, this.colNum);
        copy.walls = [];
        for (let s of this.walls) {
            let dup = s.copy();
            copy.walls.push(dup);
            if (s === this.selected) {
                copy.selected = dup;
            }
        }
        copy.doors = [];
        for (let s of this.doors) {
            let dup = s.copy();
            copy.doors.push(dup);
        }
        copy.keys = [];
        for (let s of this.keys) {
            let dup = s.copy();
            copy.keys.push(dup);
        }
        copy.player = this.player.copy();
        return copy;
    }

    move(dir) {
        let player = this.player;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;
        if (this.canMoveToEmpty(dir)) {
            this.setPlayer(newRow, newCol);
        } else if (this.canOpenDoor(dir)) {
            let i = 0;
            for (let s of this.doors) {
                let r = parseInt(s.row);
                let c = parseInt(s.column);
                if (r == newRow && c == newCol){
                    break;
                }
                i++;
            }
            this.doors.splice(i, 1);
            this.player.setHeld(null);
            this.setPlayer(newRow, newCol);
        }
    }

    pickup() {
        let oldFloor;
        let i = 0;
        for (let s of this.keys) {

            let r = parseInt(s.row);
            let c = parseInt(s.column);
            if (r == this.player.row && c == this.player.column){
                oldFloor = s;
                break;
            }
            i++;
        }
        let oldHeld = this.player.held;
        this.player.setHeld(oldFloor);

        //remove key from list
        this.keys.splice(i, 1);
        //set floor to have new key
        if (oldHeld != null){
            oldHeld.row = this.player.row;
            oldHeld.column = this.player.column;
            this.keys.push(oldHeld);
        }
        
    }

    getWall(row, col) {
        return this.walls[row*this.colNum+col];
    }

    getDoor(row, col) {
        for (let s of this.doors) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            if (r == row && c == col){
                return s;
            }
        }
        return false;
    }

    getKey(row, col) {
        for (let s of this.keys) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            if (r == row && c == col){
                return s;
            }
        }
        return false;
    }

    canMove(dir) {
        return !model.victory && (this.canMoveToEmpty(dir) || this.canOpenDoor(dir));// || this.canPush(dir) || this.canRemove(dir);
    }

    canPickup(){
        if ( this.getKey(this.player.row, this.player.column)){
            return true;
        }
        return false;
    }

    canMoveToEmpty(dir) {
        let player = this.player;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;

        if ((newRow >= 0 && newRow < this.rowNum) && (newCol >= 0 && newCol < this.colNum)) {
            let adjWall = this.getWall(newRow, newCol);
            if (adjWall.color === "white" && this.getDoor(newRow, newCol) == false) return true;
        } 
        else return false;

    }

    canOpenDoor(dir) { //returns true if door exists AND if ninjaSe has correct Key
        let player = this.player;
        if (player.held == null) return false;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;

        if ((newRow >= 0 && newRow < this.rowNum) && (newCol >= 0 && newCol < this.colNum)) {
            let adjDoor = this.getDoor(newRow, newCol);
            if (adjDoor != null && adjDoor.color == player.held.color) return true;
        } 

        else return false;
    }
}

class Model {
    constructor(info) {
        this.initialize(info);
        this.info = info;
        
    }

    copy() {
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.victory = this.victory;
        m.level = this.level;
        m.numMoves = this.numMoves;
        return m;
    }
    
    initialize(info) {
        let numRows = parseInt(info.rows);
        let numCols = parseInt(info.columns);

        let arow = parseInt(info.ninjase.row);
        let acol = parseInt(info.ninjase.column);
        
        this.puzzle = new Puzzle(numRows, numCols);
        
        for (let w of info.walls) {
            let r = parseInt(w.row);
            let c = parseInt(w.column);
            this.puzzle.walls[r*numCols+c].color = "black";
        }

        for (let s of info.doors) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.doors.push(new Door(r, c, s.color));
        }

        for (let s of info.keys) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.keys.push(new Key(r, c, s.color));
        }

        this.puzzle.setPlayer(arow, acol);
        this.victory = false;
        this.level = parseInt(info.level);
        this.numMoves = 0;
    }

    isWin() {
        model.victory = this.puzzle.doors.length == 0
        return model.victory;
    }
}