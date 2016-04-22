var mouse_movimiento = false;
var touch_started = false;
var bg;
var personaje;
var personaje_caminar;
var personaje_parado;
var jugador_sprite;
var piso_sprite;
var piso_elevado_sprite;
var GRAVITY;
var donas_rosadas;
var tile_sprite_sheet;
var tile_frames = [
	{"name":"piso_center", "frame":{"x":504, "y": 288, "width": 72, "height": 72}},
	{"name":"piso_up", "frame":{"x":792, "y": 144, "width": 72, "height": 72}},
	{"name":"piso_right", "frame":{"x":648, "y": 792, "width": 72, "height": 72}},
	{"name":"piso_left", "frame":{"x":504, "y": 792, "width": 72, "height": 72}},
	{"name":"piso_elevado_center", "frame":{"x":648, "y": 648, "width": 72, "height": 72}},
	{"name":"piso_elevado_right", "frame":{"x":792, "y": 648, "width": 72, "height": 72}},
	{"name":"piso_elevado_left", "frame":{"x":432, "y": 720, "width": 72, "height": 72}},
	{"name":"flecha_right", "frame":{"x":288, "y": 216, "width": 72, "height": 72}},
	{"name":"puerta_center", "frame":{"x":648, "y": 288, "width": 72, "height": 72}},
	{"name":"puerta_up", "frame":{"x":648, "y": 216, "width": 72, "height": 72}},
	{"name":"agua_center", "frame":{"x":504, "y": 216, "width": 72, "height": 72}},
	{"name":"agua_up", "frame":{"x":432, "y": 576, "width": 72, "height": 72}},
	{"name":"caja_tierra", "frame":{"x":216, "y": 0, "width": 72, "height": 72}},
	{"name":"caja_alerta", "frame":{"x":0, "y": 0, "width": 72, "height": 72}},
	{"name":"caja_x", "frame":{"x":0, "y": 792, "width": 72, "height": 72}},
	{"name":"caja_/", "frame":{"x":0, "y": 864, "width": 72, "height": 72}},
	];

function preload() {
	tile_sprite_sheet = loadSpriteSheet('assets/tiles_spritesheet_2.png', tile_frames);
	personaje = loadSpriteSheet('assets/personaje_spritesheet.png', 75.11, 124, 9);
	personaje_caminar = loadAnimation(personaje);
	personaje_parado = loadAnimation(new SpriteSheet('assets/personaje_spritesheet.png',
	[{"name":"personaje_parado", "frame":{"x":0, "y": 0, "width": 75.11, "height": 124}}]));
}

function setup() {
	createCanvas(1280, 720);
	bg = loadImage("assets/fondo.png");
	
	GRAVITY = 0.4;
  
  jugador_sprite = createSprite(0.05 * width, 0.9 * height, 75.11, 124);
	jugador_sprite.addAnimation('caminar', personaje_caminar);
  jugador_sprite.addAnimation('parado', personaje_parado);
  jugador_sprite.setCollider('rectangle', 0, 0, 75.11, 115);
  jugador_sprite.debug = false;
  
  piso_1_sprite = createSprite(0, height*0.97, width*0.33, height*0.066);
  piso_1_sprite.shapeColor =  color(255, 0, 0, 0);
  piso_1_sprite.debug = false;
  
  piso_2_sprite = createSprite(width*0.226, height*0.93, width*0.27, height*0.17);
  piso_2_sprite.shapeColor =  color(255, 0, 0, 0);
  piso_2_sprite.debug = false;
  
  piso_3_sprite = createSprite(width*0.53, height*0.92, width*0.06, height*0.17);
  piso_3_sprite.shapeColor =  color(255, 0, 0, 0); 
  piso_3_sprite.debug = false;
  
  piso_4_sprite = createSprite(width*0.84, height*0.89, width*0.38, height*0.24);
  piso_4_sprite.shapeColor =  color(255, 0, 0, 0);
  piso_4_sprite.debug = false;
  
  piso_elevado_1_sprite = createSprite(width*0.38, height*0.58, width*0.26, height*0.055);
  piso_elevado_1_sprite.shapeColor =  color(255, 0, 0, 0);
  piso_elevado_1_sprite.debug = false;
  
  piso_elevado_2_sprite = createSprite(width*0.85, height*0.48, width*0.21, height*0.055);
  piso_elevado_2_sprite.shapeColor =  color(255, 0, 0, 0);
  piso_elevado_2_sprite.debug = false;
  
  cajas_1_sprite = createSprite(width*0.135, height*0.3, width*0.18, height*0.09);
  cajas_1_sprite.shapeColor =  color(255, 0, 0, 0);
  cajas_1_sprite.debug = false;
  
  cajas_2_sprite = createSprite(width*0.655, height*0.25, width*0.12, height*0.09);
  cajas_2_sprite.shapeColor =  color(255, 0, 0, 0);
  cajas_2_sprite.debug = false;
  
  cajas_x_1_sprite = createSprite(width*0.226, height*0.795, width*0.056, height*0.1);
  cajas_x_1_sprite.addImage(loadImage('assets/caja_x.png'));
  cajas_x_1_sprite.debug = false;
  
  cajas_x_2_sprite = createSprite(width*0.726, height*0.72, width*0.056, height*0.1);
  cajas_x_2_sprite.addImage(loadImage('assets/caja_x.png'));
  cajas_x_2_sprite.debug = false;
  
  cajas_s_1_sprite = createSprite(width*0.35, height*0.5, width*0.056, height*0.1);
  cajas_s_1_sprite.addImage(loadImage('assets/caja_s.png'));
  cajas_s_1_sprite.debug = false;
  
  donas_rosadas = new Group();
  
  for(var i=0; i<10; i++)
    {
    var dot = createSprite(random(0, width), random(0,height*0.75));
    dot.addImage(loadImage('assets/dona_rosada01.png'));
    donas_rosadas.add(dot);
    }

}

function draw() {
	background (bg);
	
	for (var x = width*0.35; x < width*0.7; x += 70) {
  tile_sprite_sheet.drawFrame('agua_center', x, height*0.935);
  }
  for (var x = width*0.35; x < width*0.7; x += 70) {
  tile_sprite_sheet.drawFrame('agua_up', x, height*0.84);
  }
  
  tile_sprite_sheet.drawFrame('caja_tierra', width*0.05, height*0.25);
  tile_sprite_sheet.drawFrame('caja_alerta', width*0.105, height*0.25);
  tile_sprite_sheet.drawFrame('caja_tierra', width*0.16, height*0.25);
  
  tile_sprite_sheet.drawFrame('caja_tierra', width*0.6, height*0.2);
  tile_sprite_sheet.drawFrame('caja_alerta', width*0.655, height*0.2);
  
  tile_sprite_sheet.drawFrame('flecha_right', width*0.1, height*0.745);
  tile_sprite_sheet.drawFrame('puerta_center', width*0.93, height*0.675);
  tile_sprite_sheet.drawFrame('puerta_up', width*0.93, height*0.578);
  

  for (var x = width*0.08; x < width*0.3; x += 70) {
  tile_sprite_sheet.drawFrame('piso_center', x, height*0.935);
  }
  for (var x = width*0.08; x < width*0.3; x += 70) {
  tile_sprite_sheet.drawFrame('piso_up', x, height*0.84);
  }
  for (var x = 0; x < width*0.15; x += 70) {
  tile_sprite_sheet.drawFrame('piso_up', x, height*0.935);
  }

  tile_sprite_sheet.drawFrame('piso_elevado_left', width*0.25, height*0.55);
  for (var x = width*0.3; x < width*0.45; x += 70) {
  tile_sprite_sheet.drawFrame('piso_elevado_center', x, height*0.55);
  }
  tile_sprite_sheet.drawFrame('piso_elevado_right',width*0.45, height*0.55);
	
	for (var x = width*0.7; x < width; x += 70) {
  tile_sprite_sheet.drawFrame('piso_center', x, height*0.95);
  }
  for (var x = width*0.7; x < width; x += 70) {
  tile_sprite_sheet.drawFrame('piso_center', x, height*0.86);
  }
  for (var x = width*0.7; x < width; x += 70) {
  tile_sprite_sheet.drawFrame('piso_up', x, height*0.77);
  }
  for (var x = width*0.9; x < width; x += 70) {
  tile_sprite_sheet.drawFrame('piso_up', x, height*0.9);
  }
  tile_sprite_sheet.drawFrame('piso_left', width*0.65, height*0.77);
  
	tile_sprite_sheet.drawFrame('piso_elevado_left', width*0.75, height*0.45);
  for (var x = width*0.8; x < width*0.9; x += 70) {
  tile_sprite_sheet.drawFrame('piso_elevado_center', x, height*0.45);
  }
  tile_sprite_sheet.drawFrame('piso_elevado_right',width*0.9, height*0.45);
  
  tile_sprite_sheet.drawFrame('piso_center', width*0.5, height*0.92);
  tile_sprite_sheet.drawFrame('piso_up', width*0.5, height*0.83);
  
  jugador_sprite.overlap(donas_rosadas, collect);
	
	jugador_sprite.collide(piso_1_sprite);
	jugador_sprite.collide(piso_2_sprite);
	jugador_sprite.collide(piso_3_sprite);
	jugador_sprite.collide(piso_4_sprite);
	jugador_sprite.collide(piso_elevado_1_sprite);
	jugador_sprite.collide(piso_elevado_2_sprite);
	jugador_sprite.collide(cajas_1_sprite);
	jugador_sprite.collide(cajas_2_sprite);
	jugador_sprite.displace(cajas_x_1_sprite);
	jugador_sprite.displace(cajas_x_2_sprite);
	jugador_sprite.displace(cajas_s_1_sprite);
	
	cajas_x_1_sprite.collide(piso_1_sprite);
	cajas_x_1_sprite.collide(piso_2_sprite);
	
	cajas_x_2_sprite.collide(piso_4_sprite);
	
	cajas_s_1_sprite.collide(piso_elevado_1_sprite);
	cajas_s_1_sprite.collide(piso_3_sprite);
	
  jugador_sprite.velocity.y = jugador_sprite.velocity.y + GRAVITY;
  //cajas_x_1_sprite.velocity.y = cajas_s_1_sprite.velocity.y + GRAVITY*10;
  //cajas_x_2_sprite.velocity.y = cajas_s_1_sprite.velocity.y + GRAVITY*10;
  cajas_s_1_sprite.velocity.y = cajas_x_1_sprite.velocity.y + GRAVITY*10;
  
var eventX;
  if (isTouch()) {
    eventX = mouseX;
  } else {
    eventX = mouseX;
  }

  if(eventX < jugador_sprite.position.x - 10) {
    jugador_sprite.changeAnimation('caminar');
    jugador_sprite.mirrorX(-1);
    jugador_sprite.velocity.x = - 2;
  }
  else if(eventX > jugador_sprite.position.x + 10) {
    jugador_sprite.changeAnimation('caminar');
    jugador_sprite.mirrorX(1);
    jugador_sprite.velocity.x = 2;
  }
  else {
    jugador_sprite.changeAnimation('parado');
    jugador_sprite.velocity.x = 0;
  }

  drawSprites();
}

function touchStarted() {
  touch_started = true;
}

function mouseMoved() {
  mouse_movimiento = true;
}

function isTouch() {
  return touch_started && !mouse_movimiento;
}

function mouseClicked() {
	jugador_sprite.velocity.y = -10;
}

function collect(collector, collected)
{
  collected.remove();
}




