function load() {
  let canvas = document.getElementById('box');
  let ctx = canvas.getContext('2d');
  canvas.width = window.innerHeight;
  canvas.height = window.innerWidth;

  function connect(p1,p2){//Connects each node with a line, following the tree.
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  function Node(x, y, r, color,number, fontColor='black') {//Node visual and functional representation
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.number = number;

    this.createMiddle = (color,number, fontColor)=>{
      this.middle = new Node(this.x, this.y+this.r*3, 20,color,number, fontColor);
    };
    this.createLeft = (color,number, fontColor)=>{
      this.left = new Node(this.x-this.r*2, this.y+this.r*3, 20,color,number, fontColor);
    };
    this.createRight = (color,number, fontColor)=>{
      this.right = new Node(this.x+this.r*2, this.y+this.r*3, 20,color,number, fontColor);
    };

    this.left = null;
    this.right = null;
    this.middle = null;

    this.draw = (ctx) => {
      if (this.left !== null){
        connect(this,this.left);
        this.left.draw(ctx);
      }
      if (this.right !== null){
        connect(this,this.right);
        this.right.draw(ctx);
      }
      if (this.middle !== null){
        connect(this,this.middle);
        this.middle.draw(ctx);
      }
      //Canvas drawing code...
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.save();
      ctx.translate(this.x, this.y+this.r/8);
      ctx.rotate(Math.PI/2);

      ctx.textAlign = 'center';
      ctx.fillStyle = fontColor;
      ctx.fillText(this.number,-this.r/8,+this.r/5);

      ctx.restore();
    }
  }

  let root = new Node(550, 350, 20,'white',2);
  root.createMiddle('yellow',7);
  root.middle.createMiddle('green',6);
  root.middle.middle.createLeft('yellow',11);
  root.middle.middle.createRight('red',1);
  root.middle.middle.left.createMiddle('green',12);
  root.middle.middle.left.middle.createLeft('green',17);
  root.middle.middle.left.middle.createRight('red',13);

  root.middle.middle.left.middle.left.createRight('yellow',16);
  let n16 = root.middle.middle.left.middle.left.right;
  n16.createMiddle('yellow',21);
  n16.middle.createRight('red',22);
  //....

  root.middle.middle.left.middle.left.createLeft('yellow',18);
  let n18 = root.middle.middle.left.middle.left.left;
  n18.createMiddle('green',19);

  let n19 = n18.middle;
  n19.createRight('green',24);
  n19.right.createLeft('red',23);
  n19.right.createRight('red',25);

  n19.createLeft('yellow',14);
  n19.left.createLeft('green',15);

  let n15 = n19.left.left;
  n15.createRight('red',20);
  n15.createLeft('yellow',10);
  n15.left.createMiddle('yellow',9);
  n15.left.middle.createMiddle('green',4);

  let n4 = n15.left.middle.middle;
  n4.createRight('yellow',3);
  n4.right.createMiddle('red',8);

  n4.createLeft('black',5,'white');

  root.draw(ctx);

  let order = '';
  let count = 0;
  function preorder(root){
    if (root !== null){
      order += root.number + ' ';
      count++;
      preorder(root.left);
      preorder(root.right);
      preorder(root.middle);
    }
  }

  preorder(root);
  console.log(order);
  console.log(count);

}
