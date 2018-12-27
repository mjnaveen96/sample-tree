(function() {
  angular.module('myTree')
.directive('treeDirective',treeDirectiveFun);
function treeDirectiveFun() {
  return{
link : treeFun,
restrict : 'EA',
templateUrl:"app/tre/templates/treeTemplate.html"
}
function treeFun(scope,element,attrs) {

    var par = {

        name: "FeatherSoft",
        id: "FS000",
        level: "0",
        status: "1",
        ch: [{
            name: "FS A Dept",
            id: "FSA00",
            level: "1",
            status: "1",
            ch: [{
                name: "A Dept Emp1",
                id: "FSA01",
                level: "2",
                status: "1",
                ch: []
            }, {
                name: "A Dept Emp2",
                id: "FSA02",
                level: "2",
                status: "1",
                ch: []
            }]

        }, {
            name: "FS B Dept",
            id: "FSB00",
            level: "1",
            status: "1",
            ch: [{
                name: "B Dept Emp1",
                id: "FSB01",
                level: "2",
                status: "1",
                ch: []
            }, {
                name: "B Dept Emp2",
                id: "FSB02",
                level: "2",
                status: "1",
                ch: []
            }]

        },{
            name: "FS C Dept",
            id: "FSC00",
            level: "1",
            status: "1",
            ch: [{
                name: "C Dept Emp1",
                id: "FSC01",
                level: "2",
                status: "1",
                ch: []
            }, {
                name: "C Dept Emp2",
                id: "FSC02",
                level: "2",
                status: "1",
                ch: []
            }]

        }]

    };

    var divisn = document.getElementById("main");

    var div = document.createElement("div");
    var t = document.createTextNode(par.name);
    div.appendChild(t);
    divisn.appendChild(div);
    div.style.width = "80px";
    div.style.height = "60px";
    div.style.background = "#007acc";
    div.style.color = "white";
    div.style.display = "inline-block";
    div.style.margin = "20px";
    div.style.position = "relative";
    div.id=par.name;
    div.addEventListener("click", function() {

        view(par);
        if (par.ch == "") {
            alert("there is no child for this object");
        }

    });

    function view(parent) {

        var container = createlevelcontainer(parent);
        var position = getPosition(document.getElementById(parent.name));
       var position={left:500};
        if (container != null)
            createchild(parent, container, position);

    }

    function createlevelcontainer(parent) {

        var lev = parent.ch[0].level;
        if (parent.status == "1") {

            parent.status = "0";

            if (document.getElementById(lev)) {
                var par = document.getElementById(lev);
                if (par) {

                    while (par.nextSibling) {

                        par.parentNode.removeChild(par.nextSibling);
                    }
                    while (par.firstChild) {
                        par.removeChild(par.firstChild);
                    }
                }
                return document.getElementById(lev);
            } else {
                var levl = document.createElement("div");
                levl.id = parent.ch[0].level;
                levl.style.width = "100%";
                levl.style.height = "100px";

                levl.style.color = "white";
                levl.style.display = "inline-block";
                levl.style.margin = "20px";
                levl.style.position = "relative";
                levl.style.display = "display: table";
                return levl;
            }

        } else if (parent.status == "0") {

            parent.status = "1";
            // romeve all child branch and current child itself
            var par = document.getElementById(lev);
            if (par) {

                while (par.nextSibling) {

                    par.parentNode.removeChild(par.nextSibling);
                }
                par.parentNode.removeChild(par);
                offStatus(parent.ch);
            }

            return null;

        }

    }

    function offStatus(obArr) {
        if (obArr.length != 0) {
            for (i of obArr) {
                i.status = "1";
                offStatus(i.ch);
            }

        }

    }

    function createchild(parent, container, pos) {
        var arr = parent.ch;
        var lft = pos.left;
        var diff = pos.right - lft;
        switch (arr.length) {
        case 1:
            {
                lft = pos.left - 25;
                break;
            }
        case 2:
            {
                lft = pos.left - 30 ;
                 diff = 20;
                break;
            }
        case 3:
            {
                lft = pos.left - 107;
                diff = 0;
                break;
            }
        default:
            {
                lft = pos.left;

            }
        }

        for (var i of arr) {

            var divisn = container;
            var div = document.createElement("div");
            div.style.left = lft+"px";
            lft = lft + diff;
            div.style.width = "80px";
            div.style.height = "60px";
            div.style.background = "#007acc";
            div.style.color = "white";
            div.style.display = "inline-block";
            // div.style.vertical-align="middle" ;
            div.style.margin = "50px";
            div.style.position = "relative";


            div.value = i;
            console.log(div.value);

            var t = document.createTextNode(i.name);
            div.appendChild(t);
            div.id = i.name;
            div.name = container.id;
            div.addEventListener("click", function() {
                if (i.ch == "") {
                    alert("there is no child for this object");
                } else {
                    view(this.value);

                }

            });

            divisn.appendChild(div);

            var level = document.getElementById("main");
            level.appendChild(divisn);

        }

    }
    function getPosition(element) {
    	console.log(element.getBoundingClientRect());
        return element.getBoundingClientRect();
    }
}
}
}
)();
