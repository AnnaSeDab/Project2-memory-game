/*disable printscreen posibility*/

/* set variables for:
grid size
number of squares to light up
score
lives 
tiles clicked var
name*/


/*listener on loading the page
set score
update lives
generate grid from variables
populate grid with squares
set how many squares to light up
pick tiles to light up */

/*listener press play
activate play function
    hide the play button
    show timer
    light up squares
    count to 3 
    hide squares*/

/*listener click on tile
check if tile clicked is right
if yes
    add 1 to tiles clicked
    disable clicking on that tile 
    check if tiles clicked equals tiles 
        if yes activate levelcomplete function
else activate fail function
    check lives variable 
        if more than 1
            take away life star which one depend on variable
            pop up failure alert
            activate play function
        else game over  
            pop up game over alert  
    */

/*level complete function
    add score
    add level
    add to grid if level % 3
    add square
    activate play function
    */

