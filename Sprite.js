var

chick_sp = {
	back: new Array(),
	front: new Array(),
	right: new Array(),
	left: new Array()
},

grassSet = {
	scale: [[], [], []]
};
/*
for (let i = 0; i < 3; i++){
	grassSet.scale[i] = ({
		sand: {
			grassy: new Array(),
			mountain: new Array(),
			foilage: new Array(),
			cornered: new Array()
		},
		grass: {
			lite: new Array(),
			mountain: new Array(),
			foilage: new Array(),
			cornered: new Array()
		},
		water: {
			grassy: new Array(),
			foilage: new Array(),

		},
		misc: {
		}
	});
}
*/
/*
function Sprite(copy){
	this.img = copy.img;
	this.x = copy.x;
	this.y = copy.y;
	this.width = copy.width;
	this.height = copy.height;
}
*/

function Sprite(img, x, y, width, height){
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function(ctx, x, y, scale){
		scale = scale || 1;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width*scale, this.height*scale);
	}
}


function Creature(ctx, x, y, dir){
	this.ctx = ctx;
	this.x = x || 0;
	this.y = y || 0;
	this.dir = dir || 0;

	this.update = function(){



	}
}

function Chicken(ctx, x, y, dir){
	Creature.call(this, ctx, x, y, dir);

	this.state = 0;
	this.animArr = [chick_sp.back, chick_sp.right, chick_sp.front, chick_sp.left];
	this.currFrame = 0;

	this.draw = function(){
		let modFrame = (this.currFrame === 3) ? 1 : this.currFrame;
		this.animArr[this.dir][modFrame].draw(this.ctx, this.x, this.y, 1);
		if (this.state === 1 && frames%14 === 0	){
			if (this.currFrame === 3){
				this.currFrame = 0;
				this.state = 0;
			}	
			else {
				this.currFrame++;
			}
		}
	}

	this.feed = function(){
		this.animArr[this.dir][this.currFrame].draw(this.ctx, this.x, this.y);
		this.currFrame += (this.currFrame === 2) ? -2 : 1;
	}
	this.update = function(){

		if (this.currFrame == 0){
			if (Math.random() < .005){
				this.dir = Math.floor(Math.random()*4);
			}
			if (Math.random() < .005){
				this.state = 1;
			}
		}
	}

	this.render = function(){
		this.draw();
	}

}

function initChicken(src){

	for (let i = 0; i < 12; i++){
		if (i < 3){
			chick_sp.back[i%3] = (new Sprite(src, (i%3)*32, Math.floor(i/3)*32, 32, 32));
		}
		else if (i < 6){
			chick_sp.left.push(new Sprite(src, (i%3)*32, Math.floor(i/3)*32, 32, 32));
		}
		else if (i < 9){
			chick_sp.front.push(new Sprite(src, (i%3)*32, Math.floor(i/3)*32, 32, 32));
		}
		else {
			chick_sp.right.push(new Sprite(src, (i%3)*32, Math.floor(i/3)*32, 32, 32));
		}
	}
}
function initSpriteSheet(src, sc){
	let ind = Math.log(sc) / Math.log(2);
	for (let i = 0; i < 121; i++){
		grassSet.scale[ind].push(new Sprite(src, (1 + (i%11)*17)*sc, (1 + Math.floor(i/11)*17)*sc, 16*sc, 16*sc));
	}


}

/*
function initSpriteSheet(src, sc){
	let ind = (sc === 4) ? 2 : sc - 1;
	//3 by 3 bricks
	for (let i = 0; i < 9; i++){
		//GrassSand
		grassSet.scale[ind].sand.grassy.push(new Sprite(src, (1 + i%3*17)*sc, (1 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));
		//MountainSand
		grassSet.scale[ind].sand.mountain.push(new Sprite(src, (52 + i%3*17)*sc, (103 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));

		//LiteGrass
		grassSet.scale[ind].grass.lite.push(new Sprite(src, (1 + i%3*17)*sc, (52 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));
		//MountainGrass
		grassSet.scale[ind].grass.mountain.push(new Sprite(src, (52 + i%3*17)*sc, (103 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));
		
		//mountainWater
		grassSet.scale[ind].water.grassy.push(new Sprite(src, (103 + i%3*17)*sc, (137 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));
	}
	//2 by 2 bricks
	for (let i = 0; i < 4; i++){	
		//SandyGrass
		grassSet.scale[ind].sand.grassy.push(new Sprite(src, (52, + i%2*17)*sc, (1 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));
		//SingleCornerMountainSand
		grassSet.scale[ind].sand.cornered.push(new Sprite(src, (120, + i%2*17)*sc, (69 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));
		//DoubleCornerMountainSand
		grassSet.scale[ind].sand.cornered.push(new Sprite(src, (120, + i%2*17)*sc, (103 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));


		//MoreLiteGrass
		grassSet.scale[ind].grass.lite.push(new Sprite(src, (52 + i%2*17)*sc, (35 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));
		//SingleCornerMountainGrass
		grassSet.scale[ind].grass.cornered.push(new Sprite(src, (52 + i%2*17)*sc, (69 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));
		//DoubleCornerMountainGrass
		grassSet.scale[ind].grass.cornered.push(new Sprite(src, (69 + i%2*17)*sc, (69 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));

		//waterGrassCorner
		grassSet.scale[ind].water.grassy.push(new Sprite(src, (154 + i%2*17)*sc, (120 + Math.floor(i/2)*17)*sc, 16*sc, 16*sc));

	//4 by 1 bricks
		//grassy foilage
		grassSet.scale[ind].grass.foilage.push(new Sprite(src, (86 + i*17)*sc, 1*sc, 16*sc, 16*sc));
		//sand foilage
		grassSet.scale[ind].sand.foilage.push(new Sprite(src, (86 + i*17)*sc, 35*sc, 16*sc, 16*sc));

	}
	for (let i = 0; i < 4; i++){
		//lite grassy foilage
		grassSet.scale[ind].grass.foilage.push(new Sprite(src, (86 + i*17)*sc, 18*sc, 16*sc, 16*sc));

	}

	//3 by 2 bricks
	for (let i = 0; i < 6; i++){
		//Grass Mountain Extras 
		grassSet.scale[ind].grass.mountain.push(new Sprite(src, (1 + i%3*17)*sc, (154 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));
		//Sand Mountain Extras
		grassSet.scale[ind].sand.mountain.push(new Sprite(src, (52 + i%3*17)*sc, (154 + Math.floor(i/3)*17)*sc, 16*sc, 16*sc));

	}
	for (let i = 0; i < 2; i++){
		grassSet.scale[ind].grass.cornered.push(new Sprite(src, (86 + i*17)*sc, 52*sc, 16*sc, 16*sc));
		grassSet.scale[ind].sand.cornered.push(new Sprite(src, (86 + i*17)*sc, 52*sc, 16*sc, 16*sc));

		grassSet.scale[ind].water.foilage.push(new Sprite(src, 154*sc, (154 + i*17)*sc, 16*sc, 16*sc));
	}

	//misc sprites
		grassSet.scale[ind].sand.foilage.push(new Sprite(src, 154*sc, 35*sc, 16*sc, 16*sc));
		grassSet.scale[ind].water.foilage.push(new Sprite(src, 103*sc, 120*sc, 16*sc, 16*sc));
}
*/

function initSprites(){

	var imgPath = "res/im/";
	
	var imgNames = ["tilesheet.png", "scaled_tilesheet.png", "4xscaled_tilesheet.png"];
	for (let i = 0; i < 3; i++){
		img = new Image();
		img.onload = function() {
			initSpriteSheet(this, Math.pow(2, i));
		}
		img.src = imgPath + imgNames[i];
	}



	var img = new Image();
	img.onload = function() {
		initChicken(this);
		run();
	}
	img.src = imgPath + "chicken_eat.png";
}