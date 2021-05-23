import { Component, OnInit } from '@angular/core';

enum Players {
  X = "X",
  O = "O"
}

class BoardStatus {
  valid:boolean = true;
  array:[]=[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  title = 'xo-client';
  currentPlayer = Players.X;
  matrix:any;
  counter:number=0;

  ngOnInit(): void {
    this.initGame();
   }

  renderState(x:number,y:number) {
    return this.matrix[x][y];
  }

  onClick(x:number,y:number) {

    if(this.matrix[x][y] !== undefined)
      return;

    this.counter++;
    this.matrix[x][y] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === Players.X ? Players.O : Players.X;

    setTimeout(() => {
      this.checkWin();

      if(this.counter === 9)
        this.initGame();
    },1000);
 
  }

  private initGame() {
    let matrix = [];
    for(var i=0; i<3; i++) {
        matrix[i] = new Array(3);
    }
    this.matrix = matrix;

    this.currentPlayer = Players.X;
    this.counter = 0;
  }

  private checkWin(){

    const winningConditions= (orderFunc:Function) =>  {
      for (let x = 0; x < this.matrix.length; x++) {
         let counterX = 0, counterY = 0;
         for (let y = 0; y < this.matrix[x].length; y++) {   
           if(orderFunc(x,y) === "X") counterX++;
           if(orderFunc(x,y) === "O") counterY++;
         }
   
         if(counterX === 3) return {winner : "X",win :true};
         if(counterY === 3) return {winner : "O",win :true};
      }

      return {win : false};
   
    }

    const winningslantedConditions = (symbol:string) =>{ 
      if((this.matrix[0][0] === symbol && 
         this.matrix[1][1] === symbol &&
         this.matrix[2][2] === symbol) ||
         (this.matrix[0][2] === symbol && 
          this.matrix[1][1] === symbol &&
          this.matrix[2][0] === symbol))
          return {winner : symbol,win :true};

        return {win : false};
    }

    const rowResult = winningConditions((x:number,y:number) => this.matrix[x][y]);
    const colResult = winningConditions((x:number,y:number) => this.matrix[y][x]);
    const yWinner = winningslantedConditions("O");
    const xWinner = winningslantedConditions("X");
    
    if(rowResult.win) alert(`${rowResult.winner} is the winner`);
    if(colResult.win) alert(`${colResult.winner} is the winner`);
    if(yWinner.win) alert(`O is the winner`);
    if(xWinner.win) alert(`X is the winner`);
    
    if(rowResult.win ||
      colResult.win ||
      yWinner.win ||
      xWinner.win)
      this.initGame();
  }

}
