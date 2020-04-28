new Vue({
	el:"#app",
	data:{
		gameStart: true,
		playerHealth: 100,
		monsterHealth: 100,
		log: []
	},
	methods: {
		startGame: function(){
			this.gameStart = !this.gameStart;
		}
	}

});