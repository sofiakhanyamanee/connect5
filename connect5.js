const body = document.getElementsByTagName("body")[0]
const p = document.createElement("p")
p.className = "p"
p.textContent = "Connect5"
body.prepend(p)
let user_input_row = 25 // ändra i variabeln för att få färre rader
let user_input_column = 25 // ändra i variabeln för att få färre columner
let pattern = create_pattern(user_input_row, user_input_column)
const SIZE = 4
const SPACE = 20
const ROWS = pattern.length
const COLUMNS = pattern.length
let player = 0
let clickCounter = 0
let won = 0

// skapa board
function create_pattern(rows, cols) {
    let arr = []

    for (let i = 0; i < rows; i++) {
        arr.push([])

        arr[i].push(new Array(cols))
        for (let j = 0; j < cols; j++) {
            arr[i][j] = undefined
        }
    }
    return arr
}

for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
        let cell = document.createElement("div")
        cell.setAttribute("class", "cell")
        cell.onclick = function() {
            // Så länge ingen vinner så körs detta
            if (won == 0) {
                // Kolla om en cell är klickad
                if (pattern[row][column] === undefined) {
                    // Lägg till spelare i cell, lägg till i totala drag,
                    // kolla om någon vinner med funktionen checkWinner.
                    if (player == 1) {
                        cell.style.backgroundColor = "orange"
                        clickCounter += 1
                        pattern[row][column] = "Player 2"
                        checkWinner(row, column, pattern[row][column])

                        // Lägg till spelare i cell, lägg till i totala drag,
                        // kolla om någon vinner med funktionen checkWinner.
                    } else {
                        cell.style.backgroundColor = "#C65D7B"
                        clickCounter += 1
                        pattern[row][column] = "Player 1"
                        checkWinner(row, column, pattern[row][column])
                    }

                    document.getElementById("count").innerHTML = "Total draw: " + clickCounter

                    player = player ? 0 : 1
                }
                // console.log("row: " + row + " " + "column " + column + ": " + pattern[row][column])
                document.getElementById("demo").innerHTML = "Player " + (player + 1) + " - your turn"
            }
        }

        document.querySelector("#stage").appendChild(cell)
        document.getElementById("demo").onclick = function() {}

        // placera cell i rätt position
        cell.style.top = row * (SIZE + SPACE) + "px"
        cell.style.left = column * (SIZE + SPACE) + "px"
    }
}

// Kollar efter vinst

function checkWinner(row, column, player) {
    let counter = 0 // plussar på i varje matchning
    let max = 4 // Kolla så att man inte går utanför tabellen
    console.log("player: " + player)

    // Räkna åt höger
    if (column + max < 25) {
        if (pattern[row][column + 1] == player) {
            counter += 1
            if (pattern[row][column + 2] == player) {
                counter += 1
                if (pattern[row][column + 3] == player) {
                    counter += 1
                    if (pattern[row][column + 4] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }

    // Räkna åt vänster
    if (column - max >= 0) {
        if (pattern[row][column - 1] == player) {
            counter += 1
            if (pattern[row][column - 2] == player) {
                counter += 1
                if (pattern[row][column - 3] == player) {
                    counter += 1
                    if (pattern[row][column - 4] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }
    // Resettar counter.
    counter = 0

    // Räkna neråt
    if (row + max < 25) {
        if (pattern[row + 1][column] == player) {
            counter += 1
            if (pattern[row + 2][column] == player) {
                counter += 1
                if (pattern[row + 3][column] == player) {
                    counter += 1
                    if (pattern[row + 4][column] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }

    // Räkna uppåt
    if (row - max >= 0) {
        if (pattern[row - 1][column] == player) {
            counter += 1
            if (pattern[row - 2][column] == player) {
                counter += 1
                if (pattern[row - 3][column] == player) {
                    counter += 1
                    if (pattern[row - 4][column] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }
    // Resettar counter.
    counter = 0

    // Räkna diagonalt ner höger
    if (row + max < 25 && column + max < 25) {
        if (pattern[row + 1][column + 1] == player) {
            counter += 1
            if (pattern[row + 2][column + 2] == player) {
                counter += 1
                if (pattern[row + 3][column + 3] == player) {
                    counter += 1
                    if (pattern[row + 4][column + 4] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }

    // Räkna diagonalt uppåt vänster
    if (row - max >= 0 && column - max >= 0) {
        if (pattern[row - 1][column - 1] == player) {
            counter += 1
            if (pattern[row - 2][column - 2] == player) {
                counter += 1
                if (pattern[row - 3][column - 3] == player) {
                    counter += 1
                    if (pattern[row - 4][column - 4] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }
    // Resettar counter.
    counter = 0

    // Räkna diagonalt upp höger
    if (row - max >= 0 && column + max < 25) {
        if (pattern[row - 1][column + 1] == player) {
            counter += 1
            if (pattern[row - 2][column + 2] == player) {
                counter += 1
                if (pattern[row - 3][column + 3] == player) {
                    counter += 1
                    if (pattern[row - 4][column + 4] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }

    // Räkna diagonalt ner vänster
    if (row + max < 25 && column - max >= 0) {
        if (pattern[row + 1][column - 1] == player) {
            counter += 1
            if (pattern[row + 2][column - 2] == player) {
                counter += 1
                if (pattern[row + 3][column - 3] == player) {
                    counter += 1
                    if (pattern[row + 4][column - 4] == player) {
                        counter += 1
                    }
                }
            }
        }
    }

    if (counter >= 4) {
        document.getElementById("myPopup").innerHTML = player + " is our winner 🏆"
        console.log("WINNER")
        won = 1
    }
}
