var head;
var nodes;

function setup() {
    head = new Node(6, 5, 1000, 300);
    nodes = [];
    initialize(head);
    // head.createChildren();
    createCanvas(4000, 4000);

    stroke(240, 230, 140);
    showCode();

    // background(200);
}

function draw() {
    strokeWeight(5);

    head.display();
    fill(240, 230, 140);
    if (head.hovered()) {
        fill(255);
    } else {
        fill(240, 230, 140);
    }
    stroke(240, 230, 140);

    for (node of nodes) {
        if (node.clicked()) {
            if (node.left) {
                node.leftArrow();
                node.rightArrow();
                node.display();
                node.left.display();
                node.right.display();
            } else {

            }
        }
    }
    // (new Node(4, 250, 300)).display();
    // noStroke();
}


function fib(n) {
    var A = (1+Math.sqrt(5))/2,
        B = (1-Math.sqrt(5))/2,
        value = (Math.pow(A, n) - Math.pow(B, n)) / Math.sqrt(5);
    return Math.ceil(value);
}

function Node(n, level, x, y) {
    this.n = n;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
    this.fib = fib(n);
    this.level = level;
    this.revealed = false;

    this.display = function() {
        rectMode(CENTER);
        noStroke();
        fill(240, 230, 140);
        rect(this.x, this.y, 10 + 40 * this.level, 50 + 10 * this.level);
        fill(105);
        textSize(10 + 4 * this.level);
        textAlign(CENTER, CENTER);
        if (this.revealed) {

        } else {
            text("fib(" + this.n + ")", this.x, this.y);
        }
    }

    this.hovered = function() {
        return mouseX > (this.x - 100) && mouseX < (this.x + 100)
            && mouseY > (this.y - 50) && mouseY < (this.y + 50);
    }

    this.clicked = function() {
        return this.hovered() && mouseIsPressed;
    }

    this.leftArrow = function() {
        stroke(105);
        // line(x-25, y+50, x-25, y+100);
        // line(x-25, y+100, x-150, y+100);
        // line(x-150, y+100, x-150, y+200);
        line(this.x, this.y, this.left.x, this.right.y);
    }

    this.rightArrow = function() {
        stroke(105);
        // line(x+25, y+50, x+25, y+100);
        // line(x+25, y+100, x+150, y+100);
        // line(x+150, y+100, x+150, y+200);
        line(this.x, this.y, this.right.x, this.right.y);
    }

    this.createChildren = function() {
        if (this.n > 1) {
            leftNode = new Node(this.n - 1, this.level - 1, this.x - (5 * this.level ** 2.75), this.y + 200);
            rightNode = new Node(this.n - 2, this.level - 1, this.x + (5 * this.level ** 2.75), this.y + 200);
            this.left = leftNode,
            this.right = rightNode;
        }
    }

    this.displayChildren = function() {
        if (left && right) {
            this.left.display();
            this.right.display();
        }
    }

}

function initialize(node) {
    nodes.push(node);
    if (node.n > 1) {
        node.createChildren();
        initialize(node.left);
        initialize(node.right);
    }
}

function showCode() {
    textSize(32);
    textFont("Helvetica");
    strokeWeight(0);
    textAlign(CENTER);
    text("Tree Recursion", 500, 50);

    textAlign(LEFT);
    textFont("Courier");
    textSize(12);

    var code = "function fib(n) {\n" +
               "  if n < 2 {\n" +
               "    return n;\n" +
               "  }\n" +
               "  return fib(n - 1) + fib (n - 2);\n" +
               "}";
    text(code, 75, 100);
}
