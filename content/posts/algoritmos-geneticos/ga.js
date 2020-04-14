import sleepingBag from "./sleeping-bag.png";
import rope from "./rope.png";
import knife from "./swiss-army-knife.png";
import torch from "./torch.png";
import bottle from "./water-bottle.png";
import wrap from "./wrap.png";

export const defaultConfig = {
    PESO_MAXIMO: 30,
    INDIVIDUOS_POR_POPULACAO: 100,
    SELECIONADOS_POR_GERACAO: 50,
    GERACOES: 8,
    CHANCES_DE_MUTACAO: 35
};

function Item(nome, peso, pontos, img) {
    return { nome, pontos, peso, img };
}

export const itens = [
    Item("Saco de Dormir", 15, 15, sleepingBag),
    Item("Corda", 3, 7, rope),
    Item("Canivete", 2, 10, knife),
    Item("Tocha", 5, 5, torch),
    Item("Garrafa", 9, 8, bottle),
    Item("Comida", 20, 17, wrap)
];

export default function ga(config = defaultConfig) {
    var { PESO_MAXIMO, INDIVIDUOS_POR_POPULACAO, SELECIONADOS_POR_GERACAO, GERACOES, CHANCES_DE_MUTACAO } = config;
    CHANCES_DE_MUTACAO = CHANCES_DE_MUTACAO / 100;
    function cromossomoAleatorio() {
        return itens.map(_ => Math.round(Math.random()));
    }

    function selecionarMelhores(geracao) {
        var individuosPesoCorreto = 
            geracao.populacao.filter(i => 
                pesoDoCromossomo(i) <= 
                PESO_MAXIMO
            );
        var melhores = individuosPesoCorreto
            .sort(ordenarPorPontuacao);
        if (melhores.length > SELECIONADOS_POR_GERACAO){
            melhores = melhores
                .slice(0, SELECIONADOS_POR_GERACAO);
        }
        return melhores;
    }

    function pontuacaoDoCromossomo(cromossomo) {
        return cromossomo.reduce((soma, atual, indice) => {
            return soma + (atual ? itens[indice].pontos : 0);
        }, 0);
    }

    function pesoDoCromossomo(cromossomo) {
        return cromossomo.reduce((soma, atual, indice) => {
            return soma + (atual ? itens[indice].peso : 0);
        }, 0);
    }
    
    function geracaoInicial() {
        var populacaoInicial = Array(INDIVIDUOS_POR_POPULACAO).fill()
                .map(_ => cromossomoAleatorio());
        var geracao = {
            n: 1,
            populacao: populacaoInicial
        };
        geracao.populacao.forEach((p, i) => {
            geracao.populacao[i].g = geracao;
            geracao.populacao[i].pontos = pontuacaoDoCromossomo(p);
            geracao.populacao[i].peso = pesoDoCromossomo(p);
        });
        return geracao;
    }
    
    function evoluirGeracoes() {
        var geracaoAtual = geracaoInicial();
    
        while(geracaoAtual.n < GERACOES) {
            geracaoAtual = novaGeracao(geracaoAtual);
        }
        
        return geracaoAtual;
    }
    
    function elementoAleatorio(array) {
        return array[
            Math.floor(Math.random() * array.length)
        ];
    }
    
    function novaGeracao(ultimaGeracao) {
        var nGeracao = ultimaGeracao.n + 1;
        var melhores = selecionarMelhores(ultimaGeracao);
        if (melhores.length % 2 !== 0) {
            melhores.push(melhores[0]);
        }
        var novaPopulacao = [];
        while(novaPopulacao.length !== INDIVIDUOS_POR_POPULACAO) {
            var individuoA, individuoB;
    
            if (melhores.length >= 2) {
                individuoA = melhores.pop();
                individuoB = melhores.shift();
            } else {
                individuoA = elementoAleatorio(novaPopulacao);
                individuoB = elementoAleatorio(novaPopulacao);
            }
            
            for(var i = 0; i < SELECIONADOS_POR_GERACAO; i++) {
                var individuoC = 
                    cruzarIndividuos(individuoA, 
                        individuoB);
                if (nGeracao !== GERACOES && Math.random() < CHANCES_DE_MUTACAO) {
                    individuoC = gerarMutacao(individuoC);
                }
                individuoC.a = individuoA;
                individuoC.b = individuoB;
                novaPopulacao.push(individuoC);
            }
        }
    
        novaPopulacao = novaPopulacao.filter(cromossomo => {
            return pesoDoCromossomo(cromossomo) <= PESO_MAXIMO;
        });
    
        var geracao = {
            n: nGeracao,
            populacao: novaPopulacao
        };
    
        geracao.populacao.forEach((p, i) => {
            geracao.populacao[i].g = geracao;
            geracao.populacao[i].pontos = pontuacaoDoCromossomo(p);
            geracao.populacao[i].peso = pesoDoCromossomo(p);
        });
    
        return geracao;
    }
    
    function ordenarPorPontuacao(cromossomoA, cromossomoB) {
        const pA = pontuacaoDoCromossomo(cromossomoA);
        const pB = pontuacaoDoCromossomo(cromossomoB);
        return pA > pB ? -1 :
               pA < pB ?  1 : 0;
    }
    
    
    
    function cruzarIndividuos(a, b) {
        return itens.map((_, indice) => 
            Math.round(Math.random()) === 1 ?
                a[indice] : b[indice]);
    }
    
    function gerarMutacao(cromossomo) {
        return cromossomo.map((gene) => {
            return (Math.random() < CHANCES_DE_MUTACAO ?
                (gene ? 0 : 1) : gene);
        });
    }

    return {
        evoluirGeracoes, selecionarMelhores
    };
}