import '../css/style.css'

if ('serviceWorker' in navigator) {//faz o cache da aplicação
    window.addEventListener('load', async () => {
      try {
        let reg;
        reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
  
        console.log('Service worker registrada!', reg);
      } catch (err) {
        console.log('Service worker registro falhou:', err);
      }
    })
  }

function calcular(){
    let formulario = document.getElementById('formulario');

    let peso = +formulario.peso.value;
    let metros = +formulario.metros.value;
    let centimetros = +formulario.centimetros.value;

    let altura = (metros * 100 + centimetros) / 100;
    let imc = peso / (altura * altura)
    formulario.imc.value = imc.toFixed(2);

    if( imc < 20 ){
        respostaFinal = "Abaixo do Peso";
    }else if( imc > 20 && imc <= 25 ){
        respostaFinal = "Peso Ideal";
    }else if( imc > 25 && imc <= 30 ){
        respostaFinal = "Sobrepeso";
    }else if( imc > 30 && imc <= 35 ){
        respostaFinal = "Obesidade I";
    }else if( imc > 35 && imc <= 40 ){
        respostaFinal = "Obesidade II";
    }else if( imc > 40 && imc <= 50 ){
        respostaFinal = "Obesidade III";
    }else{
        respostaFinal = "Obesidade IV";
    }
    document.getElementById("resposta").innerHTML = respostaFinal;
}