function init () {
  console.log('JS is working.')

  const cells = []
  const mines = []
  const height = 10
  const width = 10
  const mineCount = 15
  const cellCount = height * width
  const checkedCells = []

  const resultDiv = document.querySelector('.result')
  const resultText = document.querySelector('.result-text')
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
    assignMineClick()
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
    checkedCells.push(cell)
    const neighbors = validNeighbs(cell)
    let counter = 0
    neighbors.forEach(neighbor => {
      if (cells[neighbor].classList.contains('mine')) {
        counter++
      }
    })
    cells[cell].innerHTML = counter
    cells[cell].style.backgroundColor = 'white'
    if (counter < 1) {
      console.log(cell)
      neighbors.forEach(neighbor => {
        if (!checkedCells.includes(neighbor)) {
          checkMines(neighbor)
        }
      })
    }
    return
  }

  function regClick (e) {
    checkMines(e.target.id)
  }
  
  function assignRegClick () {
    cells.forEach(cell => {
      if (!mines.includes(cell)) {
        cell.addEventListener('click', regClick)
      }
    })
  }

  function youLose () {
    resultText.innerHTML = 'You stepped in shit!'
    resultDiv.style.display = 'block'
    mines.forEach(cell => cell.removeEventListener('click', youLose))
    cells.forEach(cell => {
      if (!mines.includes(cell)) {
        cell.removeEventListener('click', regClick)
      }
    })
  }

  function assignMineClick () {
    mines.forEach(mine => {
      mine.addEventListener('click', youLose)
    })
  }
  
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)