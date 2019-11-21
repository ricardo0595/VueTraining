
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
            dynamicHtml:"<p style='color:red'>This paragraph was rendered as html</p>"
        },
        methods: {
            type: function (event) {

                this.title = event.target.value

            },
            sayTest: function () {
                return myGlobal.test();
            },
            showCoordinates:function(event){
// comment
                this.x=event.clientX;
                this.y=event.clientY;

            },
            alertMe:function(){
                alert("Alert");
            }
        }

    })

}())


