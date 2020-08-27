



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
      newCell.setAttribute('id', i)
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

  // recurse on each neighbor cell (not mine)

  function checkMines (cell) {
    cell = Number(cell)
    const up = cell - width //yes
    const upLeft = up - 1 //yes
    const upRight = up + 1 //yes
    const right = cell + 1 //no
    const left = cell - 1 // yes
    const down = cell + width //no
    const downLeft = down - 1 //no
    const downRight = down + 1 //no
    const neighbors = [up, upLeft, upRight, right, left, down, downLeft, downRight].filter(neighbor => cells[neighbor])
    let counter = 0
    const checkedCells = []
    console.log('cell: ', cell, 'neighbors: ', neighbors)
    neighbors.forEach(neighbor => {
      checkedCells.push(neighbor)
      if (cells[neighbor].classList.contains('mine')) {
        counter++
      }
    })
    cells[cell].innerHTML = counter
  }

  function handleClick (e) {
    checkMines(e.target.id)
  }

  createGrid()
  
  cells.forEach(cell => cell.addEventListener('click', handleClick))

  



}

window.addEventListener('DOMContentLoaded', init)