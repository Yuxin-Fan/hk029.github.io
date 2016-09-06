/**
 * Created by cnnic on 2016/8/31.
 */

documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18 * documentWidth;
cellspace = 0.04 * documentWidth;
fontsize = 0.5*cellSideLength;
var colorsheet = {
    2: '#FFF4E9',
    4:  '#FFE9D2',
    8:  '#FFD3A6',
    16: '#FFD166',
    32: '#FFB052',
    64: '#FFE500',
    128: '#FFA061',
    256: '#FF8330',
    512: '#FF6600',
    1024: '#FF4400',
    2048: '#FF0000'
};


function updateBoardView(){
    $('.number-cell').remove();
    var container = $('#grid-container');
    for( var i = 0;i < 4;i++) {
        for (var j = 0; j < 4; j++) {
            //先填充好number cell
            container.append('<div class="number-cell" id="number-cell-'+ i + '-' + j + '"></div>');
            var grid = $('#number-cell-'+i+'-'+j);
            var pos = getPosition(i, j);
            //移动到特定的位置
            grid.css('top', pos.top);
            grid.css('left', pos.left);
            //根据不同的值，给不同的cell不同颜色
            setCellStyle(board[i][j],i,j);

        }
    }
    $('#score').text(score);
}


function setCellStyle(num,i,j)
{
    var grid = $('#number-cell-'+i+'-'+j);
    //这个时候才有了number cell的属性，才能修改
        grid.css('font-size',fontsize)
            .css('width',cellSideLength)
            .css('height',cellSideLength)
            .css('border-radius',0.05*cellSideLength)
            .css('line-height',cellSideLength+'px')   //这里要加px
            .css('color','#434546');
    if(num != 0)
    {
            grid.css('backgroundColor',colorsheet[num])
            .css('z-index',num);

        grid.text(num);

        if(num >= 128)
        {
            var strNum = num+'';
            //根据数字的长度更改数字的大小
            grid.css('color','white')
                .css('font-size',fontsize - strNum.length*7 + 9);

        }
    }
    else{
        grid.css('backgroundColor','#ccc0b3')
            .css('z-index',1);
        grid.text("");
    }
}


function getPosition(i,j) {
    var pos = {
        // top:20+120*i,
        // left:20+120*j
        top:cellspace+(cellspace+cellSideLength)*i,
        left:cellspace+(cellspace+cellSideLength)*j
    };

    return pos;
}



function moveLeft(board) {
    var flag = false;
    for(var i = 0;i < 4;i++) {
        for(var cur = 1,move = 0;cur < 4;){
            //move代表当前可能可以移动到的最边上元素
            //cur是当前元素
            //如果cur 移动到了move，说明从cur到move路径上全为0
            //接下来cur+1，看看新的cur的元素能不能移动到move的位置
            //如果不能移动到move位置，那一定能移动到move+1的位置
            //此时move+1
            if(move >= cur||board[i][cur] === 0 )
                cur++;
            else if(Merge(i,move,i,cur)) {
                cur++;
                //如果merge成功了，那么可以看看还能不能往之前合并,move前移
                // while (move > 0 && Merge(i, move - 1, i, move))
                //     move--;
                flag = true;
            }
            else
                move++;

        }
    }
    return flag;
}

function moveUp(board) {
    var flag = false;
    for(var j = 0;j < 4;j++) {
        for(var cur = 1,move = 0;cur < 4;){
            if(move >= cur ||board[cur][j] === 0)
                cur++;
            else if(Merge(move,j,cur,j)) {
                cur++;
                //如果merge成功了，那么可以看看还能不能往之前合并,move前移
                // while (move > 0 && Merge(move - 1,j ,move,j))
                //     move--;
                flag = true;
            }
            else
                move++;

        }
    }
    return flag;
}

function moveRight(board) {
    var flag = false;
    for(var i = 0;i < 4;i++) {
        for(var cur = 2,move = 3;cur > -1;){
            if(move <= cur ||board[i][cur] === 0)
                cur--;
            else if(Merge(i,move,i,cur)) {
                cur--;
                //如果merge成功了，那么可以看看还能不能往之前合并,move前移
                // while (move < 3 && Merge(i, move + 1, i, move))
                //     move++;
                flag = true;
            }
            else
                move--;

        }
    }
    return flag;
}

function moveDown(board) {
    var flag = false;
    for(var j = 0;j < 4;j++) {
        for(var cur = 2,move = 3;cur > -1;){
            if(move <= cur||board[cur][j] === 0 )
                cur--;
            else if(Merge(move,j,cur,j)) {
                cur--;
                //如果merge成功了，那么可以看看还能不能往之前合并,move前移
                // while (move < 3 && Merge(move + 1, j, move,j))
                //     move++;
                flag = true;
            }
            else
                move--;
        }
    }
    return flag;
}
