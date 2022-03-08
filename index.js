const { Observable, fromEvent, map } = rxjs;

const textBox = document.getElementById("textBox");
const textMirror = document.getElementsByTagName("span")[0];
const tiempo = document.getElementById("tiempo");

const textObservable = fromEvent(textBox, "keyup");

const textoInvertido = textObservable.pipe(
  map((event) => {
    if (event.target.value === "error") {
      textMirror.innerHTML = `ingresó la palabra ${event.target.value}`;
      observer.error("Se desuscribió al observer por escribir 'error'");
    }
    if (event.target.value === "completed") {
      textMirror.innerHTML = `ingresó la palabra ${event.target.value}`;
      observer.complete();
    }
    let mirror = event.target.value.split("").reverse().join("");
    return mirror;
  })
);

const disableMirror = () => {
  textBox.value = "";
  textBox.setAttribute("disabled", true);
  observer.unsubscribe();
  suscribed = false;
};

let observer = textoInvertido.subscribe({
  next: (valor) => {
    textMirror.innerHTML = valor;
  },
  error: (error) => {
    disableMirror();
    console.error(error);
  },
  complete: () => {
    disableMirror();
    console.info("La operación se completó y se desuscrubió al observer.");
  },
});

//TIMER
function contarMultiple(tiempo) {
  let timer;
  let contador = 1;
  return new Observable((cronometro) => {
    cronometro.next(contador++);
    timer = setInterval(() => {
      cronometro.next(contador);
      if (contador === 30) {
        cronometro.error("Llegamos a 30 segundos");
      }
      contador++;
    }, tiempo);
  });
}

let cronometro = contarMultiple(1000).subscribe({
  next: (valor) => {
    tiempo.innerHTML = `${valor}`;
  },
  error: (error) => {
    disableMirror();
    tiempo.innerHTML = `Tiempo cumplido`;
    console.log(error);
  },
  completed: () => console.log("Finish"),
});
