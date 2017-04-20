var GameSprite = function(x, y, sprite, visible) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.visible = visible;
};

GameSprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(x, y, speed) {
  GameSprite.call(this, x, y);
  this.speedUp = 0;
  this.speed = speed;
};

Enemy.prototype = Object.create(GameSprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
  function leftToRightBugs() {
    this.sprite = 'images/enemy-bug.png';
    if (this.x < canvasWidth) {
      this.x += (this.speed + this.speedUp) * dt;
    } else {
      this.x = -101;
    }
  }

  function rightToLeftBugs() {
    this.sprite = 'images/enemy-bug-reversed.png';
    if (this.x > -101) {
      this.x -= (this.speed + this.speedUp) * dt;
    } else {
      this.x = 505;
    }
  }
};

var Player = function(x, y, hasKey)
{
  this.x = x;
  this.y = y;


  this.update = function()
  {

  };

  this.render = function()
  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  this.handleInput = function(key)
  {
     if (key === 'left')
     {
        this.x = this.x;
    }
  };
};

document.addEventListener('keyup',function(e) {
  var allowedKeys = {
    32: 'spacebar',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});