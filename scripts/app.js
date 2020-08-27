



function init () {
  console.log('JS is working.')

  const cells = []
  const mines = []
  const height = 20
  const width = 20
  const mineCount = 40
  const cellCount = height * width

  const grid = document.querySelector('.grid')

  function createGrid () {
    for (let i = 0; i < cellCount; i++) {
      const newCell = document.createElement('div')
      newCell.classList.add('grid-item')
      newCell.setAttribute('cellNum', i)
      newCell.innerHTML = i
      grid.appendChild(newCell)
      cells.push(newCell)
    }
    plantMines()
  }

  function plantMines() {
    for (let i = 0; i < mineCount; i++) {
      const randCellNum = Math.floor(Math.random() * cellCount)
      if (cells[randCellNum].classList.contains('mine')) {
        i--
      } else {
        cells[randCellNum].classList.add('mine')
        mines.push(cells[randCellNum])
      }
    }
  }

  

  // function to check neighbors for mine class
  // recurse on each neighbor cell (not mine)

  function checkMines (cell) {
    console.log(cell)
    const up = cell - width
    const upLeft = up - 1
    const upRight = up + 1
    const right = cell + 1
    const left = cell - 1
    const down = cell + width
    const downLeft = down - 1
    const downRight = down + 1
    const neighbors = [up, upLeft, upRight, right, left, down, downLeft, downRight].filter(neighbor => !cells[neighbor] === false)
    let counter = 0
    console.log(neighbors)
    neighbors.forEach(neighbor => {
      if (cells[neighbor].classList.contains('mine')) {
        counter++
      }
    })
    cells[cell].innerHTML = counter
  }

  createGrid()
  checkMines(6)

  



}

window.addEventListener('DOMContentLoaded', init)