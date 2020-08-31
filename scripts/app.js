function init () {
  console.log('JS is working.')

  let cells = []
  let poos = []
  let height, width, pooCount, poosToBag, cellCount, cellHeight, cellWidth
  let checkedCells = []
  let pooTimerInt = null
  let pooTimer = 0
  
  const introContain = document.querySelector('.intro-container')
  const resultText = document.querySelector('.result-text')
  const gameInfoDiv = document.querySelector('.game-info')
  const grid = document.querySelector('.grid')
  const pooCountText = document.querySelector('.poo-count')
  const pooClock = document.querySelector('.poo-clock')
  const form = document.querySelector('.intro-form')
  const gameBtns = document.querySelector('.game-btns')
  const resetBtn = document.querySelector('.reset-grid')
  const restartBtn = document.querySelector('.restart')

  form.addEventListener('submit', handleForm)
  resetBtn.addEventListener('click', createGrid)
  restartBtn.addEventListener('click', handleRestart)

  function handleForm () {
    event.preventDefault()
    const diffLevel = event.target.difficulty.value
    switch (diffLevel) {
      case 'easy':
        width = 10
        height = 10
        pooCount = 10
        cellWidth = '10%'
        cellHeight = '10%'
        grid.style.width = '330px'
        grid.style.height = '330px'
        break
      case 'med':
        width = 16
        height = 16
        pooCount = 40
        cellWidth = '6.25%'
        cellHeight = '6.25%'
        grid.style.width = '400px'
        grid.style.height = '400px'
        break
      case 'hard':
        width = 30
        height = 16
        pooCount = 99
        cellWidth = '3.33%'
        cellHeight = '6.66%'
        grid.style.width = '660px'
        grid.style.height = '330px'
        gameBtns.style.marginTop = '30px'
        break
      default:
        alert('Pick a difficulty')
        return
    }
    createGrid()
    introContain.style.display = 'none'
    gameInfoDiv.style.display = 'flex'
    grid.style.display = 'flex'
    gameBtns.style.display = 'block'
  }

  function createGrid () {
    clearGrid()
    cellCount = height * width
    for (let i = 0; i < cellCount; i++) {
      const newCell = document.createElement('div')
      newCell.classList.add('grid-item')
      newCell.setAttribute('id', i)
      grid.appendChild(newCell)
      cells.push(newCell)
    }
    cells.forEach(cell => {
      cell.style.width = cellWidth
      cell.style.height = cellHeight
      cell.addEventListener('click', pooTimerClick)
      cell.addEventListener('click', firstClick)
    })
    pooClock.innerHTML = pooTimer
    poosToBag = pooCount
    pooCountText.innerHTML = poosToBag
  }

  function clearGrid() {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild)
    }
    cells = []
    poos = []
    checkedCells = []
    pooTimer = 0
    clearInterval(pooTimerInt)
    resultText.innerHTML = ''
  }

  function handleRestart() {
    clearGrid()
    introContain.style.display = 'block'
    gameInfoDiv.style.display = 'none'
    grid.style.display = 'none'
    gameBtns.style.display = 'none'
  }

  function firstClick () {
    const firstCellNum = Number(event.target.id)
    plantPoos(firstCellNum)
    assignPooClick()
    assignRegClick()
    cells.forEach(cell => {
      cell.removeEventListener('click', firstClick)
      cell.addEventListener('contextmenu', bagPoo)
    })
    checkPoos(firstCellNum)
    checkWin()
  }

  function plantPoos(firstCellNum) {
    for (let i = 0; i < pooCount; i++) {
      const randCellNum = Math.floor(Math.random() * cellCount)
      if (poos.includes(randCellNum) || randCellNum === firstCellNum) {
        i--
      } else {
        poos.push(randCellNum)
      }
    }
  }

  function regClick (e) {
    checkPoos(e.target.id)
    checkWin()
  }
  
  function assignRegClick () {
    cells.forEach(cell => {
      if (!poos.includes(Number(cell.id))) {
        cell.addEventListener('click', regClick)
      }
    })
  }

  function assignPooClick () {
    poos.forEach(poo => {
      cells[poo].addEventListener('click', youLose)
      cells[poo].classList.add('poo')
    })
  }

  function pooTimerClick () {
    pooTimer = 1
    pooClock.innerHTML = 1
    pooTimerInt = setInterval(() => {
      pooTimer++
      pooClock.innerHTML = pooTimer
    }, 1000)
    cells.forEach(cell => cell.removeEventListener('click', pooTimerClick))
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

  function checkPoos (cellNum) {
    cellNum = Number(cellNum)
    const cell = cells[cellNum]
    cell.removeEventListener('contextmenu', bagPoo)
    if (!checkedCells.includes(cellNum)) {
      checkedCells.push(cellNum)
      cell.removeEventListener('click', regClick)
    }
    const neighbors = validNeighbs(cellNum)
    let counter = 0
    neighbors.forEach(neighbor => {
      if (poos.includes(neighbor)) {
        counter++
      }
    })
    cell.innerHTML = counter > 0 ? counter : ''
    cell.style.backgroundColor = '#acdf87'
    if (counter < 1) {
      neighbors.forEach(neighbor => {
        if (!checkedCells.includes(neighbor)) {
          cells[neighbor].removeEventListener('contextmenu', bagPoo)
          checkPoos(neighbor)
        }
      })
    }
    return
  }

  function bagPoo () {
    event.preventDefault()
    const cell = event.target
    if (cell.classList.contains('bagged') && !cell.classList.contains('poo')) {
      cell.addEventListener('click', regClick)
      poosToBag++
    } else if (cell.classList.contains('bagged') && cell.classList.contains('poo')) {
      cell.addEventListener('click', youLose)
      poosToBag++
    } else {
      cell.removeEventListener('click', regClick)
      cell.removeEventListener('click', youLose)
      poosToBag--
    }
    cell.classList.toggle('bagged')
    pooCountText.innerHTML = poosToBag
  }

  function checkWin() {
    if (checkedCells.length === cells.length - poos.length) {
      youWon()
      return
    }
  }

  function youWon () {
    resultText.innerHTML = 'You Win!'
    console.log('You won! Clean shoes...')
    endGame()
  }

  function youLose () {
    console.log('You stepped in shit. Game Over.')
    resultText.innerHTML = 'You lose!'
    event.target.classList.add('lose')
    endGame()
  }

  function endGame () {
    clearInterval(pooTimerInt)
    poos.forEach(poo => cells[poo].removeEventListener('click', youLose))
    cells.forEach(cell => {
      cell.removeEventListener('click', pooTimerClick)
      cell.removeEventListener('contextmenu', bagPoo)
      if (!poos.includes(cell.id)) {
        cell.removeEventListener('click', regClick)
      }
    })
  }


}

window.addEventListener('DOMContentLoaded', init)