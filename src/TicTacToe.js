import React, {useContext, useState} from "react";
import { BoardContext } from "./App";
import produce from "immer";

function TicTacToe() {
  
  let {board, setBoard} = useContext(BoardContext);
  let [player, setPlayer] = useState(0);
  let [msg, setMsg] = useState("");
  let emptyBoard = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1], ];
  let [moves, setMoves] = useState(0);

  let winLogic = function(board1){
    
    board1.forEach(function(row,rowIndex){
      if( row[0] !== -1 &&
          row[0] === row[1] &&
          row[0] === row[2] ){
            win(row[0]);
          };
    })

    for(let col=0; col<3; col++){
      if( board1[0][col] !== -1 &&
          board1[0][col] === board1[1][col] &&
          board1[0][col] === board1[2][col] ){
            win(board1[0][col]);
          }
    }
    if( board1[0][0] !== -1 &&
        board1[0][0] === board1[1][1] &&
        board1[0][0] === board1[2][2] ){
          win( board1[0][0] );
        }
    else if( board1[0][2] !== -1 &&
             board1[0][2] === board1[1][1] &&
             board1[0][2] === board1[2][0] ){
               win(board1[0][2]);
             }

  }

  let win = function(winner){
    setMsg(`Player ${winner+1} wins. Refreshing...`);
    setTimeout(function(){
    setMsg("");
    setBoard(emptyBoard);
    setPlayer(0);
    setMoves(0);
  }, 3000)
  }

  let tie = function(){
    setMsg(`GAME TIED!  Refreshing... `);
    setTimeout(function(){
    setMsg("");
    setBoard(emptyBoard);
    setPlayer(0);
    setMoves(0);
  }, 3000)
  }

  return (
    <div style={{
      height: "100vh",
      width: "100%",
      fontSize: "40px",
      fontWeight: "bold",
      background: "#9999",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
      }}> 
      
      <div style={{
        color: "#ffffff",
        //margin: "0px 100px"
      }}>
        <div style={{
          background: "#FF5E13",
          borderRadius: "50px",
          padding: "8px 20px",
          paddingBottom: "12px",
          margin: "15px 0px"
        }}>Player 1 - <span role="img" aria-label="circle">⭕</span></div>
        <div style={{
          background: "#00b300",
          borderRadius: "50px",
          padding: "8px 20px",
          paddingBottom: "12px",
          margin: "15px 0px"}}>
          Player 2 - <span role="img" aria-label="cross">❌</span></div>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}>
        <div style={{
          background: "#00b300",
          color: "#ffffff",
          fontSize: "30px",
          borderRadius: "50px",
          padding: "4px 20px",
          paddingBottom: "6px",
          margin: "23px 0px"
        }}>{msg}</div>
        <div style={{
          padding: "0px",
          margin: "20px 0px",
          fontWeight: "normal"
        }}>Turn : Player { player+1}</div>
        
        <div style={{
          background: "#FF5E13",
          padding: "11px",
        }}>
        {
          board.map(function(row, rowIndex){
            return ( 
            <div style={{
              display: "flex",
              flexDirection: "row"
            }}>
              { row.map(function(item, colIndex){
                return (
                <button style={{
                  width: "115px",
                  height: "115px",
                  margin: "3px",
                  fontSize: "35px"
                  //borderRadius: "20px",
                  
                }} onClick={function(){
                    const updated = produce(board, (draftState) => {
                      if(draftState[rowIndex][colIndex] === -1){
                        draftState[rowIndex][colIndex] = player;
                        setPlayer(player === 0? 1 : 0);
                        setMoves(moves+1);
                      }
                    })
                    setBoard(updated);
                    winLogic(updated);
                    if(moves === 8){ tie(); }
                }} >{
                    item === -1 ?
                      "" :
                    item === 0 ?
                      <span role="img" aria-label="circle">⭕</span> :
                    item === 1 ?
                      <span role="img" aria-label="cross">❌</span> :
                      ""
                }</button> )
              })
            }</div> )
          })
        }
        </div>
        <div style={{
          marginTop: "115px",
          marginBottom: "0px",
          padding: "0px",
          fontSize: "25px",
          fontWeight: "normal" }}>Made by - Deepak Yadav </div>
      </div>

      <div style={{ margin: " 0px 115px"
      }}></div>
    </div>
    );
}

export default TicTacToe;
