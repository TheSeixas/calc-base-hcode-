class ControllerCalc{
    constructor(){
        this._display = document.querySelector('#display');
        this._operation = [0];
        this._lastResult;
        this._lastOperator;
        this._lastOpAdd;
        this.initialize();
    };
    initialize(){
        console.log(display)
        this.initButtons();
    };
    //adiciona eventos e regras aos botões
    getLastOperation(){
        return this.operation[this.operation.length-1]
    }
    initButtons(){
        let buttons = document.querySelectorAll('.row button');
        buttons.forEach(btn=>{
            btn.addEventListener('click', ()=>{
                switch(btn.innerText){
                    case 'CE':
                        this.clear('all');
                            this.showOrHiddenMemorys('hiddeAll')
                        break;
                    case 'C':
                            this.clear('index');
                        break;
                    case '←':
                        //se a operação tiver mais de um índice
                        if(this.operation.length > 2){
                            this.clear('entry');
                            this.setMemoryOfOperation();
                        }else  if(this.operation.length == 2){
                            this.operation.pop();
                            this.showOrHiddenMemorys('hiddeAll');
                        }else{
                            this.clear('entry');
                            if(this.lastResult){
                                this.showOrHiddenMemorys('hiddeAll');
                            }
                        }
                        this.refreshDisplay();
                        break;
                    case '%':
    
                        break;
                    case '√':
    
                        break;
                    case 'x²':
    
                        break;
                    case '¹/x':

                        break;
                    case '±':
                        
                        break;
                    case '=':                        
                        switch(this.operation.length.toString()){
                            case '1':
                                if(this.operation[0] == 0){
                                    this.showOrHiddenMemorys('hiddeAll');
                                }else{
                                    this.evalWith1Or2Values('1');
                                }
                                break;
                            case '2':
                                this.evalWith1Or2Values('2');
                                break;
                            case '3':
                                this.makeEval();
                                this.showOrHiddenMemorys('showResult');
                                this.setMemoryOfOperation();
                                break;
                        }
                        this.refreshDisplay();
                        console.log(this.operation)
                        break;
                    case ',':
                        
                        break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.addOperation(btn.innerText);
                        
                        break;
                    case '÷':
                    case '-':
                    case '*':
                    case '+':
                    this.addOperation(btn.innerText);
                        break;
                };
            });
        });
    };
    //método limpa a calculadora de acordo com o q receber por parametro
    clear(option){
        switch(option){
            case 'entry':
                let last = this.getLastOperation().toString();
                //se a operação tiver mais de 1 índice
                if(this.operation.length > 1){
                    //se o ultima índice do array tem mais de um caracter
                    if(last.length > 1){
                        let arrayLast = last.slice(0, last.length-1);
                        this.setLastOperation(arrayLast);
                    }else{
                        this.operation.pop();
                    }
                //se a operação não tiver mais de 1 índice
                }else{
                    let index = this.operation[0].toString();
                    //se o primeiro e unico indice da operação tem mais de um caracter
                    if(index.length > 1){
                        index = index.slice(0,index.length-1);
                        this.setLastOperation(index);
                    }else{
                        this.setLastOperation(0);
                    }
                }
                break;
            case 'all':
                this.operation = [0];
                this.lastResult = 0;
                break;
            case 'index':
                if(this.operation.length > 2){

                    this.operation.pop();
                    this.setMemoryOfOperation();

                }else if(this.operation.length == 2){

                    this.operation.pop();
                    this.showOrHiddenMemorys('hiddeAll');

                }else{      
                    console.log('huas')              
                    this.operation = [0];
                    this.lastResult = 0;
                    if(!this.lastResult){
                        this.showOrHiddenMemorys('hiddeAll');
                    }
                }
                break;
        }
        this.refreshDisplay();
    }
    setLastOperation(value){
        this.operation[this.operation.length-1] = parseInt(value);
    }
    //adiciona o valor da tecla clickada à operação
    addOperation(op){
        let allOperators = ['%','÷','-','+','±','=','¹/x','x²','√','*'];
        let operatorsInitials = ['-','+'];
        //se a operação que vem no parâmetro 'op' é um operador
        if(allOperators.indexOf(op) >= 0){
            //se no array operation só tem 1 posição
            if(this.operation.length == 1){
                //se a primeira e única posição é zero.
                if(this.operation[0] == 0){
                    //se o operador é o sinal de menos ou mais
                    if(operatorsInitials.indexOf(op) >= 0){
                        this.operation[0] = op;
                    }else{
                        return false;
                    }
                //senão se a primeira e única posição é o sinal de menos ou mais
                }else if(operatorsInitials.indexOf(this.operation[0]) >= 0){
                    this.operation[0] = op;
                }else{
                    this.setMemoryOfOperation();
                    this.metodPush(op);
                    this.showOrHiddenMemorys('showOne');
                }
            //senão(tiver só 1 posição) se no array operation tem duas posições
            }else if(this.operation.length < 3){
                let last = this.getLastOperation();
                //se o último index do array for um operador
                if(allOperators.indexOf(last) >= 0 ){
                    this.operation[this.operation.length-1] = op;
                    this.setMemoryOfOperation();
                }else{
                    this.calcOperation();
                    this.metodPush(op)
                    this.showOrHiddenMemorys('showAll');
                }
            }else{
                this.makeEval();
                this.setMemoryOfOperation();
                this.metodPush(op);
                this.showOrHiddenMemorys('showAll');    
            }
         //senão for um operador que estiver vindo atraves do parâmetro   
        }else{
            let parseIntOfOp = parseInt(op);
            if(this.operation.length == 1){
                if(this.operation[0] == '0'){
                    this.operation[0] = parseIntOfOp;
                }else{
                    let last = this.getLastOperation().toString();
                    if(last.length <= 11){
                        let result = this.operation[0].toString() + op.toString();
                        this.operation[0] = parseInt(result);
                    }else{
                        this.showError();
                        return false;
                    }
                    
                }
            }else{
                if(allOperators.includes(this.getLastOperation())){
                    this.setMemoryOfOperation();
                    this.metodPush(parseIntOfOp);
                }else{
                    let last = this.getLastOperation().toString() + op.toString();
                    this.operation[this.operation.length-1] = last;
                }
            }
        }
        this.refreshDisplay();
    };
    metodPush(value){
        this.operation.push(value);
    }
    setMemoryResult(){
        let memory = document.querySelector('.memory-result p');
        memory.innerText = this.lastResult.toString();
    }
    setMemoryOfOperation(){
        let memory = document.querySelector('.memory-operation p');
        let op = this.operation.join('');
        memory.innerText = op;
    }
    refreshDisplay(){
        console.log(this.operation)
        console.log(this.getLastOperation())
        this.display.innerText = this.getLastOperation().toString();
    }
    showError(){
        console.log('aqui')
        this.display.innerText = 'Error';
    }
    showOrHiddenMemorys(option){
        let spanOperation = document.querySelector('.memory-operation');
        let spanResult = document.querySelector('.memory-result');
        switch(option){
            case 'showOne':
                spanOperation.style.display = 'flex';
                break;
            case 'showAll':
                spanOperation.style.display = 'flex';
                spanResult.style.display = 'flex';
                break;
            case 'hiddeOne':
                spanOperation.style.display = 'none';
                break;
            case 'hiddeAll':
                spanOperation.style.display = 'none';
                spanResult.style.display = 'none';
                break;
            case 'showResult':
                spanResult.style.display = 'flex';
                break;
            default:
                break;
        };
    };
    makeEval(option){
        this.lastOperator = this.operation[1];
        let valueToCalc = this.operation.join('');
        let result = eval(valueToCalc);
        this.operation = [result];
        this.lastResult = result;
        this.setMemoryResult();
    }
    evalWith1Or2Values(option){
        switch(option){
            case '1':
                if(this.lastResult){
                    this.operation.push(this.lastOperator, this.lastResult);
                    this.makeEval();
                    this.showOrHiddenMemorys('showResult');
                }else{
                    this.operation.push('+',this.operation[0]);
                    this.makeEval();
                    this.showOrHiddenMemorys('showResult');
                }
                break;
            case '2':
                if(this.lastResult){
                    this.operation.push(this.lastResult);
                    this.makeEval();
                    this.showOrHiddenMemorys('showResult');
                }else{
                    this.operation.push(this.operation[0]);
                    this.makeEval();
                    this.showOrHiddenMemorys('showAll');
                }
                break;
        }
        this.setMemoryOfOperation();
    }
    haveDotOrOperator(operation){
        
    }
    //getters and setters

    get display(){
        return this._display;
    }
    set display(value){
        this._display = value;
    }
    get operation(){
        return this._operation;
    }
    set operation(value){
        this._operation = value;
    }
    get lastOperator(){
        return this._lastOperator;
    }
    set lastOperator(value){
        this._lastOperator = value;
    }
    get lastOpAdd(){
        return this._lastOpAdd;
    }
    set lastOpAdd(value){
        this._lastOpAdd = value;
    }
    get lastResult(){
        return this._lastResult;
    }
    set lastResult(value){
        this._lastResult = value;
    }
    get showMemoryOperation(){
        return this.showMemoryOperation;
    }
    set showMemoryOperation(value){
        this._showMemoryOperation = value;
    }
    get showMemoryResult(){
        return this._showMemoryResult;
    }
    set showMemoryResult(value){
        this.showMemoryResult = value;
    }
};