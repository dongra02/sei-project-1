function init () {
  console.log('JS is working.')

  const cells = []
  const mines = []
  const height = 10
  const width = 10
  const mineCount = 15
  const cellCount = height * width
  const checkedCells = []

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
    assignRegClick()
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

  function validNeighbs (cell) {
    cell = Number(cell)
    const up = cell - width
    const upLeft = up - 1
    const upRight = up + 1
    const right = cell + 1
    const left = cell - 1
    const down = cell + width
    const downLeft = down - 1
    const downRight = down + 1
    let neighbors = [up, upLeft, upRight, right, left, down, downLeft, downRight].filter(neighbor => cells[neighbor])
    if (Math.floor(cell / width) === 0) {
      neighbors = neighbors.filter(neighbor => neighbor !== up && neighbor !== upLeft && neighbor !== upRight)
    }
    if (Math.floor(cell / width) === width - 1) {
      neighbors = neighbors.filter(neighbor => neighbor !== down && neighbor !== downLeft && neighbor !== downRight)
    }
    if (cell % width === 0) {
      neighbors = neighbors.filter(neighbor => neighbor !== left && neighbor !== upLeft && neighbor !== downLeft)
    }
    if (cell % width === width - 1) {
      neighbors = neighbors.filter(neighbor => neighbor !== right && neighbor !== upRight && neighbor !== downRight)
    }
    return neighbors
  }

  function checkMines (cell) {
    cell = Number(cell)
    const neighbors = validNeighbs(cell)
    let counter = 0
    checkedCells.push(cell)
    neighbors.forEach(neighbor => {
      checkedCells.push(neighbor)
      if (cells[neighbor].classList.contains('mine')) {
        counter++
      }
    })
    cells[cell].innerHTML = counter
  }

  function regClick (e) {
    checkMines(e.target.id)
  }
  
  function assignRegClick () {
    cells.forEach(cell => {
      if (!cell.classList.contains('mine')) {
        cell.addEventListener('click', regClick)
      }
    })
  }
  
  createGrid()

  



}

window.addEventListener('DOMContentLoaded', init)