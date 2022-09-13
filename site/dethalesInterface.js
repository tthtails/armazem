/*
Autor: Thales de Souza Guasti
Versão: 5.0
Descrição: Aplicação para gerenciamento de um armazém utilizando matrizes
*/

import { vetProdutos, vetMeses, matVendas, carregarDados, acrescentarProduto, alterarProduto, consultarQtd, maiorVendaMes} from "./dethalesOperacoes.js";

var inProduto = document.getElementById("inProduto");
var inMes = document.getElementById("inMes");
var inQtd = document.getElementById("inQtd");

var btOk = document.getElementById("btOk");

var outResultado = document.getElementById("outResultado");

var selectOpcao = document.getElementById("selectOpcao");

var sectionResultado = document.querySelector(".resultado");

document.addEventListener("DOMContentLoaded", carregarDados);

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
});

function verificarOpcao(opcao) {

    inQtd.disabled = true;
    inQtd.placeholder = "";
    inQtd.value = "";
    inMes.disabled = true;
    inMes.placeholder = "";
    inMes.value = "";
    inProduto.disabled = true;
    inProduto.placeholder = "";
    inProduto.value = "";
    sectionResultado.textContent = "";


    switch (opcao) {
        case "Acrescentar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "Alterar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-6]";
            inQtd.disabled = false;
            inQtd.placeholder = "Digite a quantidade";
            break;
        case "ConsultarQtd":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "ConsultarProd":
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-6]";
    }
}


function executarFunc() {
    let opcao = selectOpcao.value;
    let descrProduto = inProduto.value;
    let mes = Number(inMes.value);
    let qtd = Number(inQtd.value);

    var resultado = document.querySelector(".resultado");

    resultado.innerText = "";

    switch (opcao) {

        case "":
            outResultado.style.color = "red";
            outResultado.textContent = "Erro! Selecione uma opção!";
            break;

        case "Listar":
            let htmlTable = criarTableHtml(vetProdutos, vetMeses, matVendas);
            if (htmlTable != null) {
                document.querySelector(".resultado").appendChild(htmlTable);
            } else {
                outResultado.style.color = "red";
                outResultado.textContent = "Erro! Divergência entre os dados de vetores e matriz!";
            }
            break;

        case "Acrescentar":
            if (descrProduto == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para acrescentar produto novo, o campo deve ser preenchido!";
                inProduto.focus();
            } else {
                if (acrescentarProduto(descrProduto) == true) {
                    outResultado.style.color = "green";
                    outResultado.textContent = "O novo produto foi acrescentado com sucesso!";
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O produto " + descrProduto + " já estava cadastrado!";
                    inProduto.focus();
                }
            }
            break;

        case "Alterar":
            if (mes <= 0 || mes > 6) {
                outResultado.style.color = "red";
                outResultado.textContent = "Ops, digite um mês de 1-6!";
                inMes.focus();
            } else {
                if (alterarProduto(descrProduto, mes, qtd) == true) {
                    outResultado.style.color = "green";
                    outResultado.textContent = "O produto " + descrProduto + " foi alterado no mes " + mes + " tendo como quantidade vendida : " + qtd;
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "O produto que deseja alterar não está cadastrado";
                }
            }
            break;

        case "ConsultarQtd":
            if (descrProduto == "") {
                outResultado.style.color = "red";
                outResultado.textContent = "Para consultar a quantidade deve-se preencher o campo Produto!";
                inProduto.focus();
            } else {
                let calculaVenda = consultarQtd(descrProduto);
                if (consultarQtd(descrProduto) > 0) {
                    outResultado.style.color = "green";
                    outResultado.textContent = "O produto " + descrProduto + " vendeu " + calculaVenda + " unidades no semestre."
                } else {
                    outResultado.style.color = "red";
                    outResultado.textContent = "Erro! O produto " + descrProduto + " não existe!";
                    inProduto.focus();
                }
            }
            break;

        case "ConsultarProd":
            let indProduto = maiorVendaMes(mes);
            let col = mes - 1;
            if (mes <= 0 || mes > 6) {
                outResultado.style.color = "red";
                outResultado.textContent = "Ops! digite o mês de 1-6";
                inMes.focus();
            } else {
                outResultado.style.color = "green";
                outResultado.textContent = "O produto mais vendido no mês " + mes + " foi: " + vetProdutos[indProduto] + " com o total de " + matVendas[indProduto][col] + " vendas";
            }
            break;
    }
}

function criarTableHtml(vetLin, vetCol, mat) {
    //esta function retorna null caso haja erro nos parâmetros
    //por exemplo: tamanho de vetLin e vetCol não compatível com dimensões da matriz

    if (vetLin.length == mat.length && vetCol.length == mat[0].length) {
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        //criando a primeira célula da thead com elemento de texto vazio
        thead.appendChild(document.createElement("th"));

        for (let i = 0; i < vetCol.length; i++) {
            let th = document.createElement("th");
            th.textContent = vetCol[i];
            thead.appendChild(th);
        }
        table.appendChild(thead);

        for (let lin = 0; lin < vetLin.length; lin++) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = vetLin[lin];
            tr.appendChild(td);

            for (let col = 0; col < vetCol.length; col++) {
                td = document.createElement("td");
                td.textContent = mat[lin][col];
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        return table;
    } else {
        return null;
    }
}