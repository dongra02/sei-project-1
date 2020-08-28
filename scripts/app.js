function init () {
  console.log('JS is working.')

  const cells = []
  const poos = []
  const height = 20
  const width = 20
  const pooCount = 20
  const cellCount = height * width
  const checkedCells = []
  let pooTimerInt = null
  let pooTimer = 0
  

  const gameInfoDiv = document.querySelector('.game-info')
  const resultText = document.querySelector('.result-text')
  const grid = document.querySelector('.grid')
  const pooCountText = document.querySelector('.poo-count')
  const pooClock = document.querySelector('.poo-clock')
  pooClock.innerHTML = pooTimer

  function createGrid () {
    for (let i = 0; i < cellCount; i++) {
      const newCell = document.createElement('div')
      newCell.classList.add('grid-item')
      newCell.setAttribute('id', i)
      grid.appendChild(newCell)
      cells.push(newCell)
    }
    plantPoos()
    assignRegClick()
    assignPooClick()
    pooCountText.innerHTML = pooCount
    cells.forEach(cell => cell.addEventListener('click', pooTimerClick))
  }

  function plantPoos() {
    for (let i = 0; i < pooCount; i++) {
      const randCellNum = Math.floor(Math.random() * cellCount)
      if (poos.includes(randCellNum)) {
        i--
      } else {
        poos.push(randCellNum)
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

  function checkPoos (cell) {
    cell = Number(cell)
    checkedCells.push(cell)
    const neighbors = validNeighbs(cell)
    let counter = 0
    neighbors.forEach(neighbor => {
      if (poos.includes(neighbor)) {
        counter++
      }
    })
    cells[cell].innerHTML = counter > 0 ? counter : ''
    cells[cell].style.backgroundColor = 'white'
    if (counter < 1) {
      neighbors.forEach(neighbor => {
        if (!checkedCells.includes(neighbor)) {
          checkPoos(neighbor)
        }
      })
    }
    return
  }

  function regClick (e) {
    checkPoos(e.target.id)
  }
  
  function assignRegClick () {
    cells.forEach(cell => {
      if (!poos.includes(Number(cell.id))) {
        cell.addEventListener('click', regClick)
      }
    })
  }

  function youLose () {
    const pooCell = cells[Number(event.target.id)]
    pooCell.classList.add('mine')
    clearInterval(pooTimerInt)
    console.log('You stepped in shit. Game Over.')
    resultText.innerHTML = 'You lose!'
    poos.forEach(poo => cells[poo].removeEventListener('click', youLose))
    cells.forEach(cell => {
      cell.removeEventListener('click', pooTimerClick)
      if (!poos.includes(cell.id)) {
        cell.removeEventListener('click', regClick)
      }
    })
  }

  function assignPooClick () {
    poos.forEach(poo => {
      cells[poo].addEventListener('click', youLose)
    })
  }
  
  createGrid()

  function pooTimerClick () {
    pooTimer = 1
    pooClock.innerHTML = 1
    pooTimerInt = setInterval(() => {
      pooTimer++
      pooClock.innerHTML = pooTimer
    }, 1000)
    cells.forEach(cell => cell.removeEventListener('click', pooTimerClick))
  }
  

}

window.addEventListener('DOMContentLoaded', init)