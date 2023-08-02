class Game {
	constructor(p1, p2) {
		this.WIDTH = 7;
		this.HEIGHT = 6;
		this.p1 = p1;
		this.p2 = p2;
		this.currPlayer = p1; // active player: 1 or 2
		this.board = []; // array of rows, each row is array of cells  (board[y][x])
		this.gameOver = false;
		this.makeBoard();

		this.makeHtmlBoard();
	}
	makeBoard() {
		for (let y = 0; y < this.HEIGHT; y++) {
			this.board.push(Array.from({ length: this.WIDTH }));
		}
	}
	changePlayer() {
		this.currPlayer = 2;
	}
	makeHtmlBoard() {
		const board = document.getElementById("board");
		document.querySelectorAll("tr").forEach((x) => x.remove());
		// make column tops (clickable area for adding a piece to that column)
		const top = document.createElement("tr");
		top.setAttribute("id", "column-top");
		top.addEventListener("click", this.handleClick.bind(this));

		for (let x = 0; x < this.WIDTH; x++) {
			const headCell = document.createElement("td");
			headCell.setAttribute("id", x);
			top.append(headCell);
		}

		board.append(top);

		// make main part of board
		for (let y = 0; y < this.HEIGHT; y++) {
			const row = document.createElement("tr");

			for (let x = 0; x < this.WIDTH; x++) {
				const cell = document.createElement("td");
				cell.setAttribute("id", `${y}-${x}`);
				row.append(cell);
			}

			board.append(row);
		}
	}

	handleClick(evt) {
		if (this.gameOver) {
			return;
		}
		// get x from ID of clicked cell
		const x = +evt.target.id;
		// get next spot in column (if none, ignore click)
		const y = this.findSpotForCol(x);
		if (y === null) {
			return;
		}
		// place piece in board and add to HTML table
		this.board[y][x] = this.currPlayer;
		this.placeInTable(y, x);
		// check for win
		if (this.checkForWin()) {
			return this.endGame(`Player ${this.currPlayer.name} won!`);
		}
		// check for tie
		if (this.board.every((row) => row.every((cell) => cell))) {
			return this.endGame("Tie!");
		}

		// switch players
		this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
	}
	/** findSpotForCol: given column x, return top empty y (null if filled) */
	findSpotForCol(x) {
		for (let y = this.HEIGHT - 1; y >= 0; y--) {
			if (!this.board[y][x]) {
				return y;
			}
		}
		return null;
	}
	placeInTable(y, x) {
		const piece = document.createElement("div");
		piece.classList.add("piece");
		piece.style.backgroundColor = this.currPlayer.color;
		piece.style.top = -50 * (y + 2);

		const spot = document.getElementById(`${y}-${x}`);
		spot.append(piece);
	}
	endGame(msg) {
		this.gameOver = true;
		alert(msg);
	}

	checkForWin() {
		function _win(cells) {
			// Check four cells to see if they're all color of current player
			//  - cells: list of four (y, x) cells
			//  - returns true if all are legal coordinates & all match currPlayer

			return cells.every(
				([y, x]) =>
					y >= 0 &&
					y < this.HEIGHT &&
					x >= 0 &&
					x < this.WIDTH &&
					this.board[y][x] === this.currPlayer
			);
		}

		for (let y = 0; y < this.HEIGHT; y++) {
			for (let x = 0; x < this.WIDTH; x++) {
				// get "check list" of 4 cells (starting here) for each of the different
				// ways to win
				const horiz = [
					[y, x],
					[y, x + 1],
					[y, x + 2],
					[y, x + 3],
				];
				const vert = [
					[y, x],
					[y + 1, x],
					[y + 2, x],
					[y + 3, x],
				];
				const diagDR = [
					[y, x],
					[y + 1, x + 1],
					[y + 2, x + 2],
					[y + 3, x + 3],
				];
				const diagDL = [
					[y, x],
					[y + 1, x - 1],
					[y + 2, x - 2],
					[y + 3, x - 3],
				];

				// find winner (only checking each win-possibility as needed)
				if (
					_win.call(this, horiz) ||
					_win.call(this, vert) ||
					_win.call(this, diagDR) ||
					_win.call(this, diagDL)
				) {
					return true;
				}
			}
		}
	}
}
class Player {
	constructor(color, name) {
		this.name = name;
		this.color = color;
	}
}
document.getElementById("new-game").addEventListener("click", () => {
	const p1 = new Player(document.getElementById("p1-color").value, "1");
	const p2 = new Player(document.getElementById("p2-color").value, "2");
	new Game(p1, p2);
});
