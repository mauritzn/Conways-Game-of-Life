let canvas = null;
let grid = null;
let gameRunning = false;
let togglePlayTooltip = null;

function setup() {
  canvas = createCanvas(windowWidth, (windowHeight - parseInt($("header").css("height"))));
  canvas.parent(Config.canvas.container);
  frameRate(Config.baseFps);

  $("header").css("border-color", Config.grid.border.color);

  $("body").on("click", function(event) {
    $(`popdown[data-id]`).stop().slideUp(250);
  });
  $("body").on("click", `popdown[data-id], button[data-action]`, function(event) {
    event.stopPropagation();
  });

  $("body").on("click", `#${Config.canvas.container}`, function(event) {
    event.preventDefault();

    if(gameRunning === false) {
      grid.handleClick({
        mouse: {
          x: event.offsetX,
          y: event.offsetY
        }
      });
    }
  });


  $("icon").each(function() {
    const id = $(this).attr("data-id");

    if(Config.icons.hasOwnProperty(id)) {
      $(this).html(Config.icons[id]);
    }
  });

  $("body").on("click", `button[data-action]`, function(event) {
    event.preventDefault();
    const action = $(this).attr("data-action");
    console.log(`Action: "${action}"`);

    if(action === "toggle_play") {
      Funcs.toggleGameState();
    } else if(action === "save_grid" || action === "load_grid") {
      Funcs.setGameState(false);

      $(`popdown:not([data-id="${action}"])`).stop().slideUp(250, function() {
        if(action === "save_grid") {
          if(grid.save().length > 0) {
            $(`textarea[name="saved_grid_data"]`).val(grid.save());
          } else {
            $(`textarea[name="saved_grid_data"]`).val("Nothing to save");
          }
        }

        $(`popdown[data-id="${action}"]`).stop().slideToggle(250, function() {
          if($(this).css("display") === "none") {
          } else {
            if(action === "save_grid") {
              if(grid.save().length > 0) {
                $(`textarea[name="saved_grid_data"]`).select();
              }
            } else if(action === "load_grid") {
              $(`textarea[name="load_grid_data"]`).focus();
            }
          }
        });
      });
    } else if(action === "reset_grid") {
      grid.reset();
    }

    $(this).blur();
  });

  $("body").on("submit", `form#load_grid_form`, function(event) {
    event.preventDefault();
  });
  $("body").on("click", `textarea[name="saved_grid_data"]`, function(event) {
    event.preventDefault();
    $(`textarea[name="saved_grid_data"]`).select();
  });
  $("body").on("click", `button#submit_load_grid_form`, function(event) {
    event.preventDefault();
    const textarea = $(`form#load_grid_form`).find("textarea");
    const data = textarea.val();

    if(data.length > 0) {
      grid.reset();
      if(grid.load(data)) {
        $(`popdown[data-id="load_grid"]`).stop().slideUp(250, () => {
          textarea.val("");
        });
      } else {
        alert("Could not load saved grid! Please make sure the save data is valid!");
      }
    }
  });


  new Tooltip($(`button[data-action="reset_grid"]`)[0], {
    placement: "right",
    title: `Reset grid`,
    container: $("body")[0]
  });
  togglePlayTooltip = new Tooltip($(`button[data-action="toggle_play"]`)[0], {
    placement: "right",
    title: `Start game`,
    container: $("body")[0]
  });
  new Tooltip($(`button[data-action="load_grid"]`)[0], {
    placement: "left",
    title: `Load grid`,
    container: $("body")[0]
  });
  new Tooltip($(`button[data-action="save_grid"]`)[0], {
    placement: "left",
    title: `Save grid`,
    container: $("body")[0]
  });


  // create grid system
  grid = new Grid({
    rows: Math.ceil(height / Config.grid.size),
    cols: Math.ceil(width / Config.grid.size)
  });
}

function draw() {
  noStroke();
  background(Config.canvas.baseColor);

  grid.draw();
  if(gameRunning) {
    grid.update(); // update cells in grid (checking if they should live or die)
    if(grid.cells.length <= 0) {
      grid.reset();
    }
  }

  // draw debug stuff
  if(Config.debug.showInfo) {
    push();
    fill("rgba(255,255,255,0.5)");
    rect(0, 0, 185, 200);

    textSize(16);
    textAlign(LEFT, TOP);
    fill(Config.debug.textColor);
    text(`${width}x${height}`, 10, 10);

    text(`Grid size: ${Config.grid.size}`, 10, 45);
    text(`Rows: ${grid.rows}`, 10, 65);
    text(`Cols: ${grid.cols}`, 10, 85);

    text(`Visible cells: ${grid.rows * grid.cols}`, 10, 115);
    text(`Alive cells: ${grid.cells.length}`, 10, 135);

    text(`Gaming running: ${(gameRunning ? "true" : "false")}`, 10, 170);
    pop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, (windowHeight - parseInt($("header").css("height"))));

  // resize grid system
  grid.resizeGrid({
    rows: Math.ceil(height / Config.grid.size),
    cols: Math.ceil(width / Config.grid.size)
  });
}


function keyPressed() {
  if(keyCode !== 255) {
    if(keyCode === 32) { // 32 => spacebar | starts the game
      Funcs.toggleGameState();
      console.log(`Game is running: ${(gameRunning === true ? "true" : "false")}`);
    }
    if(keyCode === 118) { // 118 => F7 | toggle debug info
      Config.debug.showInfo = !Config.debug.showInfo;
    }

    if(!gameRunning) {
      if(keyCode === 120) { // 120 => F9 | set a template pattern
        Funcs.setGameState(false);
        grid.cells = ["12x2", "13x2", "13x3", "12x3", "12x12", "13x12", "14x12", "15x13", "11x13", "10x14", "10x15", "16x14", "16x15", "13x16", "11x17", "15x17", "14x18", "13x18", "12x18", "13x19", "12x22", "12x23", "11x22", "11x23", "10x22", "10x23", "9x24", "13x24", "13x26", "14x26", "9x26", "8x26", "10x36", "10x37", "11x36", "11x37"];
      }
    }

    if(keyCode === ESCAPE) { // reset game
      grid.reset();
    }
  }
}