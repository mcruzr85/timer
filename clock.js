let isOn = false;
let disable = true;
let timerUpdate;
let minInitialValue = '05';
let secInitialValue = '00';

const $btnStart = document.getElementById("btnStart");
const $btnSet = document.getElementById("btnSet");
const $minutes = document.getElementById("min");
const $seconds = document.getElementById("seg");
const $ring = document.getElementById("ring");

$btnStart.addEventListener("click", handleTimer);
$btnSet.addEventListener("click", handleDisability);

(function initializeClock() {    //Para inicializar el timer con estos valores
 $minutes.value = minInitialValue;
 $seconds.value= secInitialValue;  
})();

function reset(){  //para que el timer vuelva a sus parámetros iniciales
  $ring.classList.remove('ending'); 
  isOn = false;
  $minutes.value = minInitialValue;
  $seconds.value= secInitialValue;
  $btnStart.innerHTML = 'START';
}

function findData() {
  let minutes = Number($minutes.value);
  let seconds = Number($seconds.value);
  let array = [];
  array.push(minutes);
  array.push(seconds);
  return array;
}

function handleTimer() {  //isOn = isOn ? false : true;
  isOn
    ? (//si isOn es true esta andando el reloj--> click y se detiene
      console.log(`inicio : valor de isOn antes de dar click: ${isOn}**`),
      (isOn = false),
      clearInterval(timerUpdate), //aqui paro el setInterval que esta guardado en timerUpdate
      $btnStart.innerHTML = "START",
      console.log(`fin: valor de isOn despues del click: ${isOn}-------------`))
    :
     (//si isOn es false esta parado el reloj--> click y se pone a andar
      console.log(`ini: valor de isOn antes de dar click: ${isOn}**`),
      (isOn = true),
      $minutes.disabled = true,
      $seconds.disabled = true,
      disable = true,
      timerUpdate = setInterval(() => {

        let[minutes , seconds] = findData();
      
        if (seconds === 0 && minutes === 0) { 
          $ring.classList.add('ending');     
          clearInterval(timerUpdate); ///paro el SetInterval cdo el tiempo llegue a 00:00                
          alert("Time is over");
          setTimeout(reset, 3000);         
      
        } else if (seconds === 0) { //si tengo 00  en los segundos los reinicio a 59 y resto 1 minuto
          minutes--;
          seconds = 59;
          (minutes<10) && (minutes = '0'+ minutes.toString());      
          $minutes.value = minutes;
          $seconds.value = seconds.toString();      
        } else {//solo disminuyo los segundos
          seconds--;
          (seconds < 10) && (seconds = "0" + seconds.toString());     
          $seconds.value = seconds;     
        }
      }, 1000), //se ejecuta cada 1 segundo
      $btnStart.innerHTML = "STOP",
      console.log(`fin: valor de isOn despues del click: ${isOn}------------`));
}

function handleDisability() {
  if (!isOn && disable) {
    $minutes.disabled = false;
    $seconds.disabled = false;
    disable = false;
    console.log(`disable esta ${disable}`);
  } else if (!isOn && !disable){
    $minutes.disabled = true;
    $seconds.disabled = true;
    disable = true;
    console.log(`disable esta ${disable}`);
  }
}
