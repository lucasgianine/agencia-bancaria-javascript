// Iniciando a aplicação no console
console.log('--------------------------------------');
console.log('**** Bem vindo(a) a Banco Digital ****')
console.log('--------------------------------------');
console.log('Execute o seguinte comando para iniciar o menu:');
console.log('-------');
console.log('"iniciar_sistema()"'); // Função que será ativada pelo console para inicar o sistema

var contador; // Variável contador para ajudar nas verificações com WHILE
var usuarios_cadastrados = []; // Lista contendo JSONs/Informações do cadastro de usuários
var bolsaValores = [
    {
        nome: 'Aquatech - SPTech',
        // actionName: 'AQUA',
        valorBolsa: 0
    },
    {
        nome: 'Feather Farm',
        // actionName: 'FEFA',
        valorBolsa: 0
    },
    {
        nome: 'Nextpoint',
        // actionName: 'NXTP',
        valorBolsa: 0
    },
    {
        nome: 'Bluelight',
        // actionName: 'BLUE',
        valorBolsa: 0
    },
    {
        nome: 'GestMed',
        // actionName: 'GMED',
        valorBolsa: 0
    }
]; // Lista contendo JSONs/Informações das empresas

var bolsaAquatech = bolsaValores[0].valorBolsa;
var bolsaFeatherfarm = bolsaValores[1].valorBolsa;
var bolsaNextpoint = bolsaValores[2].valorBolsa;
var bolsaBluelight = bolsaValores[3].valorBolsa;
var bolsaGestmed = bolsaValores[4].valorBolsa;

function iniciar_sistema() {
    // Iniando o sistema da aplicação
    console.log('--------------------------------------');
    console.log('**** Menu Banco Digital ****')
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
            5. Bolsa de valores (New!)\n
            6. Listar contas \n
            7. Sair \n
            `); // Entrada de resposta do usuário

        // Dependendo da resposta do usuário, ele irá ativar uma dessas funções
        if (primeira_resposta == 1) {
            // Realizar a função:
            criar_conta();
        } else if (primeira_resposta == 6) {
            // Realizar a função:
            listar_contas();
        } else if (primeira_resposta == 7) {
            // Realizar a função:
            sair_agencia();
        } else if (primeira_resposta >= 2 && primeira_resposta <= 5) {
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
            } else if (primeira_resposta == 5) {
                realizar_investimento(contaAtual - 1,
                    bolsaAquatech, bolsaBluelight, bolsaFeatherfarm, bolsaGestmed, bolsaNextpoint);
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
            saldo_bancario: 0, // Sempre definindo o saldo bancário como 0 na criação da conta
            bolsaInvestida: -1
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

            console.log(`Olá, ${usuarios_cadastrados[contaAtual].nome_completo}!`);
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

            console.log(`Olá, ${usuarios_cadastrados[contaAtual].nome_completo}!`);
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

                    console.log(`Olá, ${usuarios_cadastrados[contaAtual].nome_completo}!`);
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

    // Novo (01/07/2023)
    function realizar_investimento(contaAtual,
        bolsaAquatech, bolsaBluelight, bolsaFeatherfarm, bolsaGestmed, bolsaNextpoint) {
        console.log(`**** Iniciando investimento na bolsa de valores ****`);
        console.log('--------------------------------------');

        // var cor = '';

        // if (bolsaAquatech < 0 || bolsaBluelight < 0 || bolsaFeatherfarm < 0 || bolsaGestmed < 0 || bolsaNextpoint < 0) {
        //     cor = 'red';
        // } else {
        //     cor = 'green';
        // }

        var decisao = prompt(`
        Você deseja:\n
        -------------\n
        1. Investir em ações;\n
        2. Ver ações;\n
        3. Retirar dinheiro investido; (*Off)\n`);

        if (decisao == 1) {
            var empresa = prompt(`
        Informe em que empresa deseja investir:\n
        -------------\n
        1. Aquatech (${bolsaAquatech.toFixed(2)}%)\n
        2. Feather Farm (${bolsaFeatherfarm.toFixed(2)}%)\n
        3. Nextpoint (${bolsaNextpoint.toFixed(2)}%)\n
        4. BlueLight (${bolsaBluelight.toFixed(2)}%)\n
        5. GestMed (${bolsaGestmed.toFixed(2)}%)\n
        `);

            var valor = prompt(`
        Informe a quantidade que deseja investir:\n
        R$`);

            if (usuarios_cadastrados[contaAtual].saldo_bancario == 0) {
                console.log('Investimento indisponível no momento.');
                console.log('Finalizando a sessão...');
                console.log('--------------------------------------');

                setTimeout(() => {
                    verMenu()
                }, 2000);
            } else if (usuarios_cadastrados[contaAtual].saldo_bancario < Number(valor)) {
                console.log('Valor muito acima, tente novamente.');
                console.log('Finalizando a sessão...');
                console.log('--------------------------------------');

                setTimeout(() => {
                    verMenu()
                }, 2000);
            } else {

                var saldoAtual = usuarios_cadastrados[contaAtual].saldo_bancario - Number(valor);

                usuarios_cadastrados[contaAtual].saldo_bancario = saldoAtual;

                console.log(`Olá, ${usuarios_cadastrados[contaAtual].nome_completo}!`);
                console.log(`EMPRESA INVESTIDA: ${bolsaValores[Number(empresa - 1)].nome}`);
                console.log(`% DA AÇÃO: ${bolsaValores[Number(empresa - 1)].valorBolsa}`);
                console.log(`QUANTIA INVESTIDA: R$${Number(valor).toFixed(2)}`);
                console.log('--------------------------------------');

                /* Atualizando a lista de usuários cadastrados (na conta que está em serviço),
                mais específicamente no atributo BOLSAINVESTIDA, reatribuindo com os dados da
                empresa que o mesmo investiu. */
                usuarios_cadastrados[contaAtual].bolsaInvestida = [{
                        nome: bolsaValores[Number(empresa - 1)].nome,
                        // nomeAcao: bolsaValores[Number(empresa - 1)].actionName,
                        valorInvestido: Number(valor).toFixed(2),
                        valorBolsa: bolsaValores[Number(empresa - 1)].valorBolsa
                    }];

                console.log(`Dinheiro investido com sucesso!`);
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
        } else if (decisao == 2) {
            for (var i = 0; i < usuarios_cadastrados[contaAtual].bolsaInvestida.length; i++) {
                console.log(`
                    Número da ação: ${i + 1}\n
                    Nome da ação: *Off \n
                    Nome da empresa: ${usuarios_cadastrados[contaAtual].bolsaInvestida[i].nome} \n
                    Valor da ação - Comprada (%): ${usuarios_cadastrados[contaAtual].bolsaInvestida[i].valorBolsa} \n
                    Valor da ação - Atual (%): *Off \n
                    Valor investido: ${usuarios_cadastrados[contaAtual].bolsaInvestida[i].valorInvestido} \n
                `);

                console.log('-------------');
            }
        } else if (decisao == 3) {
            // Em desenvolvimento
        } else {
            console.log('ATENÇÃO! Informe uma opção válida!');
            console.log('--------------------------------------');
            setTimeout(() => {
                realizar_investimento()
            }, 2000);
        }
    }
}

// Funções dinâmicas que ocorrerão durante toda a aplicação simulando a vida real
var inflacaoDinamica = 0; // Contador
var taxaSelic = 0; // Em porcentagem

setInterval(() => {
    inflacaoDinamica++;

    if (inflacaoDinamica == 3) {
        taxaSelic = 0.12; // 12%

        bolsaAquatech = 1.72;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.93;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.8;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 3.1;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 0.72;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 5) {
        taxaSelic = 0.111;

        bolsaAquatech = 1.74;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.85;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 2.31;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 1.07;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 0.91;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 7) {
        taxaSelic = 0.10;

        bolsaAquatech = 1.64;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.98;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.74;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 1.01;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.107;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 14) {
        taxaSelic = 0.13;

        bolsaAquatech = 1.52;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 1.38;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.32;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 1.21;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.57;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 18) {
        taxaSelic = 0.1345;

        bolsaAquatech = 1.61;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 1.1;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.4;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 1.14;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.6;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 23) {
        taxaSelic = 0.10;

        bolsaAquatech = 0.84;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.9;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.12;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 0.443;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.432;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 27) {
        taxaSelic = 0.10;

        bolsaAquatech = 0.45;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.38;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.1;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight -= 0.62;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.41;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 33) {
        taxaSelic = 0.10;

        bolsaAquatech = 0.1223;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm -= 0.012;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.2;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight -= 0.619;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 2.011;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 40) {
        bolsaAquatech -= 0.14;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm -= 0.029;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.379;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight -= 0.415;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.75;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 45) {
        bolsaAquatech = 0.32;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.321;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.15;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight -= 0.01;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.455;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 50) {
        bolsaAquatech = 0.53;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 0.73;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.27;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 0.3309;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.51;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 55) {
        bolsaAquatech = 0.99;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 1.03;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.39;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 0.409;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.682;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 60) {
        bolsaAquatech = 1.144;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 1.23;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.345;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 0.56;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.8001;
        bolsaValores[4].valorBolsa = bolsaGestmed;
    } else if (inflacaoDinamica == 65) {
        bolsaAquatech = 1.0331;
        bolsaValores[0].valorBolsa = bolsaAquatech;
        bolsaFeatherfarm = 1.261;
        bolsaValores[1].valorBolsa = bolsaFeatherfarm;
        bolsaNextpoint = 1.69;
        bolsaValores[2].valorBolsa = bolsaNextpoint;
        bolsaBluelight = 0.54;
        bolsaValores[3].valorBolsa = bolsaBluelight;
        bolsaGestmed = 1.689;
        bolsaValores[4].valorBolsa = bolsaGestmed;

        inflacaoDinamica = 0;
    }
}, 3000);


// Desenvolvido por: Lucas Santos
// Versão 1.1.0
// Release: Configuração da bolsa de valores