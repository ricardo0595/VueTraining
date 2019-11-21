
(function () {

    var myGlobal = {
        test: function () {
            return "test"
        }
    }

    new Vue({
        el: "#cont1",
        data: {
            title: "Hello World!",
            objectData: {
                a: "this is a",
                b: "this is b"
            },
            googleLink:{

                url:"http://www.google.com",
                blank:false

            },
            x:0,
            y:0,
            myName:"Ricardo",
            dynamicHtml:"<p style='color:red'>This paragraph was rendered as html</p>",
            counter:0,
            secondCounter:0
        },
        computed:{

            //Computed properties are only ware of the properties that they concern about, thus, they will only be executed when the property they are linked to has changed. This helps performance since it does not execute on every DOM update
            getSecondCounterInfo:function(){
console.log("get second counter info");
                return this.secondCounter>5?'2ndCounter is greater than 5':'2ndCounter is lower than 5';

            }

        },
        methods: {

            type: function (event) {

                this.title = event.target.value

            },
            sayTest: function () {
                return myGlobal.test();
            },
            showCoordinates: function(event){
// comment
                this.x=event.clientX;
                this.y=event.clientY;

            },
            alertMe:function(){
                alert("Alert");
            },
            getCounterInfo:function(){
                console.log("get counter info");
                return this.counter>5?'Counter is greater than 5':'Counter is lower than 5';
            }

        }

    })

}())


