

function init () {
  console.log('JS is working.')

  const cells = []
  const height = 20
  const width = 20
  const mineCount = 10
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
      }
    }
  }

  createGrid()




}

window.addEventListener('DOMContentLoaded', init)