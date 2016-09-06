/**
 * Created by cnnic on 2016/8/31.
 */
var board;
board = new Array();
var emptyCells = {
    data :_.range(0,16),
    curNum : 16
}

var score = 0;

var colorsheet = {
    2: '#FFF4E9',
    4:  '#FFE9D2',
    8:  '#FFD3A6',
    16: '#FFD166',
    32: '#FFCB52',
    64: '#FFE500',
    128: '#FFA061',
    256: '#FF8330',
    512: '#FF6600',
    1024: '#FF4400',
    2048: '#FF0000'
};

$(function () {
    //alert(1);
   newgame();
});

function newgame() {
    // //初始化
     emptyCells.data = _.range(0,16);
     emptyCells.curNum = 16;
     init();
     randomNumber();
     randomNumber();
    //随机在2个格子生成数字

}

function init() {

    for( var i = 0;i < 4;i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            var grid = $("#grid-cell-" + i + '-' + j);
            var pos = getPosition(i, j);
            //board[i][j] = Math.pow(2,i*2+j+1);
            board[i][j] = 0;
            //alert(pos.top);
            grid.css('top', pos.top);
            grid.css('left', pos.left);
        }
    }
    updateBoardView();


}
//
// //
// function updateBoardView(){
//     //$('.grid-cell').remove();
//    // var container = $('#grid-container');
//     for( var i = 0;i < 4;i++) {
//         for (var j = 0; j < 4; j++) {
//             //先填充好number cell
//            // container.append('<div class="grid-cell" id="gird-cell-'+ i + '-' + j + '"></div>');
//             var grid = $('#grid-cell-'+i+'-'+j);
//             var pos = getPosition(i, j);
//             //移动到特定的位置
//             grid.css('top', pos.top);
//             grid.css('left', pos.left);
//             //根据不同的值，给不同的cell不同颜色
//             setCellStyle(board[i][j],i,j);
//
//         }
//     }
// }

// function setCellStyle(num,i,j)
// {
//     var grid = $('#grid-cell-'+i+'-'+j);
//     if(num != 0)
//     {
//         grid.css('backgroundColor',colorsheet[board[i][j]]).css('color','#434546');
//         grid.text(board[i][j]);
//         if(board[i][j] >= 128)
//         {
//             var strNum = board[i][j]+'';
//             //根据数字的长度更改数字的大小
//             grid.css('color','white').css('font-size',60 - strNum.length*7 + 9);
//
//         }
//     }
//     else{
//         grid.css('backgroundColor','#ccc0b3').css('color','#434546');
//         grid.text("");
//     }
// }

function randomNumber(){
    if(emptyCells.curNum < 0)
        return -1;

    var rand = parseInt(Math.random()*emptyCells.curNum);
    //根据rand值，在empty数组中找到对应的格子index
    var i = parseInt(emptyCells.data[rand]/4);
    var j = emptyCells.data[rand]%4;
    //然后把这个空闲格子从数组中删除，方法是把最后一个格子index放到当前位置，然后curNum-1
    //alert('rand:' +rand + 'e '+emptyCells.data[rand] + 'i ' + i +' j'+j);
    emptyCells.curNum--;
    emptyCells.data[rand] = emptyCells.data[emptyCells.curNum];


    board[i][j] = Math.random()<0.9?2:4;

    updateBoardView();

}

function getPosition(i,j) {
    var pos = {
        top:20+120*i,
        left:20+120*j
    };

    return pos;
}
