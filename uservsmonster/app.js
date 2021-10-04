new Vue({

    el: "#app",
    data: {
        test: "test",
        gameHasStarted: false,
        Player: function (name, colorClass) {

            return {
                name: name,
                health: 100,
                colorClass: colorClass,
                attackAllowed:true
            }
        },
        player: {},
        monster: {},
        winner: null,
        healingChances:[

            {mightHeal:true,chances:3},{mightHeal:false,chances:5}

        ],
        allHealingChances:[],
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
        fightHistory: [],
        logTypes: {
            player: "is-primary",
            monster: "is-danger"
        },



    },
    computed: {

        determineWinner: function () {

            if (this.gameHasStarted) {
                // var winner = null;
                var vm = this;
                if (this.monster.health === 0) {

                    setTimeout(() => {
                        vm.winner = vm.player;
                        
                    }, 1500);

                   

                } else if (this.player.health === 0) {
                    setTimeout(() => {
                        vm.winner = vm.monster;
                    }, 1500);
                    


                }


                // if (winner !== null) {

                //Validar por qué esto no funciona
                // var w={};
                // w.name=winner.name;
                // vm = this;
                // setTimeout(function(w) {
                //     vm.winner = w;
                // }, 1500)

                // }  

            }



        }

    },
    methods: {



        closeModal: function (event) {
            console.log(event);
            try {
                let target = event.target;
                targetParent = target.parentElement;
                if (targetParent.classList.contains("is-active")) {
                    targetParent.classList.remove("is-active");
                }
            } catch (error) {
                console.log("Error cerrando modal" + error)
            }

        },






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
            this.winner = null;
            var userName = window.prompt("What's your name?");
            this.player = new this.Player(userName, "is-primary");
            this.monster = new this.Player("Monster", "is-danger");

            this.setAllDamageList();

            this.gameHasStarted = true;
        },

        willHeal:function(playerToHeal){

            var length = this.healingChances.length;
            var willHeal = false;
            this.healingChances.forEach(element => {

                for (let chances = 1; chances <= element.chances; chances++) {
                    this.allHealingChances.push(element.mightHeal);

                }

            });

            let mightHealIndex = Math.floor(Math.random() * this.allHealingChances.length);
            willHeal = this.allHealingChances[mightHealIndex];
            return willHeal;

        },

        startMonsterAttack: async function () {

            var vi = this;

            let attackTimeout =  function () {

                return new Promise(function(resolve,reject){

                    setTimeout(function () {
                        let actionAuthor = vi.monster;
                        let actionTarget = vi.player;
    
                        console.log(actionAuthor.name+" is thinking...");
                        let actionAuthorWillHeal = false;
                        if(actionAuthor.health<=25){
    
                            actionAuthorWillHeal= vi.willHeal();
    
                        }
    
                        let attackFinished = false;
                        if(actionAuthorWillHeal){
                            attackFinished=vi.heal(actionAuthor);
                        }else{
                            attackFinished=vi.attack(actionAuthor, actionTarget);
                        }
    
                        if (attackFinished) {
                            resolve(true);
                        }
    
                    }, 1000)

                }

                   

                );
                

            }

            let attackFinished = await attackTimeout();

            if (attackFinished) {
                return true;
            }

        },

        startAttack: async function () {

            let actionAuthor = this.player;
            let actionTarget = this.monster;
            let attackFinished = this.attack(actionAuthor, actionTarget);


            if (attackFinished) {
                actionAuthor.attackAllowed=false;

                if(this.winner===null){

                    let monsterAttackFinished = await this.startMonsterAttack();

                    if (monsterAttackFinished) {
                        actionAuthor.attackAllowed=true;
                        return true;
                    }

                }

               
            }

        },

        attack: function (playerAttacking, playerDamaged) {

            

            let attackAmountIndex = Math.floor(Math.random() * this.allDamageList.length);
            let attackAmount = this.allDamageList[attackAmountIndex];

            if ((playerDamaged.health - attackAmount) < 0) {
                playerDamaged.health = 0;
            } else {
                playerDamaged.health -= attackAmount;
            }

            let fightLogObject = {};

            fightLogObject.log = (playerAttacking.name + " ha hecho un ataque causando " + attackAmount + " de daño");

            fightLogObject.type = playerAttacking.colorClass;
            this.fightHistory.unshift(fightLogObject);

          
            return true;
        },

        heal: function (playerHealing) {
            var healAmount = 15;
            let fightLogObject = {};

            if ((playerHealing.health + healAmount) > 100) {
                playerHealing.health = 100;
            } else if (playerHealing.health < 100) {
                playerHealing.health += healAmount;
                fightLogObject.log = (playerHealing.name + " ha recuperado " + healAmount + " de salud");

                fightLogObject.type = playerHealing.colorClass;
                this.fightHistory.unshift(fightLogObject);
            }



            
            return true;

        }


    }

})