export var vetProdutos;
export var vetMeses;
export var matVendas;

export function carregarDados() {
    vetProdutos = ["Queijo", "Chocolate", "Bombril", "Mirabel", "Xampu", "Pipoca", "Doritos", "Lápis", "Caneta azul", "Coca-Cola", "Feijão", "Arroz", "Macarrão", "Carne", "Linguiça", "Ovos", "Cebola", "Pão Francês", "Batata", "Café", "Halls Menthos"];
    vetMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    matVendas = [[12, 13, 9, 7, 0, 23],
    [9, 17, 0, 25, 10, 31],
    [1, 14, 8, 16, 26, 19],
    [7, 12, 5, 0, 9, 14],
    [4, 15, 32, 19, 23, 25],
    [31, 16, 12, 23, 12, 7],
    [0, 15, 1, 20, 15, 2],
    [22, 11, 13, 17, 18, 22],
    [12, 18, 14, 24, 26, 32],
    [29, 31, 25, 27, 31, 17],
    [0, 7, 14, 28, 36, 28],
    [21, 14, 2, 1, 7, 26],
    [31, 20, 31, 21, 0, 12],
    [22, 11, 14, 16, 18, 20],
    [21, 32, 34, 21, 11, 0],
    [29, 31, 28, 35, 31, 20],
    [22, 1, 4, 6, 10, 29],
    [0, 2, 1, 21, 14, 29],
    [22, 12, 21, 25, 21, 11],
    [4, 0, 12, 23, 25, 21],
    [1, 5, 8, 2, 13, 22],
    ];
}

export function pesquisarProdVet(descrProduto) {
    //retorna o índice do produto pesquisado em vetProdutos ou -1 se produto não cadastrado
    let pos = -1;
    for (let i = 0; i < vetProdutos.length && pos == -1; i++) {
        if (vetProdutos[i] == descrProduto) {
            pos = i;
        }
    }
    return pos;
}

export function acrescentarProduto(descrProduto) {
    let pos = pesquisarProdVet(descrProduto);

    if (pos == -1) { //indica que produto não existe no vetor
        vetProdutos.push(descrProduto);
        matVendas.push([0, 0, 0, 0, 0, 0]);
        return true;

    } else {
        return false;
    }
}

export function alterarProduto(descrProduto, mes, qtd) {
    let lin = pesquisarProdVet(descrProduto);
    let col = mes - 1;

    if (lin == - 1) {
        return false;
    } else {
        matVendas[lin][col] = qtd;
        return true;
    }
}

export function consultarQtd(descrProduto) {
    let lin = pesquisarProdVet(descrProduto);
    let somaVendasProduto = 0;

    if (lin > -1) {
        for (let col = 0; col < vetMeses.length; col++) {
            somaVendasProduto += matVendas[lin][col];
        }
    }
    return somaVendasProduto;
}

export function maiorVendaMes(mes) {
    let linMaior = 0;
    let col = mes - 1;

    for (let lin = 1; lin < matVendas.length; lin++) {
        if (matVendas[linMaior][col] < matVendas[lin][col]) {
            linMaior = lin;
        }
    }
    return linMaior;
}