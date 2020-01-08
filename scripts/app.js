'use strict'

let hang1
const puzzleEle = document.querySelector('#puzzle')
const guessesEle = document.querySelector('#guesses')

window.addEventListener('keypress', (e) => {
    const guess = e.key
    hang1.makeGuess(guess)
    render(hang1.Puzzle, hang1.StatusMessage)
})

const render = (puzzle, status) => {
    puzzleEle.innerHTML = ''
    guessesEle.textContent = status

    puzzle.split('').forEach(l => {
        const letterEle = document.createElement('span')
        letterEle.textContent = l
        puzzleEle.appendChild(letterEle) 
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    hang1 = new Hangman(puzzle, 5)
    console.log(hang1)
    render(hang1.Puzzle, hang1.StatusMessage)
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()

// getPuzzle('2').then((puzzle) => {
//     console.log(puzzle)
// }).catch((error) => {
//     console.log(error)
// })

// getLocation().then((loc) => {
//     return getCountry(loc.country)
// }).then((country) => {
//     console.log(`Country: ${country.name}`)
// }).catch((error) => {
//     console.log(`Error: ${error}`)
// })

// getCurrentCountry().then((country) => {
//     console.log(country.name)
// }).catch((error) => {
//     console.log(error)
// })