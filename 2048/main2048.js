/**
 * Created by cnnic on 2016/9/1.
 */
var board = new Array();
// var emptyCells = {
//     data :_.range(0,16),
//     curNum : 16
// }

var score = 0;

$(function () {
    prepareForMobile();
    newgame();
});

function newgame() {
    // //初始化

    // // emptyCells.data = _.range(0,16);
    // emptyCells.curNum = 16;
    init();
    GenOneNumber();
    GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    // GenOneNumber();
    //GenOneNumber();
    //随机在2个格子生成数字

}

function prepareForMobile() {
    if(documentWidth > 500)
    {
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellspace = 20;
        fontsize = 60;
    }
    $('#grid-container').css('width',gridContainerWidth - 2*cellspace)
        .css('height',gridContainerWidth - 2*cellspace)
        .css('padding',cellspace)
        .css('border-radius',0.05*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength)
        .css('height',cellSideLength)
        .css('border-radius',0.05*cellSideLength);
    //number cell 在这里修改没用，因为当前状态下没有number cell的class
    // $('.number-cell').css('width',cellSideLength)
    //     .css('height',cellSideLength)
    //     .css('border-radius',0.02*cellSideLength)
    //     .css('line-height',cellSideLength);

}


document.addEventListener('touchstart',function (event) {
    //定义全局变量
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
    event.preventDefault();

});

document.addEventListener('touchmove',function (event) {
    event.preventDefault();
})

document.addEventListener('touchend',function (event) {
    //定义全局变量
    event.preventDefault();
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = (endx - startx);
    var deltay = (endy - starty);
    if(Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth)
        return;
    if(Math.abs(deltax) > Math.abs(deltay))  //x
    {
        if(deltax < 0)
        {
            if(moveLeft(board))
            {
                setTimeout("GenOneNumber()",100);
                //GenOneNumber();
                //isGameOver();
            }
        }
        else
        {
            if(moveRight(board))
            {
                setTimeout("GenOneNumber()",100);
                //GenOneNumber();
                //isGameOver();
            }
        }

    }
    else
    {
        if(deltay > 0 )
        {
            if(moveDown(board))
            {
                setTimeout("GenOneNumber()",100);
                //GenOneNumber();
                //isGameOver();
            }
        }
        else
        {
            if(moveUp(board))
            {
                setTimeout("GenOneNumber()",100);
                //GenOneNumber();
                //isGameOver();
            }
        }

    }
    setTimeout("updateBoardView()",300);
    setTimeout("isGameOver()",500);
    //x
//
});


function init() {
    score = 0;
    $("#gameover").hide();
    for( var i = 0;i < 4;i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            var grid = $("#grid-cell-" + i + '-' + j);
            var pos = getPosition(i, j);
            //board[i][j] = Math.pow(2,i*2+j+1);
            board[i][j] = 0;
            //alert(pos.top);
            grid.css('top', pos.top).css('left', pos.left);
        }
    }
    updateBoardView();


}


function GenOneNumber(){
    // if(emptyCells.curNum < 0)
    //     return -1;
    var x,y;
    //进行12次投色子操作，如果有超过30%的空格，就有99%的几律能找到
    for(var i = 0;i < 12;i++) {
        var rand = parseInt(Math.random() * 16);
        //根据rand值，在empty数组中找到对应的格子index
        x = parseInt(rand / 4);
        y = rand % 4;
        if (board[x][y] === 0)
            break;
    }
    if(i >= 10)
    {
        for( var i = 0;i < 16;i++) {
            x = parseInt(i / 4);
            y = i % 4;
            if(board[x][y] === 0)
                    break;

        }
    }
    board[x][y] = Math.random()<0.9?2:4;
    // //然后把这个空闲格子从数组中删除，方法是把最后一个格子index放到当前位置，然后curNum-1
    // //alert('rand:' +rand + 'e '+emptyCells.data[rand] + 'i ' + i +' j'+j);
    // emptyCells.curNum--;
    // emptyCells.data[rand] = emptyCells.data[emptyCells.curNum];



    var grid = $("#number-cell-" + x + '-' + y);
    var pos = getPosition(x, y);
    grid.css('top', pos.top).css('left', pos.left);
    //加入一个显示的动画
    grid.hide();
    grid.fadeIn('slow');
    setCellStyle(board[x][y],x,y);
}


$(document).keydown(function(event){
    switch (event.keyCode)
    {
        case 37:case 65://left / a
            event.preventDefault();
            if(moveLeft(board))
            {
                setTimeout("GenOneNumber()",100);
                //GenOneNumber();
                //isGameOver();
            }
            break;
        case 38:case 87://up / w
            event.preventDefault();
            if(moveUp(board))
            {
                setTimeout("GenOneNumber()",100);
                //isGameOver();
            }
            break;
        case 39:case 68://right / d
            event.preventDefault();
            if(moveRight(board))
            {
                setTimeout("GenOneNumber()",100);
                //isGameOver();
            }
            break;
        case 40:case 83://down / s
             event.preventDefault();
            if(moveDown(board))
            {
                setTimeout("GenOneNumber()",100);
                //isGameOver();
            }
            break;
        default:
            break;

    }
    setTimeout("updateBoardView()",300);
    setTimeout("isGameOver()",500);

});


function isGameOver() {
    if(noMove())
        gameOver();
}

function noMove() {
    var flag = true;
    for(var i = 0;i < 3;i++){
        for(var j = 0;j < 3;j++){
            if(board[i][j] === 0 || board[i][j+1] === 0 || board[i+1][j] === 0
                || board[i][j] === board[i][j+1] || board[i][j] === board[i+1][j])
                flag = false;
        }
    }
    return flag;
}


function gameOver() {
    $('#grid-container').hide();
    $('#gameover').fadeIn('slow');
 //   $('#grid-container').append('<div class="game-over">Game Over!</div>');
    //alert('gameover!');

}

function Merge(i,j,k,l)
{
    if(board[i][j] === 0 || board[i][j] === board[k][l])
    {
        //如果board[i][j]不是0则添加为合并分数，如果是0，再添加0也无妨
        score += board[i][j];
        board[i][j] += board[k][l];

        //加入一个显示的动画
        var grid = $("#number-cell-" + k + '-' + l);
        setCellStyle(board[k][l],k,l);


        var pos = getPosition(i,j);
        grid.animate({
            opacity: 0.85,
            top:pos.top,
            left:pos.left
        },200);

        board[k][l] = 0;
        return true;
    }
    return false;
}
