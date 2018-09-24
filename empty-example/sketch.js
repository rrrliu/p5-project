var head;
var clickable;
var initialized = false;

function setup() {

    createCanvas(4000, 4000);

    stroke(240, 230, 140);
    showCode();
    buttonX = 75;
    buttonY = 275;
    buttonW = 130;
    buttonH = 50;
}

function draw() {
    rectMode(CORNER);
    fill(180);
    noStroke();
    rect(buttonX, buttonY, buttonW, buttonH);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Generate', 140, 300);
    strokeWeight(5);

    if (initialized) {
        head.display();

        // nodes[1].display();
        fill(240, 230, 140);
        if (head.hovered()) {
            fill(255);
        } else {
            fill(240, 230, 140);
        }
        stroke(240, 230, 140);

        for (var i = 0; i < clickable.length; i++) {
            node = clickable[i];
            if (node.clicked()) {
                if (node.left) {
                    node.leftArrow();
                    node.rightArrow();
                    node.display();
                    current.push(node, node.left, node.right);
                    node.left.display();
                    node.right.display();
                    clickable.splice(i, 1);
                }
            }
        }

        for (node of current) {
            ready = !node.left || node.left.revealed & node.right.revealed;
            if (node.clicked() && ready) {
                node.revealed = true;
            } else if (ready) {
                node.ready = true;
            }
            node.display();
        }

        if (head.revealed) {
            textAlign(CENTER);
            textFont('Helvetica');
            textSize(20);
            noStroke();
            fill(50, 205, 50);
            text('Congratulations! You solved fibonacci through tree recursion.', 500 + 100 * N, 300);
            // head.revealed = false;
        }
    }
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
    this.ready = false;
    this.width = 10 + 40 * level;
    this.height = 50 + 10 * level;

    this.reveal = function() {
        this.revealed = true;
    }

    this.display = function() {
        rectMode(CENTER);
        noStroke();
        if (this.ready) {
            fill(50, 205, 50);
        } else {
            fill(240, 230, 140);
        }
        rect(this.x, this.y, this.width, this.height);
        fill(105);
        textSize(10 + 4 * this.level);
        textAlign(CENTER, CENTER);
        if (this.revealed) {
            text(this.fib, this.x, this.y);
        } else {
            text('fib(' + this.n + ')', this.x, this.y);
        }
    }

    this.hovered = function() {
        return mouseX > (this.x - this.width) && mouseX < (this.x + this.width)
            && mouseY > (this.y - this.height) && mouseY < (this.y + this.height);
    }

    this.clicked = function() {
        return this.hovered() && mouseIsPressed;
    }

    this.leftArrow = function() {
        stroke(105);
        line(this.x, this.y, this.left.x, this.right.y);
    }

    this.rightArrow = function() {
        stroke(105);
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

function initialize(node, arr) {
    arr.push(node);
    if (node.n > 1) {
        node.createChildren();
        initialize(node.left, arr);
        initialize(node.right, arr);
    }
}

function overButton(x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height) {
            return true;
        }
    return false;
}

function mousePressed() {
    if (overButton(buttonX, buttonY, buttonW, buttonH)) {
        initialized = true;
        N = Math.floor(Math.random() * 4) + 2;
        head = new Node(N, N, 500 + 100 * N, 400);
        nodes = []
        clickable = [];
        current = [];
        initialize(head, nodes);
        initialize(head, clickable);
        for (var i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].n < 2) {
                clickable.splice(i, 1);
            }
        }
    }
}

function showCode() {
    textSize(32);
    textFont('Helvetica');
    strokeWeight(0);
    textAlign(CENTER);
    text('Tree Recursion', 500, 50);

    textAlign(LEFT);
    textFont('Courier');
    textSize(16);
    fill(105);
    var code = 'function fib(n) {\n' +
               '  if n < 2 {\n' +
               '    return n;\n' +
               '  }\n' +
               '  return fib(n - 1) + fib(n - 2);\n' +
               '}';
    text(code, 75, 100);
    fill(0);
    textFont('Helvetica');
    textSize(16)
    var instructions = 'Instructions: Click and hold on the yellow nodes to open up their recursive cases, then click and hold on the green nodes to solve for base cases.';
    text(instructions, 75, 250)

    var prompt = 'Choose a number N to solve for fib(N):';
    // text(prompt, 75, 275);

    textFont('Courier');
}
