class Funcs {
  // takes two numbers and combines them into a valid string coord
  static toStringCoords(row, col) {
    return `${row}x${col}`;
  }
  // takes a string version of coords and splits them into an object
  static parseStringCoords(rowAndCol) {
    const exploded = rowAndCol.split("x");

    return {
      row: parseInt(exploded[0]),
      col: parseInt(exploded[1])
    };
  }


  static setGameState(state) {
    let icon = $(`header button[data-action="toggle_play"]`).find("icon");
    gameRunning = state;

    if(gameRunning) {
      $("#sketchContainer canvas").css("cursor", "not-allowed");
    } else {
      $("#sketchContainer canvas").css("cursor", "pointer");
    }

    togglePlayTooltip.updateTitleContent((gameRunning ? `Stop game` : `Start game`));
    const iconToUse = (gameRunning ? "pause_circle" : "play_circle");
    if(Config.icons.hasOwnProperty(iconToUse)) {
      icon.attr("data-id", iconToUse);
      icon.html(Config.icons[iconToUse]);
    }
  }

  static toggleGameState() {
    Funcs.setGameState(!gameRunning);
  }


  // get the string coords of all the neighbor coords
  static getNeighborCoords(row, col) {
    return [
      Funcs.toStringCoords((row - 1), (col - 1)),
      Funcs.toStringCoords((row - 1), col),
      Funcs.toStringCoords((row - 1), (col + 1)),

      Funcs.toStringCoords(row, (col - 1)),
      Funcs.toStringCoords(row, (col + 1)),

      Funcs.toStringCoords((row + 1), (col - 1)),
      Funcs.toStringCoords((row + 1), col),
      Funcs.toStringCoords((row + 1), (col + 1))
    ];
  }

  // take two arrays and return one array without duplicates
  static uniqueConcatArrays(array1, array2) {
    array1 = array1 || [];
    array2 = array2 || [];

    const combinedArray = array1.concat(array2.filter((value) => {
      return array1.indexOf(value) === -1;
    }));

    return combinedArray;
  }
}