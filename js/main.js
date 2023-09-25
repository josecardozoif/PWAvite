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