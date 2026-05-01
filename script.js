document.getElementById('btnVerificar').addEventListener('click', async() => {


    let urlDigitada = document.getElementById('inputUrl').value.trim();
    const resultado = document.getElementById('resultado');


    if (!urlDigitada) {
        resultado.textContent = '⚠️ Digite uma URL primeiro!';
        resultado.style.color = 'orange';
        return;
    }


    if (!urlDigitada.startsWith('http')) {
        urlDigitada = 'https://' + urlDigitada;
    }

    try {

        const dominioDigitado = new URL(urlDigitada).hostname;


        const res = await fetch('http://localhost:3000/sites');
        const sites = await res.json();


        const encontrado = sites.find(site => site.dominio_oficial === dominioDigitado);


        if (encontrado) {
            resultado.textContent = '✅ Site legítimo: ' + encontrado.nome;
            resultado.style.color = 'green';
        } else {
            resultado.textContent = '🚨 Site suspeito ou não cadastrado!';
            resultado.style.color = 'red';
        }

    } catch (erro) {
        resultado.textContent = '❌ URL inválida! Ex: https://google.com';
        resultado.style.color = 'orange';
    }
});