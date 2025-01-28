import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connect-n',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    PanelModule,
    MessageModule,
    SliderModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './connect-n.component.html',
  styleUrls: ['./connect-n.component.scss'],
})
export class ConnectNComponent{
  @Input() rows: number = 6;
  @Input() columns: number = 7;
  @Input() winCondition: number = 4;

  board: number[][] = [];
  currentPlayer: number = 1;
  winner: number | null = null;
  highlightedColumn: number | null = null;
  cellSize: number = 60;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.initializeBoard();

  }

  initializeBoard(): void {
    this.board = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
  }

  makeMove(column: number): void {
    if (this.winner) {
      this.messageService.add({ severity: 'warn', summary: 'Game Over', detail: 'Game is over!' });
      return;
    }
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        this.board[row][column] = this.currentPlayer;
        this.checkWin(row, column, this.currentPlayer)
        if (this.winner) {
          this.messageService.add({ severity: 'success', summary: 'Game Over', detail: `Player ${this.currentPlayer === 1 ? 'Red' : 'Blue'} wins!` });
          // this.resetGame();
          return;
        }
        this.currentPlayer *= -1;
        return;
      }
    }
    this.messageService.add({ severity: 'warn', summary: 'Invalid Move', detail: 'Column is full!' });
  }

  checkWin(row: number, column: number, currentPlayer: number): void {
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal down-right
      { dr: 1, dc: -1 } // Diagonal down-left
    ];

    for (const { dr, dc } of directions) {
      let count = 1;
      count += this.countInDirection(row, column, dr, dc);
      count += this.countInDirection(row, column, -dr, -dc);
      if (count >= this.winCondition) {
        this.winner = currentPlayer;
      }
    }
  }

  countInDirection(row: number, column: number, dr: number, dc: number): number {
    let r = row + dr;
    let c = column + dc;
    let count = 0;

    while (this.isValidCell(r, c) && this.board[r][c] === this.currentPlayer) {
      count++;
      r += dr;
      c += dc;
    }

    return count;
  }

  isValidCell(row: number, column: number): boolean {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  resetGame(): void {
    this.initializeBoard();
    this.currentPlayer = 1;
    this.winner = null;
  }

  highlightColumn(column: number): void {
    this.highlightedColumn = column;
  }

  clearHighlights(): void {
    this.highlightedColumn = null;
  }

  getCellClass(value: number, colIndex: number): string {
    let baseClass = '';
    switch (value) {
      case 1:
        baseClass = 'red-cell';
        break;
      case -1:
        baseClass = 'blue-cell';
        break;
      default:
        baseClass = 'white-cell';
    }
    if (this.highlightedColumn === colIndex && value === 0) {
      baseClass += ' highlight-cell';
    }
    return baseClass;
  }

  getPlayerAsString(player: number): string {
    return player === 1 ? 'Red' : 'Blue';
  }

  zoomIn(): void {
    this.cellSize = Math.min(this.cellSize + 10, 100);
  }

  zoomOut(): void {
    this.cellSize = Math.max(this.cellSize - 10, 20);
  }
}
