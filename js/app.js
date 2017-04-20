var enemyX = 50;
var enemyY = 50;
var enemySpeed = 50;
var canvasWidth = 505;
var canvasHeight = 606;
var thisX = 0;
var thisY = 0;



var EndGameState = function() {
  this.gameOver = false;
  this.youWin = false;
};

var Stats = function() {
  this.level = 1;
  this.lives = 3;
  this.score = 0;
 

  /* Keeps track of any points player has collected on their current life
  and deducts this amount any time player loses a life so their overall
  score is reset accordingly. */
  this.currentLifePoints = 0;

  /* How many gems the player can pick up in each level */
  
  this.treasureCollected = 0;
  

  this.updateStats = function() {
    document.querySelector('.lives').innerHTML = this.lives -= 1;

    // // Checks if player is on their last life, if so, then 'Lives: 1' flashes red.
    // if (this.lives === 1) {
    //   document.querySelector('.flex-item:nth-child(2)')
    //     .classList.add('flashLastLife');
    // }
    /* Here we check the level and display the lives and score accordingly*/
    if (this.level === 1 && this.lives > 0) {
      this.score = 0;
      document.querySelector('.score').innerHTML = this.score;
      this.currentLifePoints = 0;
    } else if (this.level > 1 && this.lives > 0) {
      this.score -= this.currentLifePoints;
      document.querySelector('.score').innerHTML = this.score;
      this.currentLifePoints = 0;
    } else {
      this.score = this.score;
      document.querySelector('.score').innerHTML = this.score;
    }


    if (this.level === 4) {     
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  };
};





var gameSprite = function(x,y,sprite)
{
    this.x=x;
    this.y=y;
    this.sprite=sprite;

}

gameSprite.prototype.render = function()
{
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

var Enemy = function(x,y,speed) {

    gameSprite.call(this,x,y);
    this.speedup=0;
    this.speed=speed;

};
Enemy.prototype = Object.create(gameSprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt)
{
            // We  multiply any movement of bug by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.

            this.sprite = 'images/enemy-bug.png';
            if(this.x < canvasWidth)
            {
                this.x += (this.speed + this.speedup) * dt;
           }
            else
            {
                this.x = -101;
            }
};
var allEnemies = new Array();

(function createEnemies(){
  function pushToEnemiesArray(x, y, speed) {
    allEnemies.push(new Enemy(Math.floor(Math.random() * x), y, speed));

  }
  pushToEnemiesArray(50, 53, 250);
  pushToEnemiesArray(505, 136, 200);
  pushToEnemiesArray(505, 219, 150);
  pushToEnemiesArray(505, 302, 100);
})();

var Player = function(x, y)
{
    this.spritePlayer = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.reset = function(x, y)
    {
        this.x = x;
        this.y = y;

    };

    this.render = function()
    {
        ctx.drawImage(Resources.get(this.spritePlayer), this.x, this.y);
    };

    this.update = function()
    {
        for (var i = 0; i < allEnemies.length; i++)
        {
              if ((this.x < allEnemies[i].x + 40 &&
                this.x > allEnemies[i].x - 40) &&
                this.y === allEnemies[i].y)
              {
                    
                    renderGameOver();
                    stats.updateStats();
                    if (stats.lives > 0) {
                      this.reset(202, 385, false);
                      reset();
                      loadLevels();
                    } else {
                      endGameState.gameOver = true;                   
                      document.querySelector('.level-and-lives-wrap').style.display = 'none';
                      document.querySelector('.score-wrap').style.display = 'none';
                      document.querySelector('h1').classList.add('endRubberBand');
                      document.querySelector('.try-again').style.display = 'block';
                      document.querySelector('footer').style.display = 'block';
                      if (endGameState.gameOver) {
                        document.querySelector('.canvas').style.margin = '-2.268em 0 0 0';
                      }
              }
              
        }
        if(this.y < 0 && this.y <= 30)
        {
            renderGameComplete();
           
        }
      }
    }



    this.handleInput = function(myKey)
    {
        // Prevents arrow keys and spacebar from scolling the user window.
        
            document.addEventListener('keydown', function(e)
            {
                  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
                  {
                    e.preventDefault();
                  }

            });

             if(myKey == 'left' && this.x > 0)
             {
                this.x -= 101;
                console.log('left pressed, x is' + this.x);
             }


             if(myKey == 'right' && this.x < canvasWidth)
             {

              this.x += 101;

             }

             if(myKey == 'up' && this.y > 0)
             {

               this.y -= 83;
             }

             if(myKey == 'down' && this.y < canvasHeight)
             {

              this.y += 83;

             }

             if(myKey == 'spacebar')
             {
                
                location.reload();
             }

 // Check for gems.
    for (var j = 0; j < allGems.length; j++) {
       console.log("In gem block=first")
       console.log(allGems[j].x)
       console.log(this.x )
      if (this.x === allGems[j].x - 24 &&
        this.y === allGems[j].y - 62 &&
        allGems[j].visible === true) {
        console.log("In gem block=true")
       // soundEffects('gem').play();
        allGems[j].visible = false;
        stats.currentLifePoints += 10;
        stats.score += 10;
        stats.treasureCollected += 1;
        document.querySelector('.score').innerHTML = stats.score;
        break;
      }
    }


      if (this.y === -30) {
              if (stats.level < 4) {
               
                var nextLevelPrep = function() {
                  this.reset(202, 385, false);
                  stats.level++;
                  stats.currentLifePoints = 0;
                  reset();
                  loadLevels();
                  document.querySelector('.level').innerHTML = stats.level;
                  // allEnemies.forEach(function(enemy) {
                  //    enemy.speedUp += 5; // Increases enemy speed as player progresses through levels 1-10.
                  //   enemy.speed += enemy.speedUp;
                  //   enemy.x = Math.floor(Math.random() * 505);
                  //  });
                  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                };

             
                setTimeout(nextLevelPrep.bind(this), 100);
              } else {
               
                 setTimeout(function() {
                
                  document.querySelector('h1').innerHTML = 'Well Done!';
                  document.querySelector('h1').classList.add('endFlash');
                  document.querySelector('.level-and-lives-wrap').style.display = 'none';
                  document.querySelector('.score-wrap').style.display = 'none';
                  document.querySelector('.you-win').style.display = 'block';
                  document.querySelector('footer').style.display = 'block';
                  endGameState.youWin = true;
                  if (endGameState.youWin){
                    document.querySelector('.canvas').style.margin = '-2.268em 0 0 0';
                  }
                }, 100);
              }
            }

            if (myKey === 'spacebar' && endGameState.gameOver === true ||
              myKey === 'spacebar' && endGameState.youWin === true) {
              location.reload(); // Refreshes the page, allowing the player to play again.
            }


    };
};




var player = new Player(202, 385);

var Gem = function(x, y) {
  gameSprite.call(this, x, y, 'images/gem.png', true);
};

Gem.prototype = Object.create(gameSprite.prototype);
Gem.prototype.constructor = Gem;

var allGems = new Array();
stats = new Stats();
endGameState = new EndGameState();

(function createGems() {
  for (var i = 0; i < 5; i++) {
    allGems.push(new Gem());
  }
})();
 
// This listens for key presses and sends the keys to your Player.handleInput() method

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    32: 'spacebar',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});





