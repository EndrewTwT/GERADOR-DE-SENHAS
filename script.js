const senhaInput = document.getElementById("senha");
const gerarBtn = document.getElementById("gerar");
const copiarBtn = document.getElementById("copiar");
const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");
const tipo = document.getElementById("tipo");
const ambigua = document.getElementById("ambigua");

valorTamanho.textContent = tamanho.value;

tamanho.addEventListener("input", () => {
    valorTamanho.textContent = tamanho.value;
});

function randomIndex(max){
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function gerarSenha(){

    const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%&*()_+-=[]{}?";

    let caracteres = "";

    switch(tipo.value){

        case "letras":
            caracteres = maiusculas + minusculas;
            break;

        case "numeros":
            caracteres = numeros;
            break;

        case "alfa":
            caracteres =
            maiusculas +
            minusculas +
            numeros;
            break;

        case "semletras":
            caracteres =
            numeros +
            simbolos;
            break;

        default:
            caracteres =
            maiusculas +
            minusculas +
            numeros +
            simbolos;
    }

    if(ambigua.checked){
        caracteres = caracteres
            .replace(/0/g,"")
            .replace(/O/g,"")
            .replace(/1/g,"")
            .replace(/l/g,"")
            .replace(/I/g,"");
    }

    let senha = "";

    for(let i=0;i<tamanho.value;i++){
        senha += caracteres[randomIndex(caracteres.length)];
    }

    senhaInput.value = senha;

    verificarForca(senha);

    salvarHistorico(senha);
}

function verificarForca(senha){

    let pontos = 0;

    if(senha.length >= 8) pontos += 20;
    if(senha.length >= 12) pontos += 20;
    if(/[A-Z]/.test(senha)) pontos += 20;
    if(/[a-z]/.test(senha)) pontos += 20;
    if(/[0-9]/.test(senha)) pontos += 10;
    if(/[^A-Za-z0-9]/.test(senha)) pontos += 10;

    const barra = document.getElementById("progresso");
    const nivel = document.getElementById("nivel");

    barra.style.width = pontos + "%";

    if(pontos <= 30){
        barra.style.background = "#ef4444";
        nivel.textContent = "🔴 Fraca";
    }
    else if(pontos <= 60){
        barra.style.background = "#f59e0b";
        nivel.textContent = "🟠 Média";
    }
    else if(pontos <= 80){
        barra.style.background = "#3b82f6";
        nivel.textContent = "🔵 Forte";
    }
    else{
        barra.style.background = "#22c55e";
        nivel.textContent = "🟢 Muito Forte";
    }
}

function salvarHistorico(senha){

    let historico =
        JSON.parse(localStorage.getItem("historico")) || [];

    historico.unshift(senha);

    historico = historico.slice(0,5);

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    carregarHistorico();
}

function carregarHistorico(){

    const lista =
        document.getElementById("listaHistorico");

    lista.innerHTML = "";

    const historico =
        JSON.parse(localStorage.getItem("historico")) || [];

    historico.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        lista.appendChild(li);
    });
}

copiarBtn.addEventListener("click", () => {

    if(!senhaInput.value) return;

    navigator.clipboard.writeText(
        senhaInput.value
    );

    copiarBtn.textContent = "Copiado!";

    setTimeout(() => {
        copiarBtn.textContent = "Copiar";
    }, 1500);
});

gerarBtn.addEventListener("click", gerarSenha);

carregarHistorico();
gerarSenha();