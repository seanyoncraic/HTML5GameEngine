var Player = function(){

    // TODO adjust gotoAndStop()
    // TODO figure out why the snake is not at 0,0 when placed there - y is off

    // local references to global variables
    var stage = window.stage;
    var assetmanager = window.asserManager;

    // custom events
    var eventPlayerKilled = new createjs.Event("onPlayerKilled", true);

    // private property variables
    var speed = 2;
    var moving = MovingDirection.STOPPED;
    var alive = false;

    // get sprite and setup
    var sprite = assetManager.getSprite("GameSprites");
    //sprite.scaleX = 1;
    sprite.gotoAndStop("snakeAlive");
    sprite.regX = sprite.getBounds().width / 2;
    sprite.regY = sprite.getBounds().height / 2;

    // ?????????????????????????????? this will need to be changed

    // ???????????????????????????????????????????????????????????

    // determine left and right stage bounds
    var stageLeftBound = sprite.getBounds().width / 2;
    var stageRightBound = stage.canvas.width - (sprite.getBounds().width / 2);

    // --------------------------------------------------- get/set methods
    this.getMoving = function(){
        return moving;
    };

    this.getSprite = function() {
        return sprite;
    };

    this.getAlive = function() {
        return alive;
    };

    // --------------------------------------------------- public methods
    this.startMe = function() {
        alive = true;
        sprite.x = 300;
        sprite.y = 500;
        stage.addChild(sprite);
    };

    this.moveLeft = function() {
        sprite.play();
        moving = MovingDirection.LEFT;
    };

    this.moveRight = function() {
        sprite.play();
        moving = MovingDirection.RIGHT;
    };

    this.stopMe = function() {
        sprite.stop();
        moving = MovingDirection.STOPPED;
    };

    this.killMe = function() {
        alive = false;
        this.stopMe();
        sprite.gotoAndPlay("snakeDead");
        sprite.addEventListener("animationend", onKilled);
    };

    this.updateMe = function() {
        if (alive) {
            if (moving === MovingDirection.LEFT) {
                // moving left
                sprite.scaleX = 1;
                sprite.x = sprite.x - speed;
                if (sprite.x < stageLeftBound) {
                    sprite.x = stageLeftBound;
                }
            } else if (moving === MovingDirection.RIGHT) {
                // moving right
                sprite.scaleX = -1;
                sprite.x = sprite.x + speed;
                if (sprite.x > stageRightBound) {
                    sprite.x = stageRightBound;
                }
            } else {

                // ?????????????????????????????
                // set animation to idle sequence


            }
        }
    };

    // -------------------------------------------------- event handlers
    function onKilled(e) {
        sprite.stop();
        sprite.removeEventListener("animationend", onKilled);
        //stage.removeChild(sprite);
        sprite.dispatchEvent(eventPlayerKilled);
    }

};

var MovingDirection = {
    "STOPPED":0,
    "LEFT":1,
    "RIGHT":2
};
