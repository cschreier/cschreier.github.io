'use strict'

class Hangman {
    constructor(word, remaniningGuesses) {
        this.word = word.toLowerCase().split(''),
        this.remaniningGuesses = remaniningGuesses,
        this.guessedLetters = [],
        this.status = 'playing'
    }

    get Puzzle(){
        let puzzle = ""
        this.word.forEach(l => {
            puzzle += this.guessedLetters.includes(l) || l === ' ' ? l : '*'
        })
        return puzzle
    }

    getPuzzle(){
        let puzzle = ""
        this.word.forEach(l => {
            puzzle += this.guessedLetters.includes(l) || l === ' ' ? l : '*'
        })
        return puzzle
    }

    makeGuess(guess){
        guess = guess.toLowerCase()

        if (!this.guessedLetters.includes(guess) && guess.length === 1 && this.status === 'playing'){
            this.guessedLetters.push(guess)

            if(!this.word.includes(guess))
                this.remaniningGuesses--
        }
        this.calculateStatus()
    }

    calculateStatus(){
        if(this.word.every(l => this.guessedLetters.includes(l) || l === ' '))
            this.status = "finished"
        else if (this.remaniningGuesses === 0)
            this.status = "failed"
    }

    get StatusMessage(){
        switch (this.status) {
            case 'finished': return "Great work! You guessed the word."
            case 'failed': return `Nice try! The word was "${this.word.join("")}"`
            default: return `Guesses left: ${this.remaniningGuesses}`
        }
    }

    getStatusMessage(){
        switch (this.status) {
            case 'finished': return "Great work! You guessed the word."
            case 'failed': return `Nice try! The word was "${this.word.join("")}"`
            default: return `Guesses left: ${this.remaniningGuesses}`
        }
    }
}

// const Hangman = function(word, remaniningGuesses) {
//     this.word = word.toLowerCase().split(''),
//     this.remaniningGuesses = remaniningGuesses,
//     this.guessedLetters = [],
//     this.status = "playing"
// }

// Hangman.prototype.getPuzzle = function() {
//     let puzzle = ""
//     this.word.forEach(l => {
//         puzzle += this.guessedLetters.includes(l) || l === ' ' ? l : '*'
//     });
//     return puzzle
// }

// Hangman.prototype.makeGuess = function(guess) {
//     guess = guess.toLowerCase()

//     if (!this.guessedLetters.includes(guess) && guess.length === 1 && this.status === 'playing'){
//         this.guessedLetters.push(guess)

//         if(!this.word.includes(guess))
//             this.remaniningGuesses--   
//     }

//     console.log(this.calculateStatus())
// }

// Hangman.prototype.calculateStatus = function(){
//     if(this.word.every(l => this.guessedLetters.includes(l)))
//         this.status = "finished"
//     else if (this.remaniningGuesses === 0)
//         this.status = "failed"

//     return this.status
// }

// Hangman.prototype.getStatusMessage = function(){
//     switch (this.status) {
//         case 'finished': return "Great work! You guessed the word."
//         case 'failed': return `Nice try! The word was "${this.word.join("")}"`
//         default: return `Guesses left: ${this.remaniningGuesses}`
//     }
// }