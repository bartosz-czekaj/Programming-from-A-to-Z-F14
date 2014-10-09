// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// A simple box-fitting algorithm
// In an HTML5 Canvas

// An array of boxes
var boxes = [];
// Size of the box
var boxsize = 400;

function setup() {
  // Make a canvas
  createCanvas(800,600);
}

function draw() {
  // Clear the canvas
  clear();
  
  // Show all the boxes
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }

  
  // Did we find a valid box?
  var found = false;

  // How many times have we tried?
  var count = 0;

  // Keep trying until we find one
  while (!found) {
    // Make a new box
    var b = new Box(boxsize);
    // Does it fit on the screen?
    if (b.fits(boxes)) {
      // If so add it to the list
      boxes.push(b);
      found = true;
    }
    
    // Have we tried so many times we should stop trying?
    count++;
    if (count > 5000) {
      break;
    }
  }

  // Start with big boxes, shrink them over time
  if (boxsize > 32) { 
    boxsize--;

  // If we can't find spots with small boxes we're done
  } else if (!found) {
    noLoop();
  } 
}

// A box has x,y,width,height
function Box(size) {
  this.x = random(width);
  this.y = random(height);
  this.w = random(size/10,size);
  this.h = random(size/10,size);
  
  // What the heck, a random color
  this.bright = random(255);

  
  // Draw the rectangle
  this.display = function() {
    strokeWeight(2);
    stroke(0);
    fill(0,this.bright);
    rectMode(CORNER);
    rect(this.x,this.y,this.w,this.h);
  }
  
  // Is this box off the screen?
  this.offscreen = function() {
    // A 2 pixel buffer
    var buffer = 2;
    if (this.x + this.w + buffer  > width)  return true;
    if (this.y + this.h + buffer  > height) return true;
    return false;
  }

  // Does this box overlap another box?
  this.overlaps = function(other) {
    var buffer = 2;
    
    // If it's to the right it does not
    if (this.x                   > other.x + other.w + buffer) return false;
    // If it's to the left it does not
    if (this.x + this.w + buffer < other.x)                    return false;
    // If it's below it does not
    if (this.y                   > other.y + other.h + buffer) return false;
    // If it's above it does not
    if (this.y + this.h + buffer < other.y)                    return false;
    // Well if none of these are true then it overlaps
    return true; 
  }
  
  // Check if this box fits on the screen
  // i.e. it does not overlap any other boxes
  this.fits = function(boxes) {
    // If it's off the screen we don't like it
    if (this.offscreen()) {
      return false;
    }

    // If it overlaps any other box we don't like it
    for (var i = 0; i < boxes.length; i++) {
      if (this.overlaps(boxes[i])) {
        return false;
      }
    }
    // Hey, it's ok!
    return true;
  }
}

