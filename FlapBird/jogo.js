const sprites = new Image();
sprites.src = './sprites.png';

const som_Hit = new Audio();
som_Hit.src = './efeitos/hit.wav';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.h;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    } else {
        return false;
    }
}

function criaFlappyBird(){
    const flappyBird = {
        sX: 0,
        sY: 0,
        w: 33,
        h: 24,
        x:10,
        y:50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        pula() {
            
            flappyBird.velocidade = - flappyBird.pulo;
            
        },
    
        atualiza() {
        if(fazColisao(flappyBird, chao)) {
            som_Hit.play();
            mudaParaTela(telas.INICIO);
            
            return;
        
        }
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    
        },
    
        desenha() {
            contexto.drawImage(
                sprites, 
                flappyBird.sX, flappyBird.sY, 
                flappyBird.w, flappyBird.h, 
                flappyBird.x, flappyBird.y, 
                flappyBird.w, flappyBird.h,
                );  
        }
    }
    return flappyBird;
}


const fundo = {
    sX: 390,
    sY: 0,
    w: 275,
    h: 204,
    x:0,
    y: canvas.height - 204,

    desenha() {

        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites, 
            fundo.sX, fundo.sY, 
            fundo.w, fundo.h, 
            fundo.x, fundo.y, 
            fundo.w, fundo.h,
            );  
        
            contexto.drawImage(
                sprites, 
                fundo.sX, fundo.sY, 
                fundo.w, fundo.h, 
                (fundo.x + fundo.w), fundo.y, 
                fundo.w, fundo.h,
                );  
    }
}

const chao = {
    sX: 0,
    sY: 610,
    w: 224,
    h: 112,
    x:0,
    y: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites, 
            chao.sX, chao.sY, 
            chao.w, chao.h, 
            chao.x, chao.y, 
            chao.w, chao.h,
            ); 

        contexto.drawImage(
            sprites, 
            chao.sX, chao.sY, 
            chao.w, chao.h, 
            (chao.x + chao.w), chao.y, 
            chao.w, chao.h,
            ); 
}

}

    const mensagemGetReady = {
        sX: 134,
        sY: 0,
        w: 174,
        h: 152,
        x: (canvas.width / 2)- 174 / 2,
        y: 50,

        desenha() {
            contexto.drawImage(
                sprites, 
                mensagemGetReady.sX, mensagemGetReady.sY, 
                mensagemGetReady.w, mensagemGetReady.h, 
                mensagemGetReady.x, mensagemGetReady.y, 
                mensagemGetReady.w, mensagemGetReady.h,
                ); 


    }


};
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
    if (telaAtiva.inicializa()){
        inicializa();
    }
}

const telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
        },
        desenha() {
            fundo.desenha();    
            chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },

        click(){
            mudaParaTela(telas.JOGO); 
        },

        atualiza() {

        },
    },
    JOGO: {
        desenha() {
            fundo.desenha();    
            chao.desenha();
            globais.flappyBird.desenha(); 
        },

        click() {
            globais.flappyBird.pula();
        },

        atualiza() {
            globais.flappyBird.atualiza();
        },
    },
}



function loop(){

    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(telas.INICIO);
loop();