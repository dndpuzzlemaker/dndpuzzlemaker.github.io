
var app = new Vue({
	el: '#app',
	data: {
		grid : 9,
		tiles : [
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
		],
		current_tile : null,
		selected_tile : null,
		selected_tile_row : null,
		selected_tile_column : null,
		modal : null,
		help : false,
		examples : false,
		json : ''
	},
	computed: {
		grid_int(){
			return parseInt(this.grid);
		},
		square_width(){
			return 100/this.grid_int;
		},
		square_height(){
			return 100/this.grid_int;
		}
	},
	methods: {
		selectTile(tile){
			this.current_tile = tile;
		},
		addTile(row, column){
			if(this.current_tile != null){
				var group_types = ['G0','G1','G2','G3','G4','G5','G6','G7','G8','G9'];
				if(group_types.indexOf(this.current_tile) == -1){
					//Setto la tile
					Vue.set(this.tiles[row], column, {
						type : this.current_tile,
						group : 0,
						rotation : 0,
						locked : false,
						trigger : 0,
					})
					this.viewDetails(null, row, column);
				}else{
					Vue.set(this.tiles[row][column], 'group', parseInt(this.current_tile[1]));
				}
			}else{
				Vue.set(this.tiles[row], column, null);
			}
		},
		viewDetails(e, row, column){
			if(e != null) e.preventDefault();
			
			this.selected_tile = this.tiles[row][column];
			this.selected_tile_row = row;
			this.selected_tile_column = column;
		},
		exportPuzzle(){
			var json = {
				grid : this.grid,
				tiles : []
			};
				
			for(var i=0; i<this.grid; i++){
				var row = [];
				for(var j=0; j<this.grid; j++){
					row.push(this.tiles[i][j]);
				}
				json.tiles.push(row);
			}
			
			this.json = JSON.stringify(json);
			this.modal = 'export';
			
			setTimeout(function(){
				let json_input = document.querySelector('#json-input');
				json_input.select();
				json_input.setSelectionRange(0, 99999); 
			});
		},
		openImportPuzzle(){
			this.modal = 'import';
		},
		importPuzzle(){
			var json = JSON.parse(this.json);
			this.grid = json.grid;
			
			for(var i=0; i<this.grid; i++){
				var row = [];
				for(var j=0; j<this.grid; j++){
					if(json.tiles[i][j] != null){
						Vue.set(this.tiles[i], j, {
							type : json.tiles[i][j].type,
							group : json.tiles[i][j].group,
							rotation : json.tiles[i][j].rotation,
							locked : json.tiles[i][j].locked,
							trigger : json.tiles[i][j].trigger,
						});
					}
				}
				json.tiles.push(row);
			}
			
			this.modal = null;
		},
		copyJson(){
			let json_input = document.querySelector('#json-input');
			json_input.select();
			json_input.setSelectionRange(0, 99999); 
			document.execCommand("copy");
		}
	}
});