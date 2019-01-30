
/*
* @param number width: The number of characters wide for the shape to be
* @param number height The number of characters high for the shape to be
* @returns an array of rows of characters
*/
const makeShape = (width, height) => {
  const SIDES = {
    TOP_LEFT: "┌",
    TOP_RIGHT: "┐",
    BOTTOM_LEFT: "└",
    BOTTOM_RIGHT: "┘",
    HORIZONTAL: "-",
    VERTICAL: "|",
  }
  
  const rows = [];
  
  for(let currentRow = 0; currentRow < height; currentRow++){
      for(let currentColumn = 0; currentColumn < width; currentColumn++){
        if(rows[currentRow] === undefined){
          rows[currentRow] = ""
        }
        if(currentColumn === 0 && currentRow === 0){
          rows[currentRow] += SIDES.TOP_LEFT;
        }
        else if(currentColumn === width - 1 && currentRow === 0){
          rows[currentRow] += SIDES.TOP_RIGHT;
        }
        else if(currentColumn === 0 && currentRow === height - 1){
          rows[currentRow] += SIDES.BOTTOM_LEFT;
        }
        else if(currentColumn === width - 1 && currentRow === height -1){
          rows[currentRow] += SIDES.BOTTOM_RIGHT;
        }
        else if(currentRow === 0 || currentRow === height-1){
          rows[currentRow] += SIDES.HORIZONTAL;
        }
        else if(currentColumn === 0 || currentColumn === width -1){
          rows[currentRow] += SIDES.VERTICAL;
        }
        else {
          rows[currentRow] += " ";
        }
      }
  }
  return rows;
}

const handleDrawClick = () => {
  //Parse width and height from page inputs
  const width = parseInt(document.getElementById("width-input").value);
  const height = parseInt(document.getElementById("height-input").value);

  //Validate input, create shape and render to page
  if(validateInput(width, height) === true){
    const shape = makeShape(width, height);
    //Adds a new line after each row of the shape and then concatenates the lines
    const renderedShape = shape.map(shapeRow => shapeRow + "<br/>").join('');
    document.getElementById("shape-draw-area").innerHTML = renderedShape;
  }
}

/*
* @returns boolean The validity of the input
* @param number | NaN width: The number of characters wide for the shape to be
* @param number | NaN height The number of characters high for the shape to be
* side effect: prints error to console and alerts if invalid
*/
const validateInput = (width, height) => {
  let valid = true;
    //Handles input being empty, filled with text rather than number, and other invalid values that cause parseInt to return NaN
  if(isNaN(width) || isNaN(height)){
    valid = false;
    alert("Invalid width or height, try entering numbers again");
    console.error(`Entered width or height are invalid`)
  }
  //Handles numbers too small to draw a valid shape
  else if(width < 4 || height < 4){
    valid = false;
    alert("Sorry, it's not possible to draw a shape that small. Try entering numbers larger than 4");
    console.error(`Entered width : ${width} and/or height: ${height} are too small`)
  }
  //Handles numbers too large to fit on a normal display and in cases of larger numbers not performant to draw
  else if(width > 100 || height > 100){
    valid = false;
    alert("Sorry, it's not possible to draw a shape that large. Try entering numbers less than 100");
    console.error(`Entered width : ${width} and/or height: ${height} are too large`)
  }
  return valid

}
