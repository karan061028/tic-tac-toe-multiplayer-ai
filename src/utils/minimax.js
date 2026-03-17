import { checkWinner } from "./winner"

export function minimax(board,depth,isMax){

const result = checkWinner(board)

if(result?.winner === "O") return 10 - depth
if(result?.winner === "X") return depth - 10
if(!board.includes(null)) return 0

if(isMax){

let best = -Infinity

for(let i=0;i<9;i++){

if(board[i] === null){

board[i] = "O"

best = Math.max(best,minimax(board,depth+1,false))

board[i] = null

}

}

return best

}else{

let best = Infinity

for(let i=0;i<9;i++){

if(board[i] === null){

board[i] = "X"

best = Math.min(best,minimax(board,depth+1,true))

board[i] = null

}

}

return best

}

}

export function bestMove(board){

let bestScore = -Infinity
let move

for(let i=0;i<9;i++){

if(board[i] === null){

board[i] = "O"

let score = minimax(board,0,false)

board[i] = null

if(score > bestScore){

bestScore = score
move = i

}

}

}

return move

}