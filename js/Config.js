class Config {
  static baseFps = 10;

  static canvas = {
    container: "sketchContainer",
    baseColor: $("body").css("background-color") // modify this in style.css
  };

  static grid = {
    size: 25,
    cellColor: "#212121",

    border: {
      size: 4,
      color: "#cdcdcd"
    }
  };

  static debug = {
    textColor: "#212121",
    showInfo: false
  };


  static icons = {
    save: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM288 64v96H96V64h192zm128 368c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h16v104c0 13.255 10.745 24 24 24h208c13.255 0 24-10.745 24-24V64.491a15.888 15.888 0 0 1 7.432 4.195l83.882 83.882A15.895 15.895 0 0 1 416 163.882V432zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 144c-30.879 0-56-25.121-56-56s25.121-56 56-56 56 25.121 56 56-25.121 56-56 56z"/></svg>`,
    play_circle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zM40 256c0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216zm331.7-18l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM192 335.8V176.9c0-4.7 5.1-7.6 9.1-5.1l134.5 81.7c3.9 2.4 3.8 8.1-.1 10.3L201 341c-4 2.3-9-.6-9-5.2z"/></svg>`,
    pause_circle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M218 160h-20c-3.3 0-6 2.7-6 6v180c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V166c0-3.3-2.7-6-6-6zm96 0h-20c-3.3 0-6 2.7-6 6v180c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V166c0-3.3-2.7-6-6-6zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216z"/></svg>`,
    upload: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M452 432c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20zm-84-20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm144-48v104c0 24.3-19.7 44-44 44H44c-24.3 0-44-19.7-44-44V364c0-24.3 19.7-44 44-44h124v-99.3h-52.7c-35.6 0-53.4-43.1-28.3-68.3L227.7 11.7c15.6-15.6 40.9-15.6 56.6 0L425 152.4c25.2 25.2 7.3 68.3-28.3 68.3H344V320h124c24.3 0 44 19.7 44 44zM200 188.7V376c0 4.4 3.6 8 8 8h96c4.4 0 8-3.6 8-8V188.7h84.7c7.1 0 10.7-8.6 5.7-13.7L261.7 34.3c-3.1-3.1-8.2-3.1-11.3 0L109.7 175c-5 5-1.5 13.7 5.7 13.7H200zM480 364c0-6.6-5.4-12-12-12H344v24c0 22.1-17.9 40-40 40h-96c-22.1 0-40-17.9-40-40v-24H44c-6.6 0-12 5.4-12 12v104c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12V364z"/></svg>`,
    redo_alt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M457.4 9.4l-50.1 50.1C365.4 27.2 312.8 8 255.8 8 119.2 8.1 7.7 119.8 8 256.5S119.2 504 256 504c63.9 0 122.2-24.2 166.2-63.9 5.1-4.6 5.4-12.6.5-17.4l-7.1-7.1c-4.5-4.5-11.7-4.7-16.5-.5-39 35.1-89.4 54.9-143.1 54.9-118 0-214-95.6-214-214 0-118 95.6-214 214-214 46.5 0 90.7 14.9 127 41.7l-53.6 53.6c-20.1 20.1-5.9 54.6 22.6 54.6h128c17.7 0 32-14.3 32-32V32c0-28.5-34.6-42.7-54.6-22.6zM480 160H352L480 32z"/></svg>`
  };
}