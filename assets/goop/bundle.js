(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){module.exports={tileSize:58,mapVerticalOffset:14}},{}],2:[function(require,module,exports){(function(){var GameState_Boot=require("./states/GameState_Boot");var GameState_Intro=require("./states/GameState_Intro");var GameState_Playing=require("./states/GameState_Playing");var game=new Phaser.Game(720,420,Phaser.AUTO,"game");game.state.add("Boot",GameState_Boot);game.state.add("Intro",GameState_Intro);game.state.add("Playing",GameState_Playing);game.loadStatsFromLocalStorage=function(){this.bestScore=localStorage.getItem("GoopFromSpace.bestScore")||0;this.bestTime=localStorage.getItem("GoopFromSpace.bestTime")||0};game.recordGameOutcome=function(score,time){this.loadStatsFromLocalStorage();this.bestScore=Math.max(this.bestScore,score);this.bestTime=Math.max(this.bestTime,time);this.lastScore=score;this.lastTime=time;localStorage.setItem("GoopFromSpace.bestScore",this.bestScore);localStorage.setItem("GoopFromSpace.bestTime",this.bestTime)};game.loadStatsFromLocalStorage();game.state.start("Boot");var toggleFullScreenButton=document.getElementById("toggleFullScreenButton");toggleFullScreenButton.onclick=function(e){if(game.scale.isFullScreen){game.scale.stopFullScreen()}else{game.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL;game.scale.startFullScreen(false)}e.preventDefault()}})()},{"./states/GameState_Boot":3,"./states/GameState_Intro":4,"./states/GameState_Playing":5}],3:[function(require,module,exports){var constants=require("../constants");var TransitionManager=require("./TransitionManager");function GameState_Boot(){}GameState_Boot.prototype={preload:function(){this.game.load.bitmapFont("digit","assets/goop/fonts/digit.png","assets/goop/fonts/digit.xml");this.game.load.image("star-background","assets/goop/title-scene/star-background.png");this.game.load.image("planet-background","assets/goop/title-scene/planet-background.png");this.game.load.image("space-goop-background","assets/goop/title-scene/space-goop-background.png");this.game.load.image("space-goop-background-2","assets/goop/title-scene/space-goop-background-2.png");this.game.load.image("title","assets/goop/title-scene/title.png");this.game.load.image("tap-to-play","assets/goop/title-scene/tap-to-play.png");this.game.load.audio("begin","assets/goop/audio/begin.wav");this.game.load.audio("jump","assets/goop/audio/jump.wav");this.game.load.audio("fall","assets/goop/audio/fall.wav");this.game.load.audio("splat","assets/goop/audio/splat.wav");this.game.load.audio("goop","assets/goop/audio/goop.wav");this.game.load.audio("hurt-fly","assets/goop/audio/hurt-fly.wav");this.game.load.audio("hurt-spider","assets/goop/audio/hurt-spider.wav");this.game.load.audio("music","assets/goop/audio/music.mp3");this.game.load.image("sky1","assets/goop/main-scene/sky1.png");this.game.load.image("sky2","assets/goop/main-scene/sky2.png");this.game.load.image("sky3","assets/goop/main-scene/sky3.png");this.game.load.image("sky4","assets/goop/main-scene/sky4.png");this.game.load.spritesheet("tileset","assets/goop/sprites/tileset.png",constants.tileSize,constants.tileSize,4,2,2);this.game.load.spritesheet("goop-sprites","assets/goop/sprites/goop-sprites.png",128,128,16);this.game.load.spritesheet("goop-blob-sprites","assets/goop/sprites/goop-blob-sprites.png",128,128,16);this.game.load.spritesheet("bug-sprites","assets/goop/sprites/bug-sprites.png",128,128,16);this.game.load.json("maps","assets/goop/maps.json");this.game.load.shader("cutoff-transition-shader","assets/goop/shaders/cutoff-transition-shader.frag");this.game.load.image("transition","assets/goop/fx/transition.png")},create:function(){this.game.transitions=new TransitionManager(this.game);this.game.state.start("Intro")}};module.exports=GameState_Boot},{"../constants":1,"./TransitionManager":6}],4:[function(require,module,exports){var formatTimeString=require("../util/formatTimeString");function GameState_Intro(){}GameState_Intro.prototype={create:function(){this.backgroundLayer1=this.game.add.tileSprite(0,0,720,420,"star-background");this.backgroundLayer2=this.game.add.tileSprite(0,0,720,420,"planet-background");this.backgroundLayer3=this.game.add.tileSprite(0,0,720,420,"space-goop-background");this.backgroundLayer4=this.game.add.tileSprite(0,0,720,420,"space-goop-background-2");this.titleSprite=this.game.add.sprite(0,0,"title");this.titleSprite.anchor.set(.5);this.titleSprite.fixedToCamera=true;this.titleSprite.cameraOffset.x=this.game.width/2;this.titleSprite.cameraOffset.y=this.game.height/3*1.2;this.tapToPlaySprite=this.game.add.sprite(this.game.width/2,this.game.height/2,"tap-to-play");this.tapToPlaySprite.anchor.set(.5);this.tapToPlaySprite.fixedToCamera=true;this.tapToPlaySprite.cameraOffset.x=this.game.width/2;this.tapToPlaySprite.cameraOffset.y=this.game.height/3*2.48;this.tapToPlaySprite.scale.setTo(.9,1.1);this.game.add.tween(this.tapToPlaySprite.scale).to({x:1,y:1},200,Phaser.Easing.Linear.InOut,true,0,-1).yoyo(true,500);var statsTextStyle={font:"18px sans-serif",fill:"#ffffff",align:"left",fontWeight:"bold"};if(this.game.bestTime){this.bestTimeLabelText=this.game.add.text(0,0,"Best Time:",statsTextStyle);this.bestTimeLabelText.anchor.setTo(0,0);this.bestTimeLabelText.fixedToCamera=true;this.bestTimeLabelText.cameraOffset.x=12;this.bestTimeLabelText.cameraOffset.y=220;this.bestTimeText=this.game.add.bitmapText(0,0,"digit",formatTimeString(this.game.bestTime),36);this.bestTimeText.anchor.setTo(0,0);this.bestTimeText.fixedToCamera=true;this.bestTimeText.cameraOffset.x=this.bestTimeLabelText.cameraOffset.x+8;this.bestTimeText.cameraOffset.y=this.bestTimeLabelText.cameraOffset.y+22;this.bestScoreLabelText=this.game.add.text(0,0,"Best Score:",statsTextStyle);this.bestScoreLabelText.anchor.setTo(0,0);this.bestScoreLabelText.fixedToCamera=true;this.bestScoreLabelText.cameraOffset.x=this.bestTimeLabelText.cameraOffset.x;this.bestScoreLabelText.cameraOffset.y=this.bestTimeLabelText.cameraOffset.y+65;this.bestScoreText=this.game.add.bitmapText(0,0,"digit",this.game.bestScore.toString(),36);this.bestScoreText.anchor.setTo(0,0);this.bestScoreText.fixedToCamera=true;this.bestScoreText.cameraOffset.x=this.bestTimeLabelText.cameraOffset.x+8;this.bestScoreText.cameraOffset.y=this.bestScoreLabelText.cameraOffset.y+22}if(this.game.lastTime){this.lastTimeLabelText=this.game.add.text(0,0,"Last Time:",statsTextStyle);this.lastTimeLabelText.anchor.setTo(0,0);this.lastTimeLabelText.fixedToCamera=true;this.lastTimeLabelText.cameraOffset.x=this.game.width-200;this.lastTimeLabelText.cameraOffset.y=30;this.lastTimeText=this.game.add.bitmapText(0,0,"digit",formatTimeString(this.game.lastTime),36);this.lastTimeText.anchor.setTo(0,0);this.lastTimeText.fixedToCamera=true;this.lastTimeText.cameraOffset.x=this.lastTimeLabelText.cameraOffset.x+8;this.lastTimeText.cameraOffset.y=this.lastTimeLabelText.cameraOffset.y+22;this.lastScoreLabelText=this.game.add.text(0,0,"Last Score:",statsTextStyle);this.lastScoreLabelText.anchor.setTo(0,0);this.lastScoreLabelText.fixedToCamera=true;this.lastScoreLabelText.cameraOffset.x=this.lastTimeLabelText.cameraOffset.x;this.lastScoreLabelText.cameraOffset.y=this.lastTimeLabelText.cameraOffset.y+65;this.lastScoreText=this.game.add.bitmapText(0,0,"digit",this.game.lastScore.toString(),36);this.lastScoreText.anchor.setTo(0,0);this.lastScoreText.fixedToCamera=true;this.lastScoreText.cameraOffset.x=this.lastTimeLabelText.cameraOffset.x+8;this.lastScoreText.cameraOffset.y=this.lastScoreLabelText.cameraOffset.y+22}var smallTextStyle={font:"10px sans-serif",fill:"#cccccc",align:"left"};this.copyrightText=this.game.add.text(0,0,"© 2017 Lea Hayes. All rights reserved.",smallTextStyle);this.copyrightText.anchor.setTo(0,1);this.copyrightText.fixedToCamera=true;this.copyrightText.cameraOffset.x=12;this.copyrightText.cameraOffset.y=this.game.height-5;var specialNoteTextStyle={font:"14px sans-serif",fill:"#eeeeee",align:"center"};this.specialNoteText=this.game.add.text(0,0,"- In loving memory of Tony Hayes -",specialNoteTextStyle);this.specialNoteText.anchor.setTo(.5,1);this.specialNoteText.fixedToCamera=true;this.specialNoteText.cameraOffset.x=this.game.width/2;this.specialNoteText.cameraOffset.y=this.game.height-5;this.game.input.onDown.add(this.onTap,this);this.jumpButton=this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);this.jumpButton.onDown.add(this.onTap,this);this.game.transitions.create()},shutdown:function(){this.game.input.onDown.remove(this.onTap,this);this.jumpButton.onDown.remove(this.onTap,this)},update:function(){this.game.transitions.update();var normalizedMovementSpeed=6*this.game.time.physicsElapsed;this.backgroundLayer1.tilePosition.x+=normalizedMovementSpeed*1.2;this.backgroundLayer1.tilePosition.y-=normalizedMovementSpeed*.8;this.backgroundLayer3.tilePosition.x-=normalizedMovementSpeed*2;this.backgroundLayer3.tilePosition.y+=normalizedMovementSpeed*4;this.backgroundLayer4.tilePosition.x-=normalizedMovementSpeed*3.5;this.backgroundLayer4.tilePosition.y+=normalizedMovementSpeed*6},onTap:function(){this.game.transitions.transitionTo("Playing","transition",2)}};module.exports=GameState_Intro},{"../util/formatTimeString":7}],5:[function(require,module,exports){var constants=require("../constants");var formatTimeString=require("../util/formatTimeString");var testOverlappingActors=require("../util/testOverlappingActors");function GameState_Playing(){}GameState_Playing.prototype={create:function(){this.backgroundLayer1=this.game.add.tileSprite(0,0,720,420,"sky1");this.backgroundLayer3=this.game.add.tileSprite(0,0,720,420,"sky3");this.backgroundLayer2=this.game.add.tileSprite(0,0,720,420,"sky2");this.backgroundLayer4=this.game.add.tileSprite(0,0,720,420,"sky4");this.goop=this.game.add.sprite(152,150+0,"goop-sprites");this.goop.anchor.setTo(.5,.975);this.goop.animations.add("walk",[0,1,2,3,4,5,6,7],25,true);this.goop.animations.add("splat",[8,9,10,11,12,13],25,false);this.goop.animations.add("jump",[14,15],30,false);this.goop.animations.play("walk");this.goop.massMinimumScale=.1;this.goop.massMaximumScale=.75;this.goop.massMinimum=0;this.goop.massMaximum=200;this.goop.massGainRate=.2;this.goop.massLossRate=.3;this.goop.mass=150;this.goop.scale.set(this.calculatePlayerMassScale());this.beginSound=this.game.add.audio("begin",.5);this.jumpSound=this.game.add.audio("jump",.4);this.fallSound=this.game.add.audio("fall",.5);this.splatSound=this.game.add.audio("splat",.5);this.goopSound=this.game.add.audio("goop",.5);this.hurtFlySound=this.game.add.audio("hurt-fly",.5);this.hurtSpiderSound=this.game.add.audio("hurt-spider",.5);this.musicSound=this.game.add.audio("music");this.maps=this.game.cache.getJSON("maps");this.chunks=[];this.chunkPool=[];var randomLeadingMapId=this.maps.leadingSet[this.game.rnd.integerInRange(0,this.maps.leadingSet.length-1)];this.loadChunk(randomLeadingMapId);this.visibleScoreValue=0;this.scoreValue=0;this.died=false;this.timeStarted=this.game.time.now;this.timeLastMoving=this.timeStarted;this.movementSpeed=325;this.velocityY=0;this.jumpVelocityBooster=1800;this.jumpRepeatCount=0;this.timeText=this.game.add.bitmapText(this.game.world.width-20,this.game.world.centerY-145,"digit","0:00",36);this.timeText.anchor.set(1);this.scoreText=this.game.add.bitmapText(this.game.world.centerX,this.game.world.centerY-130,"digit","0",52);this.scoreText.anchor.setTo(.5,1);this.game.input.onDown.add(this.onTap,this);this.jumpButton=this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);this.jumpButton.onDown.add(this.onTap,this);this.beginSound.play();this.musicSound.loopFull(0);this.musicSound.fadeTo(1e3,.3);this.game.transitions.create()},shutdown:function(){this.game.input.onDown.remove(this.onTap,this);this.jumpButton.onDown.remove(this.onTap,this)},getPlayTime:function(){return this.timeLastMoving-this.timeStarted},getCurrentMapSet:function(){var playTimeInSeconds=Math.floor(this.getPlayTime()/1e3);var playSetIndex=Math.min(this.maps.sets.length-1,Math.floor(playTimeInSeconds/this.maps.setsTimeIncrements));return this.maps.sets[playSetIndex]},calculatePlayerMassScale:function(){var massScaleRange=this.goop.massMaximumScale-this.goop.massMinimumScale;var massPercentage=this.goop.mass/this.goop.massMaximum;return this.goop.massMinimumScale+massScaleRange*massPercentage},getTileObjectNear:function(x,y){var firstTry=this.chunks[0].getTileObjectNear(x,y);if(firstTry!==-1){return firstTry}var secondTry=this.chunks[1].getTileObjectNear(x,y);if(secondTry!==-1){return secondTry}throw new Error("FAIL")},traceTileObjectDown:function(x,y,projectedY){for(var testY=y;testY<projectedY;testY+=5){var tile=this.getTileObjectNear(x,Math.min(testY,projectedY));if(tile){return tile}}return null},getChunkInstance:function(){var chunk;if(this.chunkPool.length>0){chunk=this.chunkPool.pop()}else{chunk=this.createChunkInstance()}chunk.inUse=true;return chunk},createChunkInstance:function(){chunk=this.game.add.group();chunk.calculateTileIndex=function(row,column){return row*this.map.columns+column};chunk.getCell=function(row,column){return this.map.cells[this.calculateTileIndex(row,column)]};chunk.getTileObject=function(row,column){return this.tileObjects[this.calculateTileIndex(row,column)]};chunk.setTileObject=function(row,column,tileObject){return this.tileObjects[this.calculateTileIndex(row,column)]=tileObject};chunk.calculateNearTileIndex=function(x,y){x-=this.position.x;y-=this.position.y;var column=Math.floor(x/constants.tileSize);var row=Math.min(this.tileRowCount-1,Math.floor(y/constants.tileSize));if(column>=this.tileColumnCount){return-1}return row*this.tileColumnCount+column};chunk.getTileObjectNear=function(x,y){var index=this.calculateNearTileIndex(x,y);return index!==-1?this.tileObjects[index]:-1};chunk.actors=[];return chunk},recycleUnwantedChunk:function(chunk){chunk.inUse=false;chunk.actors.forEach(function(actor){actor.destroy()});chunk.actors=[];chunk.callAll("kill");this.chunkPool.push(chunk)},loadRandomChunk:function(){var mapSet=this.getCurrentMapSet();var randomMapId=mapSet[this.game.rnd.integerInRange(0,mapSet.length-1)];this.loadChunk(randomMapId)},loadChunk:function(mapId){var map=this.maps.maps[mapId];var chunk=this.getChunkInstance();chunk.map=map;if(chunk.tileRowCount!==map.rows||chunk.tileColumnCount!=map.columns){chunk.tileRowCount=map.rows;chunk.tileRowSpan=map.rows*constants.tileSize;chunk.tileColumnCount=map.columns;chunk.tileColumnSpan=map.columns*constants.tileSize;chunk.tileObjects=new Array(chunk.tileRowCount*chunk.tileColumnCount)}for(var i=0;i<chunk.tileObjects.length;++i){chunk.tileObjects[i]=null}chunk.position.y=constants.mapVerticalOffset;for(var row=0;row<chunk.tileRowCount;++row){for(var column=0;column<chunk.tileColumnCount;++column){var cell=chunk.getCell(row,column);this.placeTileInChunk(chunk,row,column,cell)}}var nextChunkPosition=0;if(this.chunks.length>0){var lastChunk=this.chunks[this.chunks.length-1];nextChunkPosition=lastChunk.position.x+lastChunk.tileColumnSpan}chunk.position.x=nextChunkPosition;this.chunks.push(chunk)},placeTileInChunk:function(chunk,row,column,cell){var actor=null;switch(cell){case 1:case 2:case 3:case 4:case 9:var tile=chunk.getFirstDead(true,column*constants.tileSize,row*constants.tileSize,"tileset",cell-1);tile.tileRow=row;tile.tileColumn=column;tile.cell=cell;chunk.setTileObject(row,column,tile);return;case 5:if(this.game.rnd.rnd()<.1){var targetPoint=new Phaser.Point((column+.5)*constants.tileSize,(row+1)*constants.tileSize);var sourcePoint=new Phaser.Point((column+2)*constants.tileSize,-chunk.position.y);actor=this.spawnFallingBlobActor(targetPoint,sourcePoint)}break;case 6:actor=this.spawnBlobActor((column+.5)*constants.tileSize,(row+1)*constants.tileSize);break;case 7:actor=this.spawnSpiderActor((column+.5)*constants.tileSize,(row+1)*constants.tileSize);break;case 8:actor=this.spawnFlyActor((column+.5)*constants.tileSize,(row+1)*constants.tileSize);break}if(actor!==null){chunk.add(actor);chunk.actors.push(actor)}},spawnSpiderActor:function(x,y){var spiderActor=this.game.add.sprite(x,y,"bug-sprites");spiderActor.anchor.setTo(.5,.95);spiderActor.scale.set(.6);spiderActor.animations.add("idle",[8,9,10,11,8,12,13,12],12,true);spiderActor.animations.add("dead",[14],18,false);spiderActor.animations.play("idle");spiderActor.radius=27;spiderActor.isEnemy=true;spiderActor.willFallToDeath=false;spiderActor.hurtSound=this.hurtSpiderSound;spiderActor.impactVelocityDamage=0;spiderActor.playerMassDelta=-80;return spiderActor},spawnFlyActor:function(x,y){var flyActor=this.game.add.sprite(x,y,"bug-sprites");flyActor.anchor.setTo(.5,.95);flyActor.scale.set(.5);flyActor.animations.add("idle",[0,1,2,3,4,5],18,true);flyActor.animations.add("dead",[6],18,false);flyActor.animations.add("landing",[6],18,true);flyActor.animations.play("idle");flyActor.radius=27;flyActor.isEnemy=true;flyActor.willFallToDeath=true;flyActor.hurtSound=this.hurtFlySound;flyActor.impactVelocityDamage=200;flyActor.playerMassDelta=-40;return flyActor},spawnFallingBlobActor:function(targetPoint,sourcePoint){var blobActor=this.spawnBlobActor(sourcePoint.x,sourcePoint.y);blobActor.isFalling=true;blobActor.sourcePoint=sourcePoint;blobActor.targetPoint=targetPoint;blobActor.fallingProgress=0;blobActor.fallingDuration=1.5;blobActor.fallingProgress=this.game.rnd.between(-.1,0);blobActor.animations.play("falling");return blobActor},spawnBlobActor:function(x,y){var blobActor=this.game.add.sprite(x,y,"goop-blob-sprites");blobActor.anchor.setTo(.5,.95);blobActor.animations.add("idle",[4,5,6,7,6,5],18,true);blobActor.animations.add("vanish",[8,9,10,11,12],45,false);blobActor.animations.add("falling",[0],45,false);blobActor.animations.add("landing",[1,2,3],45,false);blobActor.animations.play("idle");var minimumBlobActorScale=.2;var maximumBlobActorScale=.4;var randomBlobActorScale=this.game.math.clamp(this.game.rnd.rnd(),minimumBlobActorScale,maximumBlobActorScale);blobActor.scale.set(randomBlobActorScale);blobActor.scoreValue=Math.round(randomBlobActorScale*100);blobActor.radius=45;blobActor.isCollectable=true;blobActor.playerMassDelta=randomBlobActorScale*20;return blobActor},update:function(){this.updatePlayer();this.updateFallingActors();this.checkForCollisionBetweenPlayerAndActors();this.updateLayers();this.updateUI();this.game.transitions.update()},updateFallingActors:function(){for(var i=0;i<this.chunks.length;++i){var chunk=this.chunks[i];for(var j=0;j<chunk.actors.length;++j){var actor=chunk.actors[j];if(actor.isFalling&&actor.worldPosition.x<1050){actor.fallingProgress=Math.min(1,actor.fallingProgress+this.game.time.physicsElapsed/actor.fallingDuration);if(actor.fallingProgress<1){if(actor.fallingProgress>0){actor.position.x=this.game.math.linear(actor.sourcePoint.x,actor.targetPoint.x,actor.fallingProgress);actor.position.y=this.game.math.linear(actor.sourcePoint.y,actor.targetPoint.y,actor.fallingProgress);actor.animations.play("falling")}}else{actor.isFalling=false;actor.position.x=actor.targetPoint.x;actor.position.y=actor.targetPoint.y;actor.animations.play("landing").onComplete.add(function(sprite){sprite.animations.play("idle")})}actor.updateTransform()}}}},updateLayers:function(){var backgroundSpeedFactor=.5;var normalizedMovementSpeed=this.movementSpeed*this.game.time.physicsElapsed;this.backgroundLayer1.tilePosition.x+=backgroundSpeedFactor*(8-normalizedMovementSpeed)*.08;this.backgroundLayer2.tilePosition.x-=backgroundSpeedFactor*normalizedMovementSpeed*.2+2.4;this.backgroundLayer2.tilePosition.y+=110*this.game.time.physicsElapsed;this.backgroundLayer3.tilePosition.x-=backgroundSpeedFactor*normalizedMovementSpeed*.3;this.backgroundLayer4.tilePosition.x-=backgroundSpeedFactor*normalizedMovementSpeed*.5;var chunkWasRecycled=false;for(var i=0;i<this.chunks.length;++i){var chunk=this.chunks[i];chunk.position.x-=normalizedMovementSpeed;if(chunk.position.x<=-chunk.tileColumnSpan){this.recycleUnwantedChunk(chunk);chunkWasRecycled=true}if(i+1===this.chunks.length){if(chunk.position.x+chunk.tileColumnSpan<this.game.width){this.loadRandomChunk();break}}}if(chunkWasRecycled){this.chunks=this.chunks.filter(function(chunk){return chunk.inUse})}},updatePlayer:function(){var massTargetScale=this.calculatePlayerMassScale();if(massTargetScale>this.goop.scale.x){this.goop.scale.set(this.game.math.min(massTargetScale,this.goop.scale.x+this.goop.massGainRate*this.game.time.physicsElapsed))}else{this.goop.scale.set(this.game.math.max(massTargetScale,this.goop.scale.x-this.goop.massLossRate*this.game.time.physicsElapsed))}var wallSensorOffsetX=0;var wallSensorOffsetY=10;var goopRadius=32*this.goop.scale.x;var position=this.goop.position;if(this.movementSpeed>0){var projectedPositionY=position.y+this.velocityY*this.game.time.physicsElapsed;this.velocityY*=.9;var normalizedMovementSpeed=this.movementSpeed*this.game.time.physicsElapsed;var chunkOffsetX=normalizedMovementSpeed;var wallSensorTile=this.getTileObjectNear(chunkOffsetX+position.x+goopRadius-wallSensorOffsetX,this.goop.position.y-wallSensorOffsetY);if(wallSensorTile){if(this.movementSpeed>0){this.movementSpeed=0;this.fallSound.play();this.goop.animations.play("jump")}return}if(projectedPositionY>position.y){var groundSensorTile=this.traceTileObjectDown(chunkOffsetX+position.x,position.y,projectedPositionY)||this.traceTileObjectDown(chunkOffsetX+position.x-goopRadius,position.y,projectedPositionY)||this.traceTileObjectDown(chunkOffsetX+position.x+goopRadius,position.y,projectedPositionY);if(groundSensorTile){if(groundSensorTile.cell===4){this.collideWithSpikes(groundSensorTile);return}this.land();projectedPositionY=groundSensorTile.worldPosition.y}}this.goop.position.y=projectedPositionY;this.velocityY+=120}else{var projectedPositionY=this.goop.position.y+(this.died?300:900)*this.game.time.physicsElapsed;var groundSensorTile=this.traceTileObjectDown(position.x,position.y,projectedPositionY);if(groundSensorTile&&groundSensorTile.cell===4){this.collideWithSpikes(groundSensorTile)}this.goop.position.y=projectedPositionY;if(this.goop.position.y>this.game.height+500){this.gameOver(0)}}},updateUI:function(){if(this.visibleScoreValue<this.scoreValue){var scoreTickRate=120;this.visibleScoreValue=Math.min(this.scoreValue,this.visibleScoreValue+scoreTickRate*this.game.time.physicsElapsed);this.scoreText.text=Math.floor(this.visibleScoreValue).toString()}this.game.world.bringToTop(this.scoreText);if(this.movementSpeed>0){this.timeLastMoving=this.game.time.now}this.timeText.text=formatTimeString(this.getPlayTime());this.game.world.bringToTop(this.timeText)},onTap:function(){if(this.movementSpeed===0){return}this.jump()},jump:function(){if(this.jumpRepeatCount<2){this.jumpNow()}},jumpNow:function(){this.goop.animations.play("jump");this.jumpSound.play();this.velocityY=-this.jumpVelocityBooster;this.jumpRepeatCount+=1},land:function(){this.goop.animations.play("walk");this.velocityY=0;this.jumpRepeatCount=0},collideWithSpikes:function(spikeTile){if(this.goop.hitSpikes){return}this.goop.hitSpikes=true;this.splatSound.play();this.goop.animations.play("splat");this.gameOver(1e3)},checkForCollisionBetweenPlayerAndActors:function(){var player=this.goop;var goopRadius=32*this.goop.scale.x;for(var i=0;i<Math.min(2,this.chunks.length);++i){var chunk=this.chunks[i];for(var j=0;j<chunk.actors.length;++j){var actor=chunk.actors[j];if(actor.ignoreCollisions===true){continue}if(testOverlappingActors(actor.worldPosition,actor.radius*actor.scale.x,player.worldPosition,goopRadius)){if(typeof actor.scoreValue==="number"){this.scoreValue+=actor.scoreValue}this.modifyPlayerMass(actor.playerMassDelta);actor.ignoreCollisions=true;if(actor.isCollectable){actor.isFalling=false;actor.animations.play("vanish");this.goopSound.play()}else if(actor.isEnemy){if(actor.willFallToDeath){actor.isFalling=true;actor.sourcePoint=new Phaser.Point(actor.position.x,actor.position.y);actor.fallingProgress=0;var landingTile=this.traceTileObjectDown(actor.worldPosition.x+actor.radius*actor.scale.x,actor.worldPosition.y,actor.worldPosition.y+500);actor.targetPoint=!!landingTile?new Phaser.Point(actor.position.x,landingTile.position.y+20):new Phaser.Point(actor.position.x,actor.position.y+500);actor.fallingDuration=(actor.targetPoint.y-actor.sourcePoint.y)/400}actor.animations.play("dead");if(actor.hurtSound){actor.hurtSound.play()}if(actor.impactVelocityDamage){this.velocityY+=actor.impactVelocityDamage}}}}}},modifyPlayerMass:function(deltaMass){this.goop.mass=this.game.math.clamp(this.goop.mass+deltaMass,this.goop.massMinimum,this.goop.massMaximum);if(this.game.math.fuzzyEqual(this.goop.mass,this.goop.massMinimum,.01)){this.goop.visible=false;this.gameOver(1500)}},gameOver:function(delayInMs){if(this.died===true){return}this.died=true;this.movementSpeed=0;this.game.recordGameOutcome(this.scoreValue,this.getPlayTime());this.musicSound.fadeTo(1e3,0);var self=this;setTimeout(function(){self.musicSound.stop();self.game.transitions.transitionTo("Intro","transition",2)},delayInMs)}};module.exports=GameState_Playing},{"../constants":1,"../util/formatTimeString":7,"../util/testOverlappingActors":8}],6:[function(require,module,exports){function TransitionManager(game){this._game=game;this._isTransitionInProgress=false;this._transitionRenderTexture=game.add.renderTexture(game.width,game.height,"transition");var uniforms={mask:{type:"sampler2D",value:null,textureData:{repeat:true}},cutoff:{type:"1f",value:0}};this._filter=new Phaser.Filter(game,uniforms,game.cache.getShader("cutoff-transition-shader"))}TransitionManager.prototype={create:function(){if(this._isTransitionInProgress){this._cutoffMaskSprite=this._game.add.sprite(0,0,this._transitionTextureName);this._cutoffMaskSprite.scale.set(0);this._filter.uniforms.mask.value=this._cutoffMaskSprite.texture;this._sprite=this._game.add.sprite(0,0,this._transitionRenderTexture);this._sprite.fixedToCamera=true;this._sprite.anchor.set(.5);this._sprite.cameraOffset.x=this._game.width/2;this._sprite.cameraOffset.y=this._game.height/2;this._sprite.filters=[this._filter];this._progress=0}},destroy:function(){this._cutoffMaskSprite.destroy();this._sprite.destroy()},update:function(){if(this._isTransitionInProgress){this._progress+=this._speed*this._game.time.physicsElapsed;this._filter.uniforms.cutoff.value=this._progress;this._game.world.bringToTop(this._sprite);if(this._progress>1.1){this._isTransitionInProgress=false;this.destroy()}}},transitionTo:function(stateName,transitionTextureName,speed){if(this._isTransitionInProgress){return}this._isTransitionInProgress=true;this._transitionTextureName=transitionTextureName;this._speed=speed;this._transitionRenderTexture.render(this._game.world);this._game.world.updateTransform();this._game.state.start(stateName)}};module.exports=TransitionManager},{}],7:[function(require,module,exports){function formatTimeString(timeMs){var totalSeconds=Math.floor(timeMs/1e3);var hours=0;var minutes=Math.floor(totalSeconds/60);if(minutes>60){hours=Math.floor(minutes/60);minutes%=60}var seconds=totalSeconds%60;if(seconds<10){seconds="0"+seconds}var ms=Math.floor(timeMs%1e3/100);var result=minutes+":"+seconds+"."+ms;if(hours){if(minutes<10){result="0"+result}result=hours+":"+result}return result}module.exports=formatTimeString},{}],8:[function(require,module,exports){function testOverlappingActors(pointA,radiusA,pointB,radiusB){var h=Math.pow(pointA.x-pointB.x,2);var v=Math.pow(pointA.y-radiusA-(pointB.y-radiusB),2);var distanceSqr=h+v;return distanceSqr<Math.pow(radiusA+radiusB,2)}module.exports=testOverlappingActors},{}]},{},[2]);
