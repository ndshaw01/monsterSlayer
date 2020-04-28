new Vue({
	el:"#app",
	data:{
		gameStart: "start",
		playerHealth: 100,
		monsterHealth: 100,
		log: [],
		playerWins: true
	},
	methods: {
		startGame: function(){
			this.gameStart = "mid";
		},
		attack: function(target){
			var damage = Math.ceil(Math.random() * 5);
			if(target=="m"){
				if(this.monsterHealth-damage < 0){
					this.monsterHealth = 0;
				}else{
					this.monsterHealth-=damage;
				}
			} else{
				if(this.playerHealth-damage < 0){
					this.playerHealth = 0;
				}else{
					this.playerHealth-=damage;
				}
			}
			return damage;
		},
		specialAttack:function(target){
			var damage = Math.ceil(Math.random() * 8);

			if(target=="m"){
				if(this.monsterHealth-damage < 0){
					this.monsterHealth = 0;
				}else{
					this.monsterHealth-=damage;
				}
			} else{
				if(this.playerHealth-damage < 0){
					this.playerHealth = 0;
				}else{
					this.playerHealth-=damage;
				}
			}
			return damage;
		},
		heal: function(target){
			var healing = Math.ceil(Math.random()*5)
			if(target=="m"){
				if(this.monsterHealth+healing > 100){
					this.monsterHealth = 100;
				}else{
					this.monsterHealth+=healing;
				}
			} else{
				if(this.playerHealth+healing > 100){
					this.playerHealth = 100;
				}else{
					this.playerHealth+=healing;
				}
			}
			
			return healing;
		},
		giveUp: function(){
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.log = [];
			this.gameStart = 'start';
		},
		addToLog: function(player, action,value){
			this.log.unshift(player + " has " + action  + " for " + value);
		},
		turn: function(action){

			if(action == "attacked"){
				this.addToLog("Player",action, this.attack("m"));
			} else if(action == "special attacked"){
				this.addToLog("Player", action, this.specialAttack("m"));
			} else if(action == "healed"){
				this.addToLog("Player", action, this.heal("p"));
			}
			let monsterAction = Math.random();
			if(monsterAction < 0.2){
				this.addToLog("Monster","healed", this.heal("m"));
			}else if (monsterAction<0.5){
				this.addToLog("Monster", "special attacked", this.specialAttack("p"))
			}else{
				this.addToLog("Monster", "attacked", this.attack("p"));
			}
			this.winner();
			console.log(this.log);
		},
		winner: function(){
			if(this.monsterHealth == 0){
				this.gameStart = "end";
				this.playerWins = true;
			}else if(this.playerHealth == 0){
				this.gameStart = "end";
				this.playerWins = false;
			}
		}
	},
	computed: {
		playerHealthBar: function(){
			return {'width': this.playerHealth + "%"};
		},
		monsterHealthBar: function(){
			return {'width': this.monsterHealth + "%"};
		},
		
	
	}

});