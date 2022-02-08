let seuVotoPara = document.querySelector('.tela-1-esq-seuVoto p');
let cargo = document.querySelector('.tela-1-esq-titulo p');
let descricao = document.querySelector('.tela-1-esq-desc');
let aviso = document.querySelector('.tela-2');
let lateral = document.querySelector('.tela-1-dir');
let numeros = document.querySelector('.tela-1-esq-num');
let tecladoInicial = document.getElementById("telaInicial");

document.getElementById("btn").style.display = 'none';


let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function telaInicial(){
    
    numeros.style.display = 'none';
    cargo.style.display = 'none';
    
}

function iniciarVotacao(){
    document.getElementById("telaInicial").style.display = 'none';
    document.getElementById("btn-telaInicial").style.display = 'none';
    numeros.style.display = 'block';
    cargo.style.display = 'block';
    
    
        comecarEtapa();
}

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero ='';
    votoBranco = false;

    for (let i=0;i<etapa.numeros;i++){
        if (i===0){
            numeroHTML += '<div class="numero pisca"></div>';
        } else{
            numeroHTML += '<div class="numero"></div>';
        }        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML= etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    
    });
    
    if (candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        if(etapaAtual === 1) {
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice: ${candidato.vice}`;
        } else {
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;    
        }

        let fotosHtml ='';
        for (let i in candidato.fotos){
            if (candidato.fotos[i].small){
            fotosHtml += `<div class="tela-1-dir-image small"><img src="img/${candidato.fotos[i].url}" alt="José Alemar">${candidato.fotos[i].legenda}</div>`;
            } else{
                fotosHtml += `<div class="tela-1-dir-image"><img src="img/${candidato.fotos[i].url}" alt="José Alemar">${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }

}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero!==null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
            
        }
    }
}

function branco(){
    if (numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
     /*   numeros.innerHTML = '';*/
        descricao.innerHTML = '<div class="aviso-grande-branco pisca">VOTO EM BRANCO</div>';
    } else{
        descricao.innerHTML = '<div class="aviso-grande-brancoERRO">Para votar em BRANCO,<br/> primeiro pressione CORRIGIR e depois pressione BRANCO.</div>';
        lateral.innerHTML = '';
        aviso.style.display = 'none';
    }
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true){
        votoConfirmado = true;
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true;
    } else {
        descricao.innerHTML = '<div class="aviso-grande-brancoERRO">Digitação incorreta.<br/>Continue digitando o número ou <br/>Aperte <strong>CORRIGE</strong> para corrigir. </div>';
        lateral.innerHTML = '';
        aviso.style.display = 'none';
    }

    if (votoConfirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            const music = new Audio('prilili.mp3');
            music.play();
            document.getElementById("btn").style.display = 'inline';

            
        }
    }
}


telaInicial();
comecarEtapa();