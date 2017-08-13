function printCrossword(board)
{
    var pl = "";

    for(var i=0; i < board.length; i++){
        for(var j=0; j < board[i].length; j++){
            if(board[i][j] === ''){
                pl = pl + '-' + ' ';
            }else{
                pl = pl + board[i][j] + ' ';
            }
        }

        console.log(pl);
        pl = "";
    }
}

/**
 * Gera um caça-palavras.
 * @param size Tamanho do caça-palavras (sizexsize)
 * @param words Um array com palavras 
 */
function generateCrossword(size, words){

    // Limites horizontais e verticais
    var xlim = size;
    var ylim = size;

    // Armazena posições já utilizadas
    var usedPositions = [];

    // Gera o board
    var board = new Array(xlim);
    for(i=0; i < board.length; i++){
        board[i] = new Array(ylim).join("-").split("-");
    }

    /**
     * Gera uma posição X aleatória
     */
    function generateXPos(){
        return Math.floor(Math.random() * 100) % xlim;
    }

    /**
     * Gera uma posição y aleatória
     */
    function generateYPos(){
        return Math.floor(Math.random() * 100) % ylim;
    }

    /**
     * Gera uma orientação aleatória
     * h para horizontal, v para vertical
     */
    function getOr(){
        r =Math.ceil(Math.random() * 100);
        if(r % 2){
            return 'h';
        } else {
            return 'v';
        }
    }


    /**
     * Verifica se a palavra pode ser colocada no board nas coordenadas (x,y)
     * @param x coordenada X
     * @param y coordenada Y
     * @param or orientação (horizontal ou vertical)
     * @param word
     * @return bool
     */
    function isValidPosition(x, y, or, word){
        if(or == 'h')
            return isValidH(x,y,word);
        else
            return isValidV(x,y,word);
    }

    /**
     * Atualiza a variável board com a palavra posicionada conforme as coordenadas e orientação
     * @param x coordenada X
     * @param y coordenada Y
     * @param or orientação (horizontal ou vertical)
     * @param word
     */
    function position(x,y,or,word){
        if(or == 'h')
            return positionH(x,y,word);
        else
            return positionV(x,y,word);
    }

    /**
     * Verifica se a palavra pode ser colocada horizontalmente no board a partir das coordenadas (x,y)
     * @param x coordenada X
     * @param y coordenada Y
     * @param word
     * @return bool
     */
    function isValidH(x,y,word){

        var isValid = true;

        if(word){
            if(word.length <= xlim - y){
                for (var i = 0; i < word.length; i++){
                    if(!isEmpty(board[x][i+y])){
                        isValid = false;
                        break;
                    }
                }
            }else {
                return false;
            }
        }

        return isValid;
    }

    /**
     * Verifica se a palavra pode ser colocada verticalmente no board a partir das coordenadas (x,y)
     * @param x coordenada X
     * @param y coordenada Y
     * @param word
     * @return bool
     */
    function isValidV(x,y,word){

        var isValid = true;

        if(word){
            if(word.length <= ylim - x){
                for (var i = 0; i < word.length; i++){
                    if(!isEmpty(board[x+i][y])){
                        isValid = false;
                        break;
                    }
                }
            }else {
                return false;
            }
        }

        return isValid;

    }

    /**
     * Posiciona a palavra horizontalmente a partir das coordenadas (x,y)
     * @param x coordenada X
     * @param y coordenada Y
     * @param word
     */
    function positionH(x,y,word){

        if(word){
            for(var i = 0; i < word.length; i++){
                board[x][y+i] = word[i];
            }
        }


        return;
    }

    /**
     * Posiciona a palavra verticalmente a partir das coordenadas (x,y)
     * @param x coordenada X
     * @param y coordenada Y
     * @param word
     */
    function positionV(x,y,word){

        if(word){
            for(var i = 0; i < word.length; i++){
                board[x+i][y] = word[i];
            }
        }

        return;
    }

    /**
     * Enche o resto do array board com letras aleatórias.
     */
    function fillTheRest(){
        var gibberish = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(i=0; i < board.length; i++){
            for(j=0; j < board[i].length; j++){
                if(board[i][j] === ''){
                    randomPos = Math.floor(Math.random() * 1000) % gibberish.length;
                    board[i][j] = gibberish[randomPos];
                }
            }
        }
    }


    // Lógica que gera o quebra-cabeça
    for(var i = words.length-1; i >= 0; i--){
        currentWord = words.pop();
        orientation = getOr();

        xPos = generateXPos();
        yPos = generateYPos();

        while(!isValidPosition(xPos, yPos, orientation, currentWord)){
            xPos = generateXPos();
            yPos = generateYPos();
        }

        position(xPos, yPos, orientation, currentWord);
    }

    fillTheRest();

    return board;
}

// Verifica se um objeto é vazio
function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj > 0)           return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}