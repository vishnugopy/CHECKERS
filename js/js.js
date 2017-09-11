$(document).ready(function () {
	var grid = new Array();
	var posPion = new Array();
	var pathPion = new Array();

//Variables pour les pions
	var movePion = new Array();

//Variables pour les Dames
	var moveDame = new Array();

	var eatPion = new Array();
	var dirLast = new Array();
	var obligation = new Array();

	var tour = 1;
	var over = 0;

	function initGrid () {
		var z = 0;
		var w = 0;
		while(z < 10)
		{
			grid[z] = new Array();
			while(w < 10)
			{
				if((z < 4) && (z % 2 == 0 && w % 2 != 0))
					grid[z][w] = 2;
				else if((z < 4) && (z % 2 != 0 && w % 2 == 0))
					grid[z][w] = 2;
				else if((z > 5) && (z % 2 != 0 && w % 2 == 0))
					grid[z][w] = 1;
				else if((z > 5) && (z % 2 == 0 && w % 2 != 0))
					grid[z][w] = 1;
				else
					grid[z][w] = 0;
				w++;
			}
			w = 0;
			z++;
		}
		z = 0;
		w = 0;
	}

	function print_grid(y, x) {
		var z = 0;
		var w = 0;
		while(z < 10)
		{
			while(w < 10)
			{
				w++;
			}
			console.log(grid[z]);
			w = 0;
			z++;
		}
	}

	function setPion() {
		var x = 0;
		var y = 0;
		var z = 0;

		posPion[0] = 11;
		posPion[1] = 11;

		while(z < 4)
		{
			obligation[z] = 0;
			pathPion[z] = new Array();
			eatPion[z] = new Array();
			movePion[z] = new Array();
			moveDame[z] = new Array();
			dirLast[z] = new Array();
			while(y < 2)
			{
				pathPion[z][y] = new Array();
				eatPion[z][y] = new Array();
				moveDame[z][y] = new Array();
				movePion[z][y] = 11;
				dirLast[z][y] = 11;
				while(x < 21)
				{
					//dirLast[z][y][x] = 11;
					moveDame[z][y][x] = 11;
					eatPion[z][y][x] = 11;
					pathPion[z][y][x] = 11;
					x++;
				}
				x = 0;
				y++;
			}
			y = 0;
			z++;
		}
		z = 0;
	}

	function resetPion() {
		var x = 0;
		var y = 0;
		var z = 0;
		var id = new String();

		posPion[0] = 11;
		posPion[1] = 11;

		while(z < 4)
		{
			obligation[z] = 0;
			while(y < 2)
			{
				movePion[z][y] = 11;
				dirLast[z][y] = 11;
				while(x < 21)
				{
					moveDame[z][y][x] = 11;
					//dirLast[z][y][x] = 11;
					eatPion[z][y][x] = 11;
					pathPion[z][y][x] = 11;
					x++;
				}
				x = 0;
				y++;
			}
			y = 0;
			z++;
		}
		z = 0;
		while(z < 10)
		{
			while(y < 10)
			{
				id += '#';
				id += putCoord(z, 'y');
				id += putCoord(y, 'x');
				$(id).removeClass("active");
				$(id).removeClass("eat");
				id = new String();
				y++;
			}
			y = 0;
			z++;
		}
	}

	function getCoord(id, axe) {
		if((axe == 'y' && id[0] == 'A') || (axe == 'x' && id[1] == '1' && id.length == 2))
			return 0;
		if((axe == 'y' && id[0] == 'B') || (axe == 'x' && id[1] == '2'))
			return 1;
		if((axe == 'y' && id[0] == 'C') || (axe == 'x' && id[1] == '3'))
			return 2;
		if((axe == 'y' && id[0] == 'D') || (axe == 'x' && id[1] == '4'))
			return 3;
		if((axe == 'y' && id[0] == 'E') || (axe == 'x' && id[1] == '5'))
			return 4;
		if((axe == 'y' && id[0] == 'F') || (axe == 'x' && id[1] == '6'))
			return 5;
		if((axe == 'y' && id[0] == 'G') || (axe == 'x' && id[1] == '7'))
			return 6;
		if((axe == 'y' && id[0] == 'H') || (axe == 'x' && id[1] == '8'))
			return 7;
		if((axe == 'y' && id[0] == 'I') || (axe == 'x' && id[1] == '9'))
			return 8;
		if((axe == 'y' && id[0] == 'J') || (axe == 'x' && id[1] == '1' && id[2] == '0'))
			return 9;
	}
	function putCoord(value, axe) {
		if(axe == 'y')
		{
			if(value == 0)
				return 'A';
			if(value == 1)
				return 'B';
			if(value == 2)
				return 'C';
			if(value == 3)
				return 'D';
			if(value == 4)
				return 'E';
			if(value == 5)
				return 'F';
			if(value == 6)
				return 'G';
			if(value == 7)
				return 'H';
			if(value == 8)
				return 'I';
			if(value == 9)
				return 'J';
		}
		if(axe == 'x')
		{
			if(value == 0)
				return '1';
			if(value == 1)
				return '2';
			if(value == 2)
				return '3';
			if(value == 3)
				return '4';
			if(value == 4)
				return '5';
			if(value == 5)
				return '6';
			if(value == 6)
				return '7';
			if(value == 7)
				return '8';
			if(value == 8)
				return '9';
			if(value == 9)
				return '10';
		}
	}

	function search_poss(x, y) {
		var dir = 0;
		var subDir = 0;
		var start = 1;
		var done = 0;
		var memX = 0;
		var memY = 0;
		var i = 0;
		var n = 0;
		var ok = 0;

		if(tour == 1)
		{
			if(grid[y][x] == 3)
			{
				console.log("coucou les Dames");
				posPion[0] = y;
				posPion[1] = x;
				while(dir < 4)
				{
					memY = y;
					memX = x;
					subDir = 0;
					start = 1;
					done = 0;
					while(done == 0)
					{
						if(dir == 0 && start == 1)
						{
							//console.log("dir = 0 && start = 1");
							n = 1;
							while(memX - n > 0 && memY - n > 0 && grid[memY - n][memX - n] == 0)
								n++;
							if(memX - n > 0 && memY - n > 0 && (grid[memY - n][memX - n] == 2 || grid[memY - n][memX - n] == 4) && grid[(memY - n) - 1][(memX - n) - 1] == 0)
							{
								eatPion[dir][0][0] = memY - n;
								eatPion[dir][1][0] = memX - n;
								pathPion[dir][0][0] = (memY - n) - 1;
								pathPion[dir][1][0] = (memX - n) - 1;
								memY = (memY - n) - 1;
								memX = (memX - n) - 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
							n = 0;
						}
						if(dir == 1 && start == 1)
						{
							//console.log("dir = 1 && start = 1");
							n = 1;
							while(memX + n < 9 && memY - n > 0 && grid[memY - n][memX + n] == 0)
								n++;
							if(memX + n < 9 && memY - n > 0 && (grid[memY - n][memX + n] == 2 || grid[memY - n][memX + n] == 4) && grid[(memY - n) - 1][(memX + n) + 1] == 0)
							{
								eatPion[dir][0][0] = memY - n;
								eatPion[dir][1][0] = memX + n;
								pathPion[dir][0][0] = (memY - n) - 1;
								pathPion[dir][1][0] = (memX + n) + 1;
								memY = (memY - n) - 1;
								memX = (memX + n) + 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
							n = 0;
						}
						if(dir == 2 && start == 1)
						{
							//console.log("dir = 2 && start = 1");
							//print_grid();
							//console.log("memY = " + memY);
							//console.log("memX = " + memX);
							n = 1;
							while(memX + n < 9 && memY + n < 9 && grid[memY + n][memX + n] == 0)
								n++;
							if(memX + n < 9 && memY + n < 9 && (grid[memY + n][memX + n] == 2 || grid[memY + n][memX + n] == 4) && grid[(memY + n) + 1][(memX + n) + 1] == 0)
							{
								eatPion[dir][0][0] = memY + n;
								eatPion[dir][1][0] = memX + n;
								pathPion[dir][0][0] = (memY + n) + 1;
								pathPion[dir][1][0] = (memX + n) + 1;
								memY = (memY + n) + 1;
								memX = (memX + n) + 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
							n = 0;
						}
						if(dir == 3 && start == 1)
						{
							//console.log("dir = 3 && start = 1");
							n = 1;
							while(memX - n > 0 && memY + n < 9 && grid[memY + n][memX - n] == 0)
								n++;
							if(memX - n > 0  && memY + n < 9 && (grid[memY + n][memX - n] == 2 || grid[memY + n][memX - n] == 4) && grid[(memY + n) + 1][(memX - n) - 1] == 0)
							{
								eatPion[dir][0][0] = memY + n;
								eatPion[dir][1][0] = memX - n;
								pathPion[dir][0][0] = (memY + n) + 1;
								pathPion[dir][1][0] = (memX - n) - 1;
								memY = (memY + n) + 1;
								memX = (memX - n) - 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								done = 1;
							}
							n = 0;
						}
						if(subDir == 0 && done != 1)
						{
							//console.log("subDir = 0");
							//print_grid();
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							n = 1;
							while(memX - n > 0 && memY - n > 0 && grid[memY - n][memX - n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY - n || eatPion[dir][1][i] != memX - n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							if(ok == 1 && memX - n > 0 && memY - n > 0 && (grid[memY - n][memX - n] == 2 || grid[memY - n][memX - n] == 4) && grid[(memY - n) - 1][(memX - n) - 1] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - n;
								eatPion[dir][1][i] = memX - n;
								pathPion[dir][0][i] = (memY - n) - 1;
								pathPion[dir][1][i] = (memX - n) - 1;
								memY = (memY - n) - 1;
								memX = (memX - n) - 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
							n = 0;
						}
						if(subDir == 1 && done != 1)
						{
							//console.log("subDir = 1");
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							n = 1;
							while(memX + n < 9 && memY - n > 0 && grid[memY - n][memX + n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY - n || eatPion[dir][1][i] != memX + n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX + n < 9 && memY - n > 0 && (grid[memY - n][memX + n] == 2 || grid[memY - n][memX + n] == 4) && grid[(memY - n) - 1][(memX + n) + 1] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - n;
								eatPion[dir][1][i] = memX + n;
								pathPion[dir][0][i] = (memY - n) - 1;
								pathPion[dir][1][i] = (memX + n) + 1;
								memY = (memY - n) - 1;
								memX = (memX + n) + 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
							n = 0;
						}
						if(subDir == 2 && done != 1)
						{
							//console.log("subDir = 2");
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							n = 1;
							while(memX + n < 9 && memY + n < 9 && grid[memY + n][memX + n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY + n || eatPion[dir][1][i] != memX + n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX + n < 9 && memY + n < 9 && (grid[memY + n][memX + n] == 2 || grid[memY + n][memX + n] == 4) && grid[(memY + n) + 1][(memX + n) + 1] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + n;
								eatPion[dir][1][i] = memX + n;
								pathPion[dir][0][i] = (memY + n) + 1;
								pathPion[dir][1][i] = (memX + n) + 1;
								memY = (memY + n) + 1;
								memX = (memX + n) + 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
							n = 0;
						}
						if(subDir == 3 && done != 1)
						{
							//console.log("subDir = 3");
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							n = 1;
							while(memX - n > 0 && memY + n < 9 && grid[memY + n][memX - n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY + n || eatPion[dir][1][i] != memX - n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							// print_grid();
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							// console.log("grid[" + memY + "][" + memX + "] = " + grid[memY][memX]);
							if(ok == 1 && memX - n > 0 && memY + n < 9 && (grid[memY + n][memX - n] == 2 || grid[memY + n][memX - n] == 4) && grid[(memY + n) + 1][(memX - n) - 1] == 0)
							{
								//console.log("	dans le if");
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + n;
								eatPion[dir][1][i] = memX - n;
								pathPion[dir][0][i] = (memY + n) + 1;
								pathPion[dir][1][i] = (memX - n) - 1;
								memY = (memY + n) + 1;
								memX = (memX - n) - 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("dans le else");
								dirLast[dir][0] = memY;
								dirLast[dir][1] = memX;
								done = 1;
							}
							n = 0;
						}
					}
					dir++;
				}
				dir = 0;
				while(dir < 4)
				{
					i = 1;
					memX = x;
					memY = y;
					while(memX - i >= 0 && memY - i >= 0 && dir == 0 && grid[memY - i][memX - i] == 0)
					{
						moveDame[dir][0][i - 1] = memY - i;
						moveDame[dir][1][i - 1] = memX - i;
						i++;
					}
					i = 1;
					memX = x;
					memY = y;
					while(memX + i <= 9 && memY - i >= 0 && dir == 1 && grid[memY - i][memX + i] == 0)
					{
						moveDame[dir][0][i - 1] = memY - i;
						moveDame[dir][1][i - 1] = memX + i;
						i++;
					}
					i = 1;
					memX = x;
					memY = y;
					while(memX + i <= 9 && memY + i <= 9 && dir == 2 && grid[memY + i][memX + i] == 0)
					{
						moveDame[dir][0][i - 1] = memY + i;
						moveDame[dir][1][i - 1] = memX + i;
						i++;
					}
					i = 1;
					memX = x;
					memY = y;
					while(memX - i >= 0 && memY + i <= 9 && dir == 3 && grid[memY + i][memX - i] == 0)
					{
						moveDame[dir][0][i - 1] = memY + i;
						moveDame[dir][1][i - 1] = memX - i;
						// console.log("memY(" + memY + ") + i(" + i + ") = " + (memY + i));
						// console.log("memX(" + memX + ") - i(" + i + ") = " + (memX - i));
						// console.log("grid[" + (memY + i) + "][" + (memX - i) + "] = " + (grid[memY + i][memX - i]));
						i++;
					}
					//console.log("moveDame[" + dir + "][0][0] = " + moveDame[dir][0][0]);
					dir++;
				}
			}
			else if(grid[y][x] == 1)
			{
				//console.log("so far so good");
				posPion[0] = y;
				posPion[1] = x;
				while(dir < 4)
				{
					memY = y;
					memX = x;
					subDir = 0;
					start = 1;
					done = 0;
					while(done == 0)
					{
						if(dir == 0 && start == 1)
						{
							//console.log("dir = 0 && start = 1");
							if(memX > 1 && memY > 1 && (grid[memY - 1][memX - 1] == 2 || grid[memY - 1][memX - 1] == 4) && grid[memY - 2][memX - 2] == 0)
							{
								eatPion[dir][0][0] = memY - 1;
								eatPion[dir][1][0] = memX - 1;
								pathPion[dir][0][0] = memY - 2;
								pathPion[dir][1][0] = memX - 2;
								memY -= 2;
								memX -= 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
						}
						if(dir == 1 && start == 1)
						{
							//console.log("dir = 1 && start = 1");
							if(memX < 8 && memY > 1 && (grid[memY - 1][memX + 1] == 2 || grid[memY - 1][memX + 1] == 4) && grid[memY - 2][memX + 2] == 0)
							{
								eatPion[dir][0][0] = memY - 1;
								eatPion[dir][1][0] = memX + 1;
								pathPion[dir][0][0] = memY - 2;
								pathPion[dir][1][0] = memX + 2;
								memY -= 2;
								memX += 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
						}
						if(dir == 2 && start == 1)
						{
							//console.log("dir = 2 && start = 1");
							//print_grid();
							//console.log("memY = " + memY);
							//console.log("memX = " + memX);
							if(memX < 8 && memY < 8 && (grid[memY + 1][memX + 1] == 2 || grid[memY + 1][memX + 1] == 4) && grid[memY + 2][memX + 2] == 0)
							{
								eatPion[dir][0][0] = memY + 1;
								eatPion[dir][1][0] = memX + 1;
								pathPion[dir][0][0] = memY + 2;
								pathPion[dir][1][0] = memX + 2;
								memY += 2;
								memX += 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
						}
						if(dir == 3 && start == 1)
						{
							//console.log("dir = 3 && start = 1");
							if(memX > 1 && memY < 8 && (grid[memY + 1][memX - 1] == 2 || grid[memY + 1][memX - 1] == 4) && grid[memY + 2][memX - 2] == 0)
							{
								eatPion[dir][0][0] = memY + 1;
								eatPion[dir][1][0] = memX - 1;
								pathPion[dir][0][0] = memY + 2;
								pathPion[dir][1][0] = memX - 2;
								memY += 2;
								memX -= 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								done = 1;
							}
						}
						if(subDir == 0 && done != 1)
						{
							//console.log("subDir = 0");
							//print_grid();
							i = 0;
							while((eatPion[dir][0][i] != memY - 1 || eatPion[dir][1][i] != memX - 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX > 1 && memY > 1 && (grid[memY - 1][memX - 1] == 2 || grid[memY - 1][memX - 1] == 4) && grid[memY - 2][memX - 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - 1;
								eatPion[dir][1][i] = memX - 1;
								pathPion[dir][0][i] = memY - 2;
								pathPion[dir][1][i] = memX - 2;
								memY -= 2;
								memX -= 2;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
						}
						if(subDir == 1 && done != 1)
						{
							//console.log("subDir = 1");
							i = 0;
							while((eatPion[dir][0][i] != memY - 1 || eatPion[dir][1][i] != memX + 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX < 8 && memY > 1 && (grid[memY - 1][memX + 1] == 2 || grid[memY - 1][memX + 1] == 4) && grid[memY - 2][memX + 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - 1;
								eatPion[dir][1][i] = memX + 1;
								pathPion[dir][0][i] = memY - 2;
								pathPion[dir][1][i] = memX + 2;
								memY -= 2;
								memX += 2;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
						}
						if(subDir == 2 && done != 1)
						{
							//console.log("subDir = 2");
							i = 0;
							while((eatPion[dir][0][i] != memY + 1 || eatPion[dir][1][i] != memX + 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX < 8 && memY < 8 && (grid[memY + 1][memX + 1] == 2 || grid[memY + 1][memX + 1] == 4) && grid[memY + 2][memX + 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + 1;
								eatPion[dir][1][i] = memX + 1;
								pathPion[dir][0][i] = memY + 2;
								pathPion[dir][1][i] = memX + 2;
								memY += 2;
								memX += 2;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
						}
						if(subDir == 3 && done != 1)
						{
							// console.log("subDir = 3");
							i = 0;
							while((eatPion[dir][0][i] != memY + 1 || eatPion[dir][1][i] != memX - 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							//print_grid();
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							// console.log("grid[" + memY + "][" + memX + "] = " + grid[memY][memX]);
							if(ok == 1 && memX > 1 && memY < 8 && (grid[memY + 1][memX - 1] == 2 || grid[memY + 1][memX - 1] == 4) && grid[memY + 2][memX - 2] == 0)
							{
								//console.log("	dans le if");
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + 1;
								eatPion[dir][1][i] = memX - 1;
								pathPion[dir][0][i] = memY + 2;
								pathPion[dir][1][i] = memX - 2;
								memY += 2;
								memX -= 2;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("dans le else");
								dirLast[dir][0] = memY;
								dirLast[dir][1] = memX;
								done = 1;
							}
						}
					}
					dir++;
				}
				dir = 0;
				while(dir < 4)
				{
					if(x > 0 && y > 0 && dir == 0 && grid[y - 1][x - 1] == 0)
					{
						movePion[dir][0] = y - 1;
						movePion[dir][1] = x - 1;
					}
					if(x < 9 && y > 0 && dir == 1 && grid[y - 1][x + 1] == 0)
					{
						movePion[dir][0] = y - 1;
						movePion[dir][1] = x + 1;
					}
					// if(dir == 2 && grid[y + 1][x + 1] == 0)
					// {
					// 	movePion[dir][0] = y + 1;
					// 	movePion[dir][1] = x + 1;
					// }
					// if(dir == 3 && grid[y + 1][x - 1] == 0)
					// {
					// 	movePion[dir][0] = y + 1;
					// 	movePion[dir][1] = x - 1;
					// }
					dir++;
				}
			}
		}
		else if(tour == 2)
		{
			if(grid[y][x] == 4)
			{
				//console.log("coucou les Dames");
				posPion[0] = y;
				posPion[1] = x;
				while(dir < 4)
				{
					memY = y;
					memX = x;
					subDir = 0;
					start = 1;
					done = 0;
					while(done == 0)
					{
						if(dir == 0 && start == 1)
						{
							//console.log("dir = 0 && start = 1");
							n = 1;
							while(memX - n > 0 && memY - n > 0 && grid[memY - n][memX - n] == 0)
								n++;
							if(memX - n > 0 && memY - n > 0 && (grid[memY - n][memX - n] == 1 || grid[memY - n][memX - n] == 3) && grid[(memY - n) - 1][(memX - n) - 1] == 0)
							{
								eatPion[dir][0][0] = memY - n;
								eatPion[dir][1][0] = memX - n;
								pathPion[dir][0][0] = (memY - n) - 1;
								pathPion[dir][1][0] = (memX - n) - 1;
								memY = (memY - n) - 1;
								memX = (memX - n) - 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
							n = 0;
						}
						if(dir == 1 && start == 1)
						{
							//console.log("dir = 1 && start = 1");
							n = 1;
							while(memX + n < 9 && memY - n > 0 && grid[memY - n][memX + n] == 0)
								n++;
							if(memX + n < 9 && memY - n > 0 && (grid[memY - n][memX + n] == 1 || grid[memY - n][memX + n] == 3) && grid[(memY - n) - 1][(memX + n) + 1] == 0)
							{
								eatPion[dir][0][0] = memY - n;
								eatPion[dir][1][0] = memX + n;
								pathPion[dir][0][0] = (memY - n) - 1;
								pathPion[dir][1][0] = (memX + n) + 1;
								memY = (memY - n) - 1;
								memX = (memX + n) + 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
							n = 0;
						}
						if(dir == 2 && start == 1)
						{
							//console.log("dir = 2 && start = 1");
							//print_grid();
							//console.log("memY = " + memY);
							//console.log("memX = " + memX);
							n = 1;
							while(memX + n < 9 && memY + n < 9 && grid[memY + n][memX + n] == 0)
								n++;
							if(memX + n < 9 && memY + n < 9 && (grid[memY + n][memX + n] == 1 || grid[memY + n][memX + n] == 3) && grid[(memY + n) + 1][(memX + n) + 1] == 0)
							{
								eatPion[dir][0][0] = memY + n;
								eatPion[dir][1][0] = memX + n;
								pathPion[dir][0][0] = (memY + n) + 1;
								pathPion[dir][1][0] = (memX + n) + 1;
								memY = (memY + n) + 1;
								memX = (memX + n) + 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								dir++;
							}
							n = 0;
						}
						if(dir == 3 && start == 1)
						{
							//console.log("dir = 3 && start = 1");
							n = 1;
							while(memX - n > 0 && memY + n < 9 && grid[memY + n][memX - n] == 0)
								n++;
							if(memX - n > 0  && memY + n < 9 && (grid[memY + n][memX - n] == 1 || grid[memY + n][memX - n] == 3) && grid[(memY + n) + 1][(memX - n) - 1] == 0)
							{
								eatPion[dir][0][0] = memY + n;
								eatPion[dir][1][0] = memX - n;
								pathPion[dir][0][0] = (memY + n) + 1;
								pathPion[dir][1][0] = (memX - n) - 1;
								memY = (memY + n) + 1;
								memX = (memX - n) - 1;
								start = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("	dans le else");
								done = 1;
							}
							n = 0;
						}
						if(subDir == 0 && done != 1)
						{
							//console.log("subDir = 0");
							//print_grid();
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							n = 1;
							while(memX - n > 0 && memY - n > 0 && grid[memY - n][memX - n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY - n || eatPion[dir][1][i] != memX - n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							if(ok == 1 && memX - n > 0 && memY - n > 0 && (grid[memY - n][memX - n] == 1 || grid[memY - n][memX - n] == 3) && grid[(memY - n) - 1][(memX - n) - 1] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - n;
								eatPion[dir][1][i] = memX - n;
								pathPion[dir][0][i] = (memY - n) - 1;
								pathPion[dir][1][i] = (memX - n) - 1;
								memY = (memY - n) - 1;
								memX = (memX - n) - 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
							n = 0;
						}
						if(subDir == 1 && done != 1)
						{
							//console.log("subDir = 1");
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							n = 1;
							while(memX + n < 9 && memY - n > 0 && grid[memY - n][memX + n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY - n || eatPion[dir][1][i] != memX + n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX + n < 9 && memY - n > 0 && (grid[memY - n][memX + n] == 1 || grid[memY - n][memX + n] == 3) && grid[(memY - n) - 1][(memX + n) + 1] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - n;
								eatPion[dir][1][i] = memX + n;
								pathPion[dir][0][i] = (memY - n) - 1;
								pathPion[dir][1][i] = (memX + n) + 1;
								memY = (memY - n) - 1;
								memX = (memX + n) + 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
							n = 0;
						}
						if(subDir == 2 && done != 1)
						{
							//console.log("subDir = 2");
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							n = 1;
							while(memX + n < 9 && memY + n < 9 && grid[memY + n][memX + n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY + n || eatPion[dir][1][i] != memX + n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							if(ok == 1 && memX + n < 9 && memY + n < 9 && (grid[memY + n][memX + n] == 1 || grid[memY + n][memX + n] == 3) && grid[(memY + n) + 1][(memX + n) + 1] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + n;
								eatPion[dir][1][i] = memX + n;
								pathPion[dir][0][i] = (memY + n) + 1;
								pathPion[dir][1][i] = (memX + n) + 1;
								memY = (memY + n) + 1;
								memX = (memX + n) + 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
								subDir++;
							n = 0;
						}
						if(subDir == 3 && done != 1)
						{
							//console.log("subDir = 3");
							//console.log(eatPion[dir][0][i]);
							//console.log("ok = " + ok);
							n = 1;
							while(memX - n > 0 && memY + n < 9 && grid[memY + n][memX - n] == 0)
								n++;
							i = 0;
							while((eatPion[dir][0][i] != memY + n || eatPion[dir][1][i] != memX - n) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							// print_grid();
							// console.log("memX = " + memX);
							// console.log("memY = " + memY);
							// console.log("grid[" + memY + "][" + memX + "] = " + grid[memY][memX]);
							if(ok == 1 && memX - n > 0 && memY + n < 9 && (grid[memY + n][memX - n] == 1 || grid[memY + n][memX - n] == 3) && grid[(memY + n) + 1][(memX - n) - 1] == 0)
							{
								//console.log("	dans le if");
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + n;
								eatPion[dir][1][i] = memX - n;
								pathPion[dir][0][i] = (memY + n) + 1;
								pathPion[dir][1][i] = (memX - n) - 1;
								memY = (memY + n) + 1;
								memX = (memX - n) - 1;
								subDir = 0;
								ok = 0;
								//console.log("	dans le if");
							}
							else
							{
								//console.log("dans le else");
								dirLast[dir][0] = memY;
								dirLast[dir][1] = memX;
								done = 1;
							}
							n = 0;
						}
					}
					dir++;
				}
				dir = 0;
				while(dir < 4)
				{
					i = 1;
					memX = x;
					memY = y;
					while(memX - i >= 0 && memY - i >= 0 && dir == 0 && grid[memY - i][memX - i] == 0)
					{
						moveDame[dir][0][i - 1] = memY - i;
						moveDame[dir][1][i - 1] = memX - i;
						i++;
					}
					i = 1;
					memX = x;
					memY = y;
					while(memX + i <= 9 && memY - i >= 0 && dir == 1 && grid[memY - i][memX + i] == 0)
					{
						moveDame[dir][0][i - 1] = memY - i;
						moveDame[dir][1][i - 1] = memX + i;
						i++;
					}
					i = 1;
					memX = x;
					memY = y;
					while(memX + i <= 9 && memY + i <= 9 && dir == 2 && grid[memY + i][memX + i] == 0)
					{
						moveDame[dir][0][i - 1] = memY + i;
						moveDame[dir][1][i - 1] = memX + i;
						i++;
					}
					i = 1;
					memX = x;
					memY = y;
					while(memX - i >= 0 && memY + i <= 9 && dir == 3 && grid[memY + i][memX - i] == 0)
					{
						moveDame[dir][0][i - 1] = memY + i;
						moveDame[dir][1][i - 1] = memX - i;
						// console.log("memY(" + memY + ") + i(" + i + ") = " + (memY + i));
						// console.log("memX(" + memX + ") - i(" + i + ") = " + (memX - i));
						// console.log("grid[" + (memY + i) + "][" + (memX - i) + "] = " + (grid[memY + i][memX - i]));
						i++;
					}
					//console.log("moveDame[" + dir + "][0][0] = " + moveDame[dir][0][0]);
					dir++;
				}
			}
			else if(grid[y][x] == 2)
			{
				posPion[0] = y;
				posPion[1] = x;
				while(dir < 4)
				{
					memY = y;
					memX = x;
					subDir = 0;
					start = 1;
					done = 0;
					while(done == 0)
					{
						if(dir == 0 && start == 1)
						{
							//console.log("dir = 0 && start = 1");
							if(memX > 1 && memY > 1 && (grid[memY - 1][memX - 1] == 1 || grid[memY - 1][memX - 1] == 3) && grid[memY - 2][memX - 2] == 0)
							{
								eatPion[dir][0][0] = memY - 1;
								eatPion[dir][1][0] = memX - 1;
								pathPion[dir][0][0] = memY - 2;
								pathPion[dir][1][0] = memX - 2;
								memY -= 2;
								memX -= 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
								dir++;
						}
						if(dir == 1 && start == 1)
						{
							//console.log("dir = 1 && start = 1");
							if(memX < 8 && memY > 1 && (grid[memY - 1][memX + 1] == 1 || grid[memY - 1][memX + 1] == 3) && grid[memY - 2][memX + 2] == 0)
							{
								eatPion[dir][0][0] = memY - 1;
								eatPion[dir][1][0] = memX + 1;
								pathPion[dir][0][0] = memY - 2;
								pathPion[dir][1][0] = memX + 2;
								memY -= 2;
								memX += 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
								dir++;
						}
						if(dir == 2 && start == 1)
						{
							//console.log("dir = 2 && start = 1");
							if(memX < 8 && memY < 8 && (grid[memY + 1][memX + 1] == 1 || grid[memY + 1][memX + 1] == 3) && grid[memY + 2][memX + 2] == 0)
							{
								eatPion[dir][0][0] = memY + 1;
								eatPion[dir][1][0] = memX + 1;
								pathPion[dir][0][0] = memY + 2;
								pathPion[dir][1][0] = memX + 2;
								memY += 2;
								memX += 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
								dir++;
						}
						if(dir == 3 && start == 1)
						{
							//console.log("dir = 3 && start = 1");
							if(memX > 1 && memY < 8 && (grid[memY + 1][memX - 1] == 1 || grid[memY + 1][memX - 1] == 3) && grid[memY + 2][memX - 2] == 0)
							{
								eatPion[dir][0][0] = memY + 1;
								eatPion[dir][1][0] = memX - 1;
								pathPion[dir][0][0] = memY + 2;
								pathPion[dir][1][0] = memX - 2;
								memY += 2;
								memX -= 2;
								start = 0;
								//console.log("	dans le if");
							}
							else
								done = 1;
						}
						if(subDir == 0 && done != 1)
						{
							i = 0;
							while((eatPion[dir][0][i] != memY - 1 || eatPion[dir][1][i] != memX - 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log("subDir = 0");
							if(ok == 1 && memX > 1 && memY > 1 && (grid[memY - 1][memX - 1] == 1 || grid[memY - 1][memX - 1] == 3) && grid[memY - 2][memX - 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - 1;
								eatPion[dir][1][i] = memX - 1;
								pathPion[dir][0][i] = memY - 2;
								pathPion[dir][1][i] = memX - 2;
								memY -= 2;
								memX -= 2;
								subDir = 0;
								ok = 0;
								//console.log("dans le if");
							}
							else
								subDir++;
						}
						if(subDir == 1 && done != 1)
						{
							i = 0;
							while((eatPion[dir][0][i] != memY - 1 || eatPion[dir][1][i] != memX + 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log("subDir = 1");
							if(ok == 1 && memX < 8 && memY > 1 && (grid[memY - 1][memX + 1] == 1 || grid[memY - 1][memX + 1] == 3) && grid[memY - 2][memX + 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY - 1;
								eatPion[dir][1][i] = memX + 1;
								pathPion[dir][0][i] = memY - 2;
								pathPion[dir][1][i] = memX + 2;
								memY -= 2;
								memX += 2;
								subDir = 0;
								ok = 0;
								//console.log("dans le if");
							}
							else
								subDir++;
						}
						if(subDir == 2 && done != 1)
						{
							i = 0;
							while((eatPion[dir][0][i] != memY + 1 || eatPion[dir][1][i] != memX + 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log("subDir = 2");
							if(ok == 1 && memX < 8 && memY < 8 && (grid[memY + 1][memX + 1] == 1 || grid[memY + 1][memX + 1] == 3) && grid[memY + 2][memX + 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + 1;
								eatPion[dir][1][i] = memX + 1;
								pathPion[dir][0][i] = memY + 2;
								pathPion[dir][1][i] = memX + 2;
								memY += 2;
								memX += 2;
								subDir = 0;
								ok = 0;
								//console.log("dans le if");
							}
							else
								subDir++;
						}
						if(subDir == 3 && done != 1)
						{
							i = 0;
							while((eatPion[dir][0][i] != memY + 1 || eatPion[dir][1][i] != memX - 1) && eatPion[dir][0][i] != 11)
								i++;
							if(eatPion[dir][0][i] == 11)
								ok = 1;
							else
								ok = 0;
							//console.log("subDir = 3");
							if(ok == 1 && memX > 1 && memY < 8 && (grid[memY + 1][memX - 1] == 1 || grid[memY + 1][memX - 1] == 3) && grid[memY + 2][memX - 2] == 0)
							{
								i = 0;
								while(eatPion[dir][0][i] != 11)
									i++;
								eatPion[dir][0][i] = memY + 1;
								eatPion[dir][1][i] = memX - 1;
								pathPion[dir][0][i] = memY + 2;
								pathPion[dir][1][i] = memX - 2;
								memY += 2;
								memX -= 2;
								subDir = 0;
								ok = 0;
								//console.log("dans le if");
							}
							else
							{
								dirLast[dir][0] = memY;
								dirLast[dir][1] = memX;
								done = 1;
							}
						}
					}
					dir++;
				}
				dir = 0;
				while(dir < 4)
				{
					// if(dir == 0 && grid[y - 1][x - 1] == 0)
					// {
					// 	movePion[dir][0] = y - 1;
					// 	movePion[dir][1] = x - 1;
					// }
					// if(dir == 1 && grid[y - 1][x + 1] == 0)
					// {
					// 	movePion[dir][0] = y - 1;
					// 	movePion[dir][1] = x + 1;
					// }
					if(x < 9 && y < 9 && dir == 2 && grid[y + 1][x + 1] == 0)
					{
						movePion[dir][0] = y + 1;
						movePion[dir][1] = x + 1;
					}
					if(x > 0 && y < 9 && dir == 3 && grid[y + 1][x - 1] == 0)
					{
						movePion[dir][0] = y + 1;
						movePion[dir][1] = x - 1;
					}
					dir++;
				}
			}
		}
	}

	function is_active(y, x) {
		var id = new String();
		id += '#';
		id += putCoord(y, 'y');
		id += putCoord(x, 'x');
		if($(id).hasClass("active"))
			return(1)
		else
			return(0);

	}

	function check_obligation() {
		var dir = 0;
		var i = 0;
		while(dir < 4)
		{
			while(pathPion[dir][0][i] != 11)
				i++;
			obligation[dir] = i;
			i = 0;
			dir++;
		}
	}

	function count_obligation() {
		var dir = 0;
		while(dir < 4)
		{
			if(obligation[dir] != 0)
				return (1);
			dir++;
		}
		return (0);
	}

	function move_pion(y, x) {
		var dir = 0;
		var i = 0;
		var id = new String();
		if(count_obligation() != 0)
		{
			while(dir < 4)
			{
				if(dirLast[dir][0] == y && dirLast[dir][1] == x)
				{
					while(eatPion[dir][0][i] != 11)
					{
						id = new String();
						id += '#';
						id += putCoord(eatPion[dir][0][i], 'y');
						id += putCoord(eatPion[dir][1][i], 'x');
						console.log("eatPion[" + dir + "][0][" + i +"] = " + eatPion[dir][0][i]);
						console.log("eatPion[" + dir + "][1][" + i +"] = " + eatPion[dir][1][i]);
						$(id + " div").removeClass("pblanc");
						$(id + " div").removeClass("pnoir");
						$(id + " div").removeClass("dblanc");
						$(id + " div").removeClass("dnoir");
						//console.log("grid[y][x] = " + grid[eatPion[dir][0][i]][eatPion[dir][1][i]]);
						grid[eatPion[dir][0][i]][eatPion[dir][1][i]] = 0;
						id = new String();
						i++;
					}
					i = 0
				}
				dir++;
			}
		}
		if(grid[posPion[0]][posPion[1]] == 1 || grid[posPion[0]][posPion[1]] == 2)
		{
			id = new String();
			id += '#';
			id += putCoord(posPion[0], 'y');
			id += putCoord(posPion[1], 'x');
			//console.log("id = " + id);
			if($(id + " div").hasClass("pblanc"))
			{
				$(id + " div").removeClass("pblanc");
				grid[posPion[0]][posPion[1]] = 0;
				id = new String();
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				if(y == 0)
				{
					$(id + " div").addClass("dblanc");
					grid[y][x] = 3;
				}
				else
				{
					$(id + " div").addClass("pblanc");
					grid[y][x] = 1;
				}
			}
			else if($(id + " div").hasClass("pnoir"))
			{
				$(id + " div").removeClass("pnoir");
				grid[posPion[0]][posPion[1]] = 0;
				id = new String();
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				if(y == 9)
				{
					$(id + " div").addClass("dnoir");
					grid[y][x] = 4;
				}
				else
				{
					$(id + " div").addClass("pnoir");
					grid[y][x] = 2;
				}
			}
		}
		else if(grid[posPion[0]][posPion[1]] == 3 || grid[posPion[0]][posPion[1]] == 4)
		{
			id = new String();
			id += '#';
			id += putCoord(posPion[0], 'y');
			id += putCoord(posPion[1], 'x');
			if($(id + " div").hasClass("dblanc"))
			{
				$(id + " div").removeClass("dblanc");
				grid[posPion[0]][posPion[1]] = 0;
				id = new String();
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				$(id + " div").addClass("dblanc");
				grid[y][x] = 3;
			}
			else if($(id + " div").hasClass("dnoir"))
			{
				$(id + " div").removeClass("dnoir");
				grid[posPion[0]][posPion[1]] = 0;
				id = new String();
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				$(id + " div").addClass("dnoir");
				grid[y][x] = 4;
			}
		}
	}

	function active_case() {
		var prio = 0;
		var dir = 0;
		var y = 0;
		var x = 0;
		var i = 0;
		var id = new String();
		check_obligation();
		console.log(obligation);
		while(dir < 4)
		{
			if(obligation[dir] > prio)
				prio = obligation[dir];
			dir++;
		}
		dir = 0;
		if(prio != 0)
		{
			while(dir < 4)
			{
				if(obligation[dir] == prio)
				{
					i = 0;
					while(eatPion[dir][0][i] != 11)
					{
						id = new String();
						id += '#';
						id += putCoord(eatPion[dir][0][i], 'y');
						id += putCoord(eatPion[dir][1][i], 'x');
						$(id).addClass("eat");
						id = new String();
						i++;
					}
					i = 0;
					id += '#';
					id += putCoord(dirLast[dir][0], 'y');
					id += putCoord(dirLast[dir][1], 'x');
					$(id).addClass("active");
					id = new String();
				}
				dir++;
			}
		}
		else
		{
			while(dir < 4)
			{
				if(grid[posPion[0]][posPion[1]] == 1 || grid[posPion[0]][posPion[1]] == 2)
				{
					if(movePion[dir][0] != 11)
					{
						id += '#';
						id += putCoord(movePion[dir][0], 'y');
						id += putCoord(movePion[dir][1], 'x');
						$(id).addClass("active");
						id = new String();
					}
				}
				else
				{
					while(moveDame[dir][0][i] != 11)
					{
						id += '#';
						id += putCoord(moveDame[dir][0][i], 'y');
						id += putCoord(moveDame[dir][1][i], 'x');
						$(id).addClass("active");
						id = new String();
						i++;
					}
					i = 0;
				}
				dir++;
			}
		}
	}

	function is_over() {
		var y = 0;
		var x = 0;
		var countBlanc = 0;
		var countNoir = 0;
		var id = new String();
		while(y < 10)
		{
			while(x < 10)
			{
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				if($(id + " div").hasClass("pblanc") || $(id).hasClass("dblanc"))
					countBlanc++;
				else if($(id + " div").hasClass("pnoir") || $(id).hasClass("dnoir"))
					countNoir++;
				id = new String();
				x++;
			}
			x = 0;
			y++;
		}
		if(countBlanc == 0 || countNoir == 0)
			return 1;
		else
			return 0;
	}

	function resetField() {
		var y = 0;
		var x = 0;
		var id = new String();
		while(y < 10)
		{
			while(x < 10)
			{
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				$(id + " div").removeClass("dblanc");
				$(id + " div").removeClass("pblanc");
				$(id + " div").removeClass("pnoir");
				$(id + " div").removeClass("dnoir");
				if(grid[y][x] == 1)
					$(id + " div").addClass("pblanc");
				else if(grid[y][x] == 2)
					$(id + " div").addClass("pnoir");
				id = new String();
				x++;
			}
			x = 0;
			y++;
		}
	}

	function count_movePion(type) {
		var dir = 0;
		if(type == 'p')
		{
			while(dir < 4)
			 {
			 	if(movePion[dir][0] != 11)
			 		return(1);
			 	dir++;
			 }
		}
		else if(type == 'd')
		{
			while(dir < 4)
			 {
			 	if(moveDame[dir][0][0] != 11)
			 		return(1);
			 	dir++;
			 }
		}
		return (0);
	}

	function no_move() {
		var y = 0;
		var x = 0;
		var countBlanc = 0;
		var countNoir = 0;
		var count = 0;
		while(y < 10)
		{
			while(x < 10)
			{
				if(tour == 1 && (grid[y][x] == 1 || grid[y][x] == 3))
				{
					count = 1;
					search_poss(x, y);
					check_obligation();
					console.log("blanc");
					console.log(count_obligation());
					console.log(count_movePion());
					if(grid[y][x] == 1 && (count_obligation() != 0 || count_movePion('p') != 0))
						countBlanc++;
					else if(grid[y][x] == 3 && (count_obligation() != 0 || count_movePion('d') != 0))
						countBlanc++;
					resetPion();
				}
				if(tour == 2 && (grid[y][x] == 2 || grid[y][x] == 4))
				{
					count = 1;
					search_poss(x, y);
					check_obligation();
					console.log("noir");
					console.log(count_obligation());
					console.log(count_movePion());
					if(grid[y][x] == 2 && (count_obligation() != 0 || count_movePion('p') != 0))
						countNoir++;
					else if(grid[y][x] == 4 && (count_obligation() != 0 || count_movePion('d') != 0))
						countNoir++;
					resetPion();
				}
				x++;
			}
			x = 0;
			y++;
		}
		if(count == 0)
			return(0);
		if((tour == 1 && countBlanc == 0) || (tour == 2 && countNoir == 0))
			return (1);
		return(0);
	}

	function remove_scale() {
		var y = 0;
		var x = 0;
		var id = new String();

		while(y < 10)
		{
			while(x < 10)
			{
				id += '#';
				id += putCoord(y, 'y');
				id += putCoord(x, 'x');
				$(id + " div").removeClass("scaleP");
				$(id + " div").removeClass("scaleD");
				id = new String();
				x++;
			}
			x = 0;
			y++;
		}
	}

	setPion();
	initGrid();

	$(".case").click(function () {
		remove_scale();
		if($("#" + $(this).attr("id") + " div").hasClass("pnoir") || $("#" + $(this).attr("id") + " div").hasClass("pblanc"))
			$("#" + $(this).attr("id") + " div").addClass("scaleP");
		else if($("#" + $(this).attr("id") + " div").hasClass("dnoir") || $("#" + $(this).attr("id") + " div").hasClass("dblanc"))
			$("#" + $(this).attr("id") + " div").addClass("scaleD");
		var y = getCoord($(this).attr("id"), 'y');
		var x = getCoord($(this).attr("id"), 'x');
		var end = 0;
		// console.log("y = " + y);
		// console.log("x = " + x);
		// console.log("id = " + $(this).attr("id"));
		if(is_over() == 0)
		{
			if(((grid[y][x] == 1 || grid[y][x] == 3) && tour == 1) || ((grid[y][x] == 2 || grid[y][x] == 4) && tour == 2))
			{
				resetPion();
				//console.log("resetPion Ok");
				search_poss(x, y);
				//console.log("search_poss Ok");
				active_case();
				//console.log("active_case Ok");
			}
			else if(is_active(y, x) == 1)
			{
				move_pion(y, x);
				resetPion();
				if(tour == 1)
				{
					$("#tour").text("Player 2!");
					tour = 2;
				}
				else
				{
					$("#tour").text("Player 1!");
					tour = 1;
				}
				end = no_move();
				if(is_over() == 1 || end == 1)
					over = 1;
			}
			else
				resetPion();
		}
		if(over == 1)
		{
			if(tour == 1 && end == 0)
				$("#h2").text("Game over ! Player 2 win!");
			else if(tour == 2 && end == 0)
				$("#h2").text("Game over ! Player 1 win!");
			else if(tour == 1 && end == 1)
				$("#h2").text("Player 1 can not move! Player 2 win!");
			else if(tour == 2 && end == 1)
				$("#h2").text("Player 1 can not move! Player 1 win!");
			$("#over").removeClass("d-none");
			$("#tour").addClass("d-none");
		}
	});
	$("#play").click(function () {
		over = 0;
		tour = 1;
		$("#over").addClass("d-none");
		$("#tour").removeClass("d-none");
		$("#tour").text("Player 1!");
		resetPion();
		initGrid();
		resetField();
	});
	$("#again").click(function () {
		over = 0;
		tour = 1;
		$("#over").addClass("d-none");
		$("#tour").text("Player 1!");
		$("#tour").removeClass("d-none");
		resetPion();
		initGrid();
		resetField();
	});

});
