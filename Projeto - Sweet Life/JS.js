class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }

    // inicia a validação de todos os campos
    validate(form) {

        // limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        // pegar todos inputs
        let inputs = form.getElementsByTagName('input');
        // transformar HTMLCollection em arr
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante aos atributos encontrados
        inputsArray.forEach(function (input, obj) {

            // fazer validação de acordo com o atributo do input
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    // limpa string para saber o método
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // valor do input
                    let value = input.getAttribute(this.validations[i])

                    // invoca o método
                    this[method](input, value);

                }
            }

        }, this);

    }

    // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    // método para validar se passou do máximo de caracteres
    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }

    }

    // método para validar strings que só contem letras
    onlyletters(input) {

        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }

    }

    // método para validar e-mail
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail válido`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    // verificar se um campo está igual o outro
    equal(input, inputNome) {

        let inputToCompare = document.getElementsByName(inputNome)[0];

        let errorMessage = `Este campo precisa estar igual ao ${inputNome}`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    // método para exibir inputs que são necessários
    required(input) {

        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }

    }

    // validando o campo de senha
    passwordvalidate(input) {

        // explodir string em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }

    }

    // método para imprimir mensagens de erro
    printMessage(input, msg) {

        // checa os erros presentes no input
        let errorsQty = input.parentNode.querySelector('.error-validation');

        // imprimir erro só se não tiver erros
        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }

    }

    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

/* Validando Telefone celular*/

function ajustaCelular(v) {
    // Remove caracteres não numéricos
    v.value = v.value.replace(/\D/g, "");

    // Adiciona o prefixo "+55" se o número começar com "55"
    if (v.value.startsWith("55")) {
        v.value = "+55" + v.value.slice(2);
    }

    // Adiciona o DDD após o prefixo "+55" se o número tiver o prefixo correto
    if (v.value.startsWith("+55")) {
        if (v.value.length >= 4) {
            v.value = v.value.replace(/^(\+\d{2})(\d{2})/, "$1 ($2)");
        }
    }

    // Formatação do número de celular
    v.value = v.value.replace(/(\d{2})(\d{5})(\d{4})/, "$1$2-$3");
}

/*Validando Telefone fixo*/

function ajustaNumeros(v) {
    v.value = v.value.raplace(/\D/g, "");

}

function ajustaTelefone(v) {
    v.value = v.value.replace(/\D/g, "");

    // Adiciona o prefixo "+55" se o número começar com "55"
    if (v.value.startsWith("55")) {
        v.value = "+55" + v.value.slice(2);
    }

    // Adiciona o DDD após o prefixo "+55" se o número tiver o prefixo correto
    if (v.value.startsWith("+55")) {
        if (v.value.length >= 4) {
            v.value = v.value.replace(/^(\+\d{2})(\d{2})/, "$1 ($2)");
        }
    }

    // Formatação do número de celular
    v.value = v.value.replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2-$3");
}

/*Validação de CPF*/
function formatarCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + '-' + value.substring(11);
    }
    input.value = value;
}

//validação CEP//
function preencherEndereco(v) {
    var cep = v.value;

    cep = cep.replace(/\D/g, '');

    if (cep.length === 8) {
        var url = 'https://viacep.com.br/ws/' + cep + '/json/';

        fetch(url)
            .then(function (response) {
                return response.json();

            })
            .then(function (data) {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('uf').value = data.localidade + '-' + data.uf



                }
            })
            .catch(function (error) {
                console.log('Ocorreu um erro:', error);
            });

    }
}
let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function (e) {
    e.preventDefault();

    validator.validate(form);

});


