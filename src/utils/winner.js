export const winPatterns = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];

export function checkWinner(squares){

for(let pattern of winPatterns){

const [a,b,c]=pattern;

if(
squares[a] &&
squares[a]===squares[b] &&
squares[b]===squares[c]
){

return{
winner:squares[a],
pattern
};

}

}

return null;

}