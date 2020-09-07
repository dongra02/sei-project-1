# SEI50 Project 1 - ***Don't Get Poo on Your Shoe***

## Game Outline
Don't Get Poo on Your Shoe is designed to replicate Minesweeper, with a silly theme. The game takes place on a grid, in this case a 'lawn.' The objective is to clear the lawn by clicking grid cells, while avoiding clicking cell containing a mine ('poo'). The first click will always be safe, and will reveal information related to the quantity of poos contained by the clicked item's neighboring cells. Neighbors include cells directly above, both sides, below as well as corners. Thus a cell can have a maximimum of 8 neighbors, though cells along the border will have fewer. Upon clicking, the cell will change color and include a number to indicate how many neighboring cells contain a poo. If a cell has no neighbors containing a poo, it changes color to indicate it's been cleared and any previously unchecked neighboring cells are checked in the same way. The process recurses after reach click through any uncleared neighbors until none are free of neighbors containing poos. Using the numbers provided upon checking, a player can often deduce which cells likely contain a poo. By left clicking, the player can 'bag' the poo. This will lock the cell so the player can't accidentally click on it. This can be undone by left-clicking a cell with a bag. A seconds timer begins on the first click and ends upon losing or winning. Simliar to classic Minesweeper, Don't Get Poo On Your Shoe offers 3 difficulty levels:

* *Easy:* 10 x 10 grid, with 10 poos placed randomly.

* *Medium:* 16 x 16 grid, with 40 poos placed randomly.

* *Hard:* 30 x 16 grid, with 99 poos placed randomly.

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

Once the basic layout was complete, I needed to plan for and create the Event Listeners that would make the game playable for a user. Four event listeners are supported by 20+ functions to account for the appropriate response (or lack of response) when the user clicks on a cell, selects a difficulty, resets or restarts the game, uses the 'bagging' feature and of course to check for a losing click or a successfully completed game.

Once I had the functionality complete, I was able to add a few extras including differing difficulty levels, sound effects, and styling.
***
## Challenges
Many of the biggest challanges I encountered related to handling layout of the grid, buttons and the intro form. Using *flex* in CSS made this significanly easier, but a challenge for me all the same. A lot of trial and error took place until I was happy with layouts. 

A functional challenge I encountered involved animating a 'div' based on conditional logic. I had created the animation as a CSS class, which could be added/removed from the 'div'. The challenge was that once added, I could not re-add to fire the animation when desired. Removing it and adding it in the same function was not a solution as once the function returned the final state would not be changed. I finally realized a setTimeout would do the trick.

One more notable challenge was validating neighbors & tracking those that had been 'checked.' Though many cells had the full 8 neighbors, I needed to ensure I was validating them before the script would check for the presense of a 'poo' to avoid any undefined issues. In addition, I needed to note which cells had been checked or my recursive check feature would lead to a Stack Overflow.
## Win
I was able to use recursion in the primary function of the game, (paste code here). On each click, I needed the process to recursively:
1. Check the valid neighbors of a cell for a 'poo'
2. Tally the number containing 'poos'
3. Color code that number
4. Insert that into the target cell innerHTML
5. Repeat on any neighboring cell that had no neighboring cells containing 'poos' and had not already been checked.