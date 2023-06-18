// Iniciando a aplicação no console
console.log('--------------------------------------');
console.log('**** Bem vindo(a) a BlueCorretora ****')
console.log('--------------------------------------');
console.log('Execute o seguinte comando para iniciar o menu:');
console.log('-------');
console.log('"iniciar_sistema()"'); // Função que será ativada pelo console para inicar o sistema

var contador; // Variável contador para ajudar nas verificações com WHILE
var usuarios_cadastrados = []; // Lista contendo JSONs/Informações do cadastro de usuários

function iniciar_sistema() {
    // Iniando o sistema da aplicação
    console.log('--------------------------------------');
    console.log('**** Menu BlueCorretora ****')
    console.log('--------------------------------------');
    console.log('Informe a opção no PROMPT!');
    console.log('-------');


    // Função definida para iniciar junto com o sistema
    function verMenu() {
        var primeira_resposta = prompt(`
        Informe a opção que deseja: \n
        -------------------------------------- \n
            1. Criar conta \n
            2. Realizar depósito \n
            3. Realizar saque \n
            4. Realizar transferência \n
            5. Listar contas \n
            6. Sair \n
            `); // Entrada de resposta do usuário

        // Dependendo da resposta do usuário, ele irá ativar uma dessas funções
        if (primeira_resposta == 1) {
            // Realizar a função:
            criar_conta();
        } else if (primeira_resposta == 5) {
            // Realizar a função:
            listar_contas();
        } else if (primeira_resposta == 6) {
            // Realizar a função:
            sair_agencia();
        } else if (primeira_resposta >= 2 && primeira_resposta <= 4) {
            /* Para definir em qual conta ele irá entrar (será passada como parâmentro,
            que irá buscar essa posição no vetor de usuários cadastrados) */
            var contaAtual;

            contador = 1; // Atualizando o valor do contador (gambiarra) para realizar a verificação
            while (contador >= 1) {
                contaAtual = prompt(`Informe o ID da sua conta:`);

                if (contaAtual == 0) {
                    verMenu();
                } else if (contaAtual - 1 < 0 || contaAtual - 1 > (usuarios_cadastrados.length - 1)) {
                    console.log(`Atenção! Essa conta não existe, tente novamente!`);
                    console.log('--------------------------------------');

                    /* A cada verificação, se estiver errado, ele somará +1 no contador
                    fazendo com que o prompt seja executado novamente, e enquanto ele não colocar
                    uma resposta correta, ele seguirá repetindo. */
                    contador++;
                } else {
                    console.log(`Bem vindo(a) de volta ${usuarios_cadastrados[contaAtual - 1].nome_completo}!`);
                    console.log('--------------------------------------');

                    /* Caso o usuário informe uma conta que exista e entre nela, o contador será
                    reatribuído a 0, fazendo assim com que ele não passe novamente pelo while */
                    contador -= contador;
                }
            }

            if (primeira_resposta == 2) {
                // Realizar a função:
                /* A conta atual sendo passada como parâmentro, já fazendo a subtração -1
                pois a posição no vetor começa no "0", e para o usuário a primeira opção
                sempre será o "1", sendo assim, fazendo a subtração para que encontre a
                conta correta */
                realizar_deposito(contaAtual - 1); // 
            } else if (primeira_resposta == 3) {
                realizar_saque(contaAtual - 1);
            } else if (primeira_resposta == 4) {
                realizar_transferencia(contaAtual - 1);
            };

        } else {
            console.log('ATENÇÃO! Informe uma opção válida!');
            console.log('--------------------------------------');
            setTimeout(() => {
                verMenu()
            }, 2000);
        }

    }

    verMenu(); // Função sempre será executada quando o sistema for iniciado

    // Função para criar conta:
    function criar_conta() {

        console.log(`**** Iniciando cadastro ****`);
        console.log('--------------------------------------');

        var nome = prompt(`
        Informe seu nome completo:\n
        `);

        console.log(`Nome cadastrado com sucesso: ${nome}`);
        console.log('--------------------------------------');


        contador = 1;
        while (contador >= 1) {
            var cpf = prompt("Informe seu CPF:");

            if (cpf.length == 11) {
                console.log(`CPF cadastrado com sucesso: ${cpf}`);
                console.log('--------------------------------------');

                contador -= contador;
            } else {
                console.log('Informe um CPF válido!');
                console.log('Recomeçando...');
                console.log('--------------------------------------');

                contador++
            }
        }

        contador = 1;
        while (contador >= 1) {
            var numAgencia = prompt("Informe o número da sua agência:");

            if (numAgencia.length < 3) {
                console.log('Informe um número de agência válido!');
                console.log('Recomeçando...');
                console.log('--------------------------------------');

                contador++
            } else if (numAgencia == usuarios_cadastrados.numAgencia) {
                console.log('Esse número de agência já existe!');
                console.log('Recomeçando...');
                console.log('--------------------------------------');

                contador++
            } else {
                console.log(`Número da agência cadastrado com sucesso: ${numAgencia}`);
                console.log('--------------------------------------');

                contador -= contador;
            }
        }

        // Enviando em forma de JSON as informações do usuário que serão cadastradas.
        usuarios_cadastrados.push({
            nome_completo: nome,
            cpf_cadastrado: cpf,
            numero_agencia: numAgencia,
            saldo_bancario: 0 // Sempre definindo o saldo bancário como 0 na criação da conta
        });

        console.log(`Cadastro realizado com sucesso, parabéns ${nome}!`);
        console.log(`Voltando para o menu principal...`);
        console.log('--------------------------------------');


        setTimeout(() => {
            verMenu()
        }, 2000);
    }

    // Função para realizar depósito (Pegando a conta atual como parâmentro)
    function realizar_deposito(contaAtual) {
        console.log(`**** Iniciando depósito bancário ****`);
        console.log('--------------------------------------');

        var deposito = prompt("Informe o valor que deseja depositar:");

        if (deposito < 0) {
            console.log(`Deposite um valor válido!`);
            console.log('--------------------------------------');
            setTimeout(() => {
                realizar_deposito(contaAtual);
            }, 2000);
        } else {

            var saldoAtual = usuarios_cadastrados[contaAtual].saldo_bancario + Number(deposito);

            // Atualizando o saldo bancário
            // usuarios_cadastrados[contaAtual].push({
            //     saldo_bancario: saldoAtual
            // });

            usuarios_cadastrados[contaAtual].saldo_bancario = saldoAtual;

            console.log(`Olá ${usuarios_cadastrados[contaAtual].nome_completo}!`);
            console.log(`QUANTIA DEPOSITADA: R$${Number(deposito).toFixed(2)}`);
            console.log('--------------------------------------');

            console.log(`Dinheiro depositado com sucesso!`);
            console.log(`Seu saldo agora é de: R$${saldoAtual.toFixed(2)}`);
            console.log('--------------------------------------');

            setTimeout(() => {
                console.log('Voltando para o menu em 5 segundos...');
                console.log('--------------------------------------');
            }, 2000);


            setTimeout(() => {
                verMenu()
            }, 7000);
        }
    }

    // Função de realizar saque
    function realizar_saque(contaAtual) {
        console.log(`**** Iniciando saque bancário ****`);
        console.log('--------------------------------------');

        var saldo = prompt("Informe o valor que deseja sacar:");

        if (usuarios_cadastrados[contaAtual].saldo_bancario == 0) {
            console.log('Saque indisponível no momento.');
            console.log('Finalizando a sessão...');
            console.log('--------------------------------------');

            setTimeout(() => {
                verMenu()
            }, 2000);
        } else if (usuarios_cadastrados[contaAtual].saldo_bancario < Number(saldo)) {
            console.log('Valor muito acima, tente novamente.');
            console.log('Finalizando a sessão...');
            console.log('--------------------------------------');

            setTimeout(() => {
                verMenu()
            }, 2000);
        } else {

            var saldoAtual = usuarios_cadastrados[contaAtual].saldo_bancario - Number(saldo);

            usuarios_cadastrados[contaAtual].saldo_bancario = saldoAtual;

            console.log(`Olá ${usuarios_cadastrados[contaAtual].nome_completo}!`);
            console.log(`QUANTIA SACADA: R$${Number(saldo).toFixed(2)}`);
            console.log('--------------------------------------');

            console.log(`Dinheiro sacado com sucesso!`);
            console.log(`Seu saldo agora é de: R$${saldoAtual.toFixed(2)}`);
            console.log('--------------------------------------');

            setTimeout(() => {
                console.log('Voltando para o menu em 5 segundos...');
                console.log('--------------------------------------');
            }, 2000);

            setTimeout(() => {
                verMenu()
            }, 7000);
        }
    }

    // Função para realizar transferência bancária
    function realizar_transferencia(contaAtual) {
        console.log(`**** Iniciando transferência bancária ****`);
        console.log('--------------------------------------');

        var destinatario = prompt("Informe o ID do destinatário:"); // Pedindo o ID de outra conta

        var valorTransferido = prompt("Informe o valor que deseja transferir:");

        if (contaAtual == destinatario - 1) {
            console.log(`Você não pode transferir o valor para si próprio!`);
            console.log('--------------------------------------');
            setTimeout(() => {
                realizar_transferencia(contaAtual);
            }, 2000);
        } else if (destinatario - 1 < 0 || destinatario - 1 > (usuarios_cadastrados.length - 1)) {
            console.log(`Essa conta não existe, envie para uma conta existente!`);
            console.log('--------------------------------------');
            setTimeout(() => {
                realizar_transferencia(contaAtual);
            }, 2000);
        } else if (Number(valorTransferido) < 0) {
            console.log(`Transfira um valor válido!`);
            console.log('--------------------------------------');
            setTimeout(() => {
                realizar_transferencia(contaAtual);
            }, 2000);
        } else if (Number(valorTransferido) > usuarios_cadastrados[contaAtual].saldo_bancario) {
            console.log(`Saldo insuficiente para realizar essa transação!`);
            console.log('--------------------------------------');
            setTimeout(() => {
                realizar_transferencia(contaAtual);
            }, 2000);
        } else {

            contador = 1;
            while (contador >= 1) {
                var resposta = prompt(`
                Deseja mesmo enviar R$${Number(valorTransferido).toFixed(2)} para: ${usuarios_cadastrados[destinatario - 1].nome_completo}?\n
                Digite "sim" ou "não"
            `);

                if (resposta.toLowerCase() == 'sim') {
                    var saldoAtual = usuarios_cadastrados[contaAtual].saldo_bancario - Number(valorTransferido);
                    usuarios_cadastrados[contaAtual].saldo_bancario = saldoAtual;

                    var saldoAtualDestinatario = usuarios_cadastrados[destinatario - 1].saldo_bancario + Number(valorTransferido);
                    usuarios_cadastrados[destinatario - 1].saldo_bancario = saldoAtualDestinatario;

                    console.log(`Olá ${usuarios_cadastrados[contaAtual].nome_completo}!`);
                    console.log(`
                Dinheiro transferido com sucesso!\n
                VALOR TRANSFERIDO: R$${Number(valorTransferido).toFixed(2)}\n
                DESTINATÁRIO: ${usuarios_cadastrados[destinatario - 1].nome_completo}
                `);
                    console.log(`Seu saldo agora é de: R$${saldoAtual.toFixed(2)}`);
                    console.log('--------------------------------------');

                    setTimeout(() => {
                        console.log('Voltando para o menu em 5 segundos...');
                        console.log('--------------------------------------');
                    }, 2000);

                    contador -= contador;

                    setTimeout(() => {
                        verMenu()
                    }, 7000);

                } else if (resposta.toLowerCase() == 'nao' || resposta.toLowerCase() == 'não') {
                    console.log(`
                Transação de R$${Number(valorTransferido).toFixed(2)} para ${usuarios_cadastrados[destinatario - 1].nome_completo} foi cancelada!
                `);
                    console.log('--------------------------------------');

                    console.log('Voltando para o menu em 2 segundos...');
                    console.log('--------------------------------------');

                    contador -= contador;

                    setTimeout(() => {
                        verMenu()
                    }, 2000);
                } else {
                    console.log('Resposta inválida! Tente novamente');
                    console.log('--------------------------------------');

                    contador++;
                }
            }
        }
    }


    // Função para listar as contas cadastradas
    function listar_contas() {

        if (usuarios_cadastrados.length == 0) {
            console.log("Nenhuma conta cadastrada");
            console.log('--------------------------------------');

            console.log('Voltando para o menu em 2 segundos...');
            console.log('--------------------------------------');

            setTimeout(() => {
                verMenu()
            }, 2000);

        } else {
            // Estrutura de repetição para exibir todas as contas cadastradas
            for (var i = 0; i < usuarios_cadastrados.length; i++) {
                console.log(`
                    Conta: ${i + 1} \n
                    Nome completo: ${usuarios_cadastrados[i].nome_completo} \n
                    CPF: ${usuarios_cadastrados[i].cpf_cadastrado} \n
                    Número da Agência: ${usuarios_cadastrados[i].numero_agencia} \n
                    Saldo atual: R$${usuarios_cadastrados[i].saldo_bancario.toFixed(2)}
                `);

                console.log('-------------');
            }
        }

        console.log('Voltando para o menu em 5 segundos...');
        console.log('--------------------------------------');

        setTimeout(() => {
            verMenu()
        }, 5000);

    }

    function sair_agencia() {
        console.log(`
        Obrigado pela paciência! Nos vemos em breve! \n
        -------------------------------------- \n
        Finalizando a sessão... \n
        --------------------------------------
        `);

        return; // Return estará sendo utilizado para PARAR a função matriz ("iniciar_sistema()")
    }
}

// Desenvolvido por: Lucas Santos
// Versão 1.0