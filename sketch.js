//variable declarations
console.log("sketch file loaded");

let font;



let colors = [];

var w = window.innerWidth;
var h = window.innerHeight;  

//icons
let insta1 = [];


//# of iterations per icon
let iconNum = 1;

//declaring icon as arrays (for placement)
let icon_instagram = [];

let userText = [];
let useTransparentBackground = false; // Variable to track background state

// Add a constant to limit the max number of text objects

// Add this global variable at the top of your file with other globals
//let targetSound;

// Function to be called when the submit button is clicked
function handleInput() {
  console.log("handleInput function called");
  const inputText = document.getElementById('textbox').value;
  console.log("Input text:", inputText);
  
  if (inputText) {
   
  
    insta1.push(new Insta(random(windowWidth), random(windowHeight), inputText));
    // Randomly call either textEffectOne or textEffectTwo
    if (random() < 0.5) {
      console.log("text effect one applied");
      textEffectOne();
    } else {
      console.log("text effect two applied");
      textEffectTwo();
    }
  }
}

//loading + declaring image files
function preload(){
  font = loadFont('fonts/Noto Sans/NotoSans-VariableFont_wdth,wght.ttf');
  
  // Load sound file - replace 'sound.mp3' with your actual sound file path
  //targetSound = loadSound('media/letter-audios.mp3');
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.position(0, 0);
  canvas.style('z-index', '1');
  console.log("setup running");

  colors[0] = color(45, 244, 0); // Initialize colors
  colors[1] = color(0, 100, 255);
  colors[2] = color(255,0,0);
  
  // Try to find the submit button directly
  const submitButton = document.querySelector('button[type="submit"]') || 
                       document.getElementById('submit-button') ||
                       document.querySelector('input[type="submit"]');
  
  if (submitButton) {
    console.log("Submit button found:", submitButton);
    submitButton.addEventListener('click', function(event) {
      console.log("Submit button clicked");
      event.preventDefault(); // Prevent page reload
      handleInput();
      document.getElementById('textbox').value = ''; // Clear input field
    });
  } else {
    console.error("Submit button not found");
    
    // Fallback: try to attach to the form
    const form = document.querySelector('form') || document.getElementById('input-form');
    if (form) {
      console.log("Form found:", form);
      form.addEventListener('submit', function(event) {
        console.log("Form submitted");
        event.preventDefault();
        handleInput();
        document.getElementById('textbox').value = '';
      });
    } else {
      console.error("Form element not found");
      
      // Last resort: check if there's a keypress event on the textbox
      const textbox = document.getElementById('textbox');
      if (textbox) {
        console.log("Textbox found, adding keypress listener");
        textbox.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
            console.log("Enter key pressed in textbox");
            event.preventDefault();
            handleInput();
            textbox.value = '';
          }
        });
      } else {
        console.error("Textbox element not found");
      }
    }
  }
}



  


function draw() {

  
  // Apply the appropriate background based on the current effect
  if (useTransparentBackground) {

    background(0, 0, 0, 0); 
  } else {
    background(255); 
  }

  scene0();
}


function scene0() {
//console.log("scene 0 running, insta1:", insta1);
  for (let i = 0; i < insta1.length; i++){
  //console.log(`drawing text ${i}:`, insta1[i].text, 'at', insta1[i].x, insta1[i].y);
  insta1[i].body()
  insta1[i].move()
 
  }

  }


//declaring icons for scene 0
/* INSTA ICON */
class Insta{
  constructor(x,y, inputText){
	this.x = x;
	this.y = y;
    this.text = inputText;
    console.log("Text as received:", this.text);
  }
  
  body(){
    textFont(font)
    noStroke(); 
    fill(random(colors), random(colors), random(colors));
    
    let specialText = [//25 most common nouns
    "time", "first", "friends", "school", "things",
    "something", "year", "life", "day", "work",
    "everything", "love", "lot", "people", "future",
    "letter", "moment", "experience", "days", "part",
    "growth", "self", "person", "memories", "world",
    "home", "journey", "story", "change", "path",
     //potential responses in relation to scent
    "know", "soft", "youth", "future", "letters", 
    "curious", "kind", "tender", "free", "time", "past", "now",
     "garden"];
    
    let content = document.getElementById('letters');
    let opacity = parseFloat(content.style.opacity) || 0;
    
    
    let matchFound = false;
    let targetWord = "";
    for (let word of specialText) {
      if (this.text.includes(word)) {
        targetWord = word;
        matchFound = true;
        console.log("Found word:", targetWord);
        break;
      }
    }
    
    if (matchFound) {
      // if (audio) {
      //   if (audio.paused) {
      //     audio.play().catch(e => {
      //       console.log("audio play failed", e);
      //     });
      //   }
      //   audio.volume = 0.1;
      // }
      // Simple sound playback - just play the sound once when match is found
      // if (targetSound && !targetSound.isPlaying()) {
      //   targetSound.play();
      // }
      
      //fill(0, 0, 100);
      
      opacity = Math.min(opacity + 0.1, 0.7);
      console.log("opacity:", opacity);
      content.style.opacity = opacity;
    
      
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
      }
    } else {
      // Comment out all audio-related code
      /*
      if (audio) {
        audio.volume = 0;
      }
      */
      
      content.style.opacity = 0;
      //fill(random(colors), random(colors), random(colors));
    }
    
    text(this.text, this.x, this.y);
  }

  
  
  move(){
    this.y++;
    if (this.y>height){
      this.y=0;
      this.x = random(windowWidth);
    }
  }
  remove(){
    this.x = -100;
    this.y = -100;
  }

}

function textEffectOne() {
  useTransparentBackground = false;
  textSize(random(20, 50));
  stroke(0);
  strokeWeight(2);
  console.log("Text effect one applied - Bold text with stroke on white background");
}

function textEffectTwo() {
  useTransparentBackground = true;
  noStroke();
  textSize(30); // Fixed size for contrast with effect one
  console.log("Text effect two applied - Normal text without stroke on transparent background");
}

// Add a global function that can be called from HTML
window.submitText = function() {
  console.log("submitText function called from HTML");
  handleInput();
  document.getElementById('textbox').value = '';
  return false; // Prevent form submission
};

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w,h);
}


