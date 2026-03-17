import {useEffect,useState} from "react"

const ScoreBoard = () => {

const [scoreX,setScoreX] = useState(
Number(localStorage.getItem("scoreX")) || 0
)

const [scoreO,setScoreO] = useState(
Number(localStorage.getItem("scoreO")) || 0
)

useEffect(()=>{
localStorage.setItem("scoreX",scoreX)
localStorage.setItem("scoreO",scoreO)
},[scoreX,scoreO])

return{

scoreX,
scoreO,
setScoreX,
setScoreO

}

}

export default ScoreBoard