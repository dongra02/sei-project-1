# SEI50 Project - ***Don't Get Poo on Your Shoe***

## Game Outline
Don't Get Poo on Your Shoe is designed to replicate Minesweeper, with a silly theme. The game takes place on a grid, in this case a 'lawn.' The objective is to clear the lawn by clicking grid cells, while avoiding clicking cell containing a mine ('poo'). The first click will always be safe, and will reveal information related to the quantity of poos contained by the clicked item's neighboring cells. Neighbors include cells directly above, both sides, below as well as corners. Thus a cell can have a maximimum of 8 neighbors, though cells along the border will have fewer. Upon clicking, the cell will change color and include a number to indicate how many neighboring cells contain a poo. If a cell has no neighbors containing a poo, it changes color to indicate it's been cleared and any previously unchecked neighboring cells are checked in the same way. The process recurses after reach click through any uncleared neighbors until none are free of neighbors containing poos. Using the numbers provided upon checking, a player can often deduce which cells likely contain a poo. By left clicking, the player can 'bag' the poo. This will lock the cell so the player can't accidentally click on it. This can be undone by left-clicking a cell with a bag. A seconds timer begins on the first click and ends upon losing or winning. Simliar to classic Minesweeper, Don't Get Poo On Your Shoe offers 3 difficulty levels:

* *Easy:* 10 x 10 grid, with 10 poos placed randomly.

* *Medium:* 16 x 16 grid, with 40 poos placed randomly.

* *Hard:* 30 x 16 grid, with 99 poos placed randomly.

<p align='center'>
  <img src='./images/screenShot2.jpg' height=200 align='center'>
  <img src='./images/screenShot.jpg' height=200 align='center'>
</p>

### Win
 A player wins after all cells have been cleared, with the exception of those containing poos. It is not required to bag any/all poos, the feature is there to simply make it easier to quickly click safe cells once poos are identified. An 'appluase' sound effect is heard if the users volume is enabled.

### Lose
As soon as a cell containing a poo is clicked, the player has lost. The timer ends and is accompanied by a sound effect.

***
## Brief
* Render a grid-based game in the browser
* Design logic for winning & visual display of results
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use Javascript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)

## Timeframe
The project took 7 days from planning to completion.

## Technologies Used
* JavaScript
* HTML5 with audio
* CSS3 with animation
* Git + Github

***
## Process
After outling a basic HTML layout for the page and grid, I identified the necessary functions for the landing page and game play. These included:

* Landing form and, later, a difficulty selection
* Creation of the grid
* Planting of the 'poos'
* Creation of the bag counter
* Creation of the timer
* Check clicked cell & neighbors for 'poos'
* Place bag
* Win/Lose check
* Game End & Reset

With the layout complete, I added the event listeners and necessary functions to make a playable game and to incorporate the necessary styling updates for the user to understand what is happening. I was able to create a recursive function to handle the bulk of the gameplay functionality. Finally, I used the remaining time to add extras like audio, animations and difficulty levels for the user to select.