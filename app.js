const app = Vue.createApp ({
    data(){
        return{
            playerHealth : 100,
            monsterHealth : 100,
            round : 0,
            winner : null,
            attackMessages : []
        }
    },
    computed:{
        // Q : Computed + return
        // Q %
        monsterBar() {
            if(this.monsterHealth <= 0){
              return { width:'0%'}
            }
               return {width : this.monsterHealth + '%'}; 
            
        },
        playerBar() {
            if(this.playerHealth <= 0){
                return { width : '0%'}
            }
            return {width : this.playerHealth + '%'};
        },
        specialAttackTurn() {
            return this.round % 5 !== 0 ;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            }
            else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }
            else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        playerAttacked(){
            this.round++;
            const attack = Math.floor(Math.random() * 10 + Math.random() * 10);
            this.monsterHealth -= attack;
            this.battleLog('Player', 'hits :', attack)
            console.log('player hits the monster : ' + attack);
            this.monsterAttacked();
        },
        monsterAttacked() {
            const attack = Math.floor(Math.random() * 10 + Math.random() * 10)
            this.playerHealth -= attack;
            this.battleLog('Monster', 'hits :', attack)
            console.log('Monster hits the player: ' + attack);
        },
        specialAttack() {
            this.round++
            const attack = Math.floor(Math.random() * 10 + 12);
            this.monsterHealth -= attack;
            this.battleLog('Player', 'hits a scpecial attack of :', attack);
            console.log('Player Special Attack: ' + attack);
            this.monsterAttacked();
        },
        healMe() {
            this.round++;
            const heal = Math.floor(Math.random () * 10 + Math.random() * 10 + 2);
            if(this.playerHealth + heal > 100){
                this.playerHealth = 100;
            }else {
                this.playerHealth += heal;
            }
            this.monsterAttacked();
            this.battleLog('Player', 'heals himself for :', heal)
            console.log('Player heals himself for :' + heal)
        },
        playAgain() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.attackMessages = []
        },
        surrender() {
            this.winner = 'monster'
        },
        battleLog(who, what, value){
            this.attackMessages.unshift({
                whoDid : who,
                whatHappened : what,
                howMuch : value
            });
        }
    }
});

app.mount('#game');