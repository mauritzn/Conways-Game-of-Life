// Grid system handles clicks, drawing of grid and updating of the cells in the grid system
class Grid {
  rows = 0;
  cols = 0;
  cells = [];


  constructor(options) {
    this.rows = options.rows;
    this.cols = options.cols;
  }

  resizeGrid(options) {
    this.rows = options.rows;
    this.cols = options.cols;
  }

  draw() {
    push();

    // draw grid
    const modifier = (Config.grid.border.size / 2);
    strokeWeight(Config.grid.border.size);
    stroke(Config.grid.border.color);

    // draw rows
    for(let i = 1; i < this.rows; i++) {
      const y = (i * Config.grid.size) - modifier;
      line(0, y, width, y);
    }

    // draw cols
    for(let i = 1; i < this.cols; i++) {
      const x = (i * Config.grid.size) - modifier;
      line(x, 0, x, height);
    }


    // set cell style
    noStroke();
    fill(Config.grid.cellColor);

    // draw alive cells
    (this.cells).map((cellCoords) => {
      const exploded = cellCoords.split("x");
      const row = parseInt(exploded[0]);
      const col = parseInt(exploded[1]);

      const x = ((col - 1) * Config.grid.size);
      const y = ((row - 1) * Config.grid.size);

      if((x >= 0 && x < width) && (y >= 0 && y < height)) { // only draw cells that are inside visible grid
        rect(x, y, (Config.grid.size - Config.grid.border.size), (Config.grid.size - Config.grid.border.size));
      }
    });

    pop();
  }


  update() {
    let coordsToCheck = (this.cells).slice(0); // get base array of all alive cells
    coordsToCheck.map((coord) => {
      const parsedCoords = Funcs.parseStringCoords(coord);

      // find all neighbors and add them to the array, while avoiding duplicates
      coordsToCheck = Funcs.uniqueConcatArrays(coordsToCheck, Funcs.getNeighborCoords(parsedCoords.row, parsedCoords.col));
    });

    // filter list of coords to check to only have alive cells
    this.cells = coordsToCheck.filter((coord) => {
      const parsedCoords = Funcs.parseStringCoords(coord);

      let neighborCount = 0;
      const neighborsToCheck = Funcs.getNeighborCoords(parsedCoords.row, parsedCoords.col);

      neighborsToCheck.map((coordToCheck) => {
        // count all the alive cell neighbors
        if((this.cells).indexOf(coordToCheck) >= 0) { // neighbor cell is alive
          neighborCount++;
        }
      });


      if((this.cells).indexOf(coord) >= 0) { // check if currect cell is alive
        if(neighborCount === 2 || neighborCount === 3) {
          return true; // cell lives on to the next generation
        } else {
          return false; // cell dies
        }
      } else { // the cell is dead (is a neighboring cell of an alive cell)
        if(neighborCount === 3) {
          return true; // cell becomes alive
        } else {
          return false; // cell stays dead
        }
      }
    });
  }


  handleClick(options) {
    const xPos = options.mouse.x;
    const yPos = options.mouse.y;

    if((xPos >= 0 && yPos >= 0) && (xPos <= width && yPos <= height)) { // make sure player is clicking the canvas
      const row = Math.floor(options.mouse.y / Config.grid.size) + 1;
      const col = Math.floor(options.mouse.x / Config.grid.size) + 1;
      const rowAndCol = Funcs.toStringCoords(row, col);

      //console.log(`Clicked at: (${xPos}, ${yPos}) [x, y] || (${row}, ${col}) [row, col]`);

      const index = (this.cells).indexOf(rowAndCol);
      if(index < 0) {
        (this.cells).push(rowAndCol);
      } else {
        (this.cells).splice(index, 1);
      }
    }
  }

  save() {
    return window.btoa((this.cells).join("|"));
  }
  load(saveData) {
    try {
      const decodedBase64 = window.atob(saveData);
      let loadedCoords = decodedBase64.split("|");
      loadedCoords = loadedCoords.filter((coord) => {
        if(new RegExp("([-]?[0-9]+x[-]?[0-9]+)").test(coord)) {
          return true;
        } else {
          return false;
        }
      });
      if(loadedCoords.length <= 0) {
        throw new Error("Could not find any valid coords!");
      }

      this.cells = loadedCoords;
      return true;
    } catch(err) {
      return false;
    }
  }

  reset() {
    Funcs.setGameState(false);
    this.cells = [];
  }
}