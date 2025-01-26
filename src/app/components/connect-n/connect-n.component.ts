import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-four-in-a-row',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    PanelModule,
    MessageModule,
  ],
  providers: [MessageService],
  templateUrl: './connect-n.component.html',
  styleUrl: './connect-n.component.scss',
})
export class FourInARowComponent {
  board: string[][] = [];
  currentPlayer: 'R' | 'B' = 'R';
  winner: string | null = null;

  constructor(private messageService: MessageService) {
    this.resetGame();
  }

  resetGame() {
    this.board = Array.from({ length: 6 }, () => Array(7).fill(null));
    this.currentPlayer = 'R';
    this.winner = null;
  }

  dropDisc(column: number) {
    if (this.winner) return;

    for (let row = this.board.length - 1; row >= 0; row--) {
      if (!this.board[row][column]) {
        this.board[row][column] = this.currentPlayer;
        if (this.checkWin(row, column)) {
          this.winner = this.currentPlayer;
          this.showToast(`Winner: ${this.winner == 'R' ? 'Red' : 'Blue'}`);
        } else {
          this.currentPlayer = this.currentPlayer === 'R' ? 'B' : 'R';
        }
        return;
      }
    }
  }

  checkWin(row: number, col: number): boolean {
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal (\)
      { dr: 1, dc: -1 } // Diagonal (/)
    ];

    for (let { dr, dc } of directions) {
      let count = 1;

      for (let dir = -1; dir <= 1; dir += 2) {
        let r = row + dr * dir;
        let c = col + dc * dir;

        while (
          r >= 0 &&
          r < this.board.length &&
          c >= 0 &&
          c < this.board[0].length &&
          this.board[r][c] === this.currentPlayer
        ) {
          count++;
          if (count >= 4) return true;
          r += dr * dir;
          c += dc * dir;
        }
      }
    }

    return false;
  }

  showToast(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Game Info', detail: message });
  }

  getPlayerAsText(player: string){
    return player == 'R' ? 'Red' : 'Blue';
  }
}
