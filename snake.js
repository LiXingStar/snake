/*
*  属性
*    蛇 arr
*  方法
*   画线
*   画蛇
* */
function Snake(){
    this.sence = document.querySelector('div.sence');
    this.snake = ['5_0','6_0','7_0'];
    this.direction = 39;
    this.flag = {'5_0':true,'6_0':true,'7_0':true};
    this.food = '';
}
Snake.prototype={
    start:function(){
       this.drawLine();
       this.drawSnake();
       this.move();
       this.key();
    },
    drawLine:function(){
       for(let i=0;i<20;i++){
           for(let j=0;j<20;j++){
               this.sence.innerHTML += `<div class="block" id="${i}_${j}"></div>`;
           }
       }
    },
    drawSnake:function(){
        this.snake.forEach(element=>{
            document.getElementById(element).classList.add('hot');
        })
    },
    move:function(){
        /* 加头 去尾 */
        let that = this;
        this.t = setInterval(function(){
            let oldt = that.snake[that.snake.length-1];
            let arr = oldt.split('_');// 7_0  '7' '0'
            let newt = '';
            if(that.direction == 37){
                newt = `${arr[0]*1}_${arr[1]*1-1}`
            }else if(that.direction == 38){
                newt = `${arr[0]*1-1}_${arr[1]}`
            }else if(that.direction == 39){
                newt = `${arr[0]}_${arr[1]*1+1}`
            }else if(that.direction == 40){
                newt = `${arr[0]*1+1}_${arr[1]}`
            }

            if(newt[1]<0 || newt[1]>19){
                clearInterval(that.t);
                alert('game over');
            }

            // 新头坐标  == 食物  新头 dropFood

            that.snake.push(newt);
            that.flag[newt] = true;
            let weiba = that.snake.shift();
            delete  that.flag[weiba];
            document.getElementById(weiba).classList.remove('hot');
            that.drawSnake();

        },1000)
    },
    key:function(){
        document.onkeydown = function(e){
            let keycode = e.keyCode;
            if(Math.abs(keycode-this.direction)==2){
               return ;
            }
            this.direction = keycode;
        }.bind(this);
    },
    dropFood:function(){
        let x = Math.floor(Math.random()*20);
        let y = Math.floor(Math.random()*20);
        // x_y  flag
        do{
             x = Math.floor(Math.random()*20);
             y = Math.floor(Math.random()*20);
        }while(this.flag[`${x}_${y}`])

        this.food = `${x}_${y}`;

        document.getElementById(this.food).style.background = 'red';
    }
}

