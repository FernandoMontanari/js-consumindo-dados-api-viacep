async function buscaEndereco(cep) {
    let msgErro = document.getElementById('erro');
    msgErro.innerHTML = "";
    try {
        let consultaCEP = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();

        if(consultaCEPConvertida.erro) {
            throw Error('CEP não existente! Digite um CEP válido.')
        }

        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro
        
        return consultaCEPConvertida;
    } catch (erro) {
        msgErro.innerHTML = '<p>CEP inválido. Tente novamente!</p>'
    }
}

let cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))