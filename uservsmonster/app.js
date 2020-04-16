new Vue({

    el: "#app",
    data: {
        test: "test",
        gameHasStarted: false,
        Player: function (name) {

            return {
                name: name,
                health: 100,
            }
        },
        player: {},
        monster: {},
        damageRanges:
            [
                {
                    amount: 5,
                    chances: 7
                },
                {
                    amount: 10,
                    chances: 4
                },
                {
                    amount: 15,
                    chances: 2
                },
                {
                    amount: 20,
                    chances: 1
                },
            ],
        allDamageList: [],
        fightHistory:[],
        logTypes:{
            player:"is-primary",
            monster:"is-danger"
        },

        

    },
    methods: {

        setAllDamageList: function () {
            var length = this.damageRanges.length;


            this.damageRanges.forEach(element => {

                for (let chances = 1; chances <= element.chances; chances++) {
                    this.allDamageList.push(element.amount);

                }

            });
            console.log("AllDamageList");
            console.log(this.allDamageList);


        },

        startGame: function () {
            var userName = window.prompt("What's your name?");
            this.player = new this.Player(userName);
            this.monster = new this.Player("Monster");

            this.setAllDamageList();

            this.gameHasStarted = true;
        },

        startMonsterAttack: async function () {

            var vi = this;
            let attackTimeout = async function () {


                setTimeout(function () {
                    let playerAttacking = vi.monster;
                    let playerDamaged = vi.player;
                    let attack = vi.attack(playerAttacking, playerDamaged);
                    if (attack.attackFinished) {

                        if(typeof attack.logObject!=="undefined"){
                            attack.logObject.type=vi.logTypes.monster;
                            vi.fightHistory.unshift(attack.logObject);
                        }

                        return true;
                    }

                }, 1500)

            }

            let attackFinished = await attackTimeout();

            if (attackFinished) {
                return true;
            }

        },

        startAttack: async function () {

            let playerAttacking = this.player;
            let playerDamaged = this.monster;
            let attack = this.attack(playerAttacking, playerDamaged);
            

            if (attack.attackFinished) {

                if(typeof attack.logObject!=="undefined"){
                    attack.logObject.type=this.logTypes.player;
                    this.fightHistory.unshift(attack.logObject);
                }

                let monsterAttackFinished = await this.startMonsterAttack();

                if (monsterAttackFinished) {
                    return true;
                }
            }

        },

        attack: function (playerAttacking, playerDamaged) {

            let attackAmountIndex = Math.floor(Math.random() * this.allDamageList.length);
            let attackAmount = this.allDamageList[attackAmountIndex]
            console.log("Attack amount:" + attackAmount);
            console.log(playerAttacking.name + " ha hecho un daño de " + attackAmount);
            playerDamaged.health -= attackAmount;

            let fightLogObject={};

            fightLogObject.log=(playerAttacking.name+" ha hecho un ataque causando "+attackAmount+" de daño");
            // fightLogObject.type=playerAttacking;
            

            return {
                attackFinished:true,
                logObject:fightLogObject
            };
        }


    }

})