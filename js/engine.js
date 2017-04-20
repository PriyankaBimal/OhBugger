
var Engine = (function(global) {
   
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;

    doc.body.appendChild(canvas);

   
    function main() {
        
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

       
         if (endGameState.gameOver) {
              renderGameOver();
            } else if (endGameState.youWin) {
              renderYouWin();
            } else {
              update(dt);
              render();
            }
        

        
        lastTime = now;

       
        win.requestAnimationFrame(main);
    }

    
    function init() {
        reset();
         loadLevels();
        lastTime = Date.now();
        main();
    }

    
    function update(dt) {
        updateEntities(dt);
       }

    
    function updateEntities(dt) {
     allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
     
       player.update();
    }

    
    function render() {
        
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 7,
            numCols = 5,
            row, col;

        
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
               
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    
    function renderEntities() {
        
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        
        player.render();

         allGems.forEach(function(gem) {
              if(gem.visible){
                gem.render();
              }
    });

    }

    function renderGameOver() {
    var gameOver = 'images/game-over.jpg';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(Resources.get(gameOver), 0, 50);
    (function draw() {
        ctx.font = '5.25em Rye';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B4B4C';
        ctx.fillText('R.I.P.', canvasWidth / 2 + 12, 257);
    })();
    (function draw() {
        ctx.font = '2.6em Rye';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B4B4C';
        ctx.fillText('Final Score', canvasWidth / 2, 340);
        ctx.fillText(stats.score, canvasWidth / 2 + 2, 410);
    })();
  }

  function renderYouWin() {
    var youWin = 'images/you-win.jpg';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(Resources.get(youWin), 0, 50);
    (function draw() {
        ctx.font = '900 2em Graduate';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFEFF';
        ctx.fillText('Final Score', canvasWidth / 2, 144);
        ctx.fillText(stats.score, canvasWidth / 2, 187);
    })();
  }

    
    function reset() {
        allGems.forEach(function(gem) {
              gem.visible = false;
            });
         stats.treasureCollected = 0;
        
    }


 function loadLevels() {
    switch(stats.level) {
      case 1:
        
        loadGemsAndRocks(allGems, 0, 226, 198);
        stats.treasureNeeded = 1;
        break;
      case 2:
        
        loadGemsAndRocks(allGems, 0, 327, 115);
        loadGemsAndRocks(allGems, 1, 125, 281);
        stats.treasureNeeded = 2;
        break;
    case 3:
        
        loadGemsAndRocks(allGems, 0, 327, 115);
        loadGemsAndRocks(allGems, 1, 125, 281);
        loadGemsAndRocks(allGems, 2,  226, 198);
        // loadGemsAndRocks(allGems, 3, 327, 281);
        // loadGemsAndRocks(allRocks, 0, 202, 136);
        stats.treasureNeeded = 3;
        break;
    case 4:
        
        loadGemsAndRocks(allGems, 0, 327, 115);
        loadGemsAndRocks(allGems, 1, 125, 281);
        loadGemsAndRocks(allGems, 2,  226, 198);
        loadGemsAndRocks(allGems, 3, 327, 281);
        //loadGemsAndRocks(allRocks, 0, 202, 136);
        stats.treasureNeeded = 4;
        break;
    }
    
 }


     function renderGameOver() {
    var gameOver = 'images/enemy-bug.png';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(Resources.get(gameOver), 0, 50);
    (function draw() {
        ctx.font = '5.0em Rye';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B4B4C';
        ctx.fillText('Game Over.', canvasWidth / 2 + 12, 257);
    })();
    (function draw() {
        ctx.font = '1.5em Rye';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B4B4C';
        ctx.fillText('Press Space Bar to Restart', canvasWidth / 2, 340);
        ctx.fillText(stats.score, canvasWidth / 2 + 2, 410);
    })();
  }

  function renderGameComplete() {
    var gameOver = 'images/enemy-bug.png';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(Resources.get(gameOver), 0, 50);
    (function draw() {
        ctx.font = '3.00em Rye';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B4B4C';
        ctx.fillText('Mission Accomplished!!!!', canvasWidth / 2 + 12, 257);
    })();
    (function draw() {
        ctx.font = '2.6em Rye';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B4B4C';
        ctx.fillText('Press Space Bar to Restart', canvasWidth / 2, 340);
        ctx.fillText(stats.score, canvasWidth / 2 + 2, 410);
    })();
  }


   function loadGemsAndRocks(gemsOrRocksArray, i, x, y) {
    gemsOrRocksArray[i].visible = true;
    gemsOrRocksArray[i].x = x;
    gemsOrRocksArray[i].y = y;
  }
    
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/gem.png',
        'images/you-win.jpg',
        'images/game-over.jpg'
    ]);
    Resources.onReady(init);

 
    global.ctx = ctx;
    global.renderGameOver = renderGameOver;
    global.renderGameComplete = renderGameComplete;
    global.loadLevels = loadLevels;
    global.reset = reset;
})(this);
