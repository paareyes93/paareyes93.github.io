var bg;
var logo;
var logo_animation;
var tile_sprite_sheet;
var tile_frames = [
	{"name":"ground", "frame":{"x":0, "y": 0, "width": 92, "height": 92}},
	];
var botones_sprite_sheet;
var botones_frames = [
	{"name":"boton_instrucciones", "frame":{"x":0, "y": 0, "width": 251, "height": 95.5}},
	{"name":"boton_inicio", "frame":{"x":0, "y": 95.5, "width": 251, "height": 95.5}},
	];	

function preload() {
  logo = loadSpriteSheet('assets/logo_sprite_sheet.png', 380.2, 345, 10);
  logo_animation = loadAnimation(logo);

	tile_sprite_sheet = loadSpriteSheet('assets/tiles_spritesheet.png', tile_frames);
	botones_sprite_sheet = loadSpriteSheet('assets/botones.png', botones_frames);
}

function setup() {
	bg = loadImage("assets/fondo.png");
  createCanvas(1280, 720);
  
}

function draw() {
	background(bg);
	
	for (var x = 0; x < 1280; x += 91) {
    tile_sprite_sheet.drawFrame('ground', x, 628);
  }
  
  botones_sprite_sheet.drawFrame('boton_inicio', width*0.12, height*0.68);
  botones_sprite_sheet.drawFrame('boton_instrucciones', width*0.7, height*0.68);
  
  animation(logo_animation, width/2, height/3);

}