import dadosInflacao from '../dados/dados.js';

export function dados() 
{ return Inflacao; }
/////////////////////////////////////////////////

export function filtrarAno(ano) 
{ return Inflacao.filter(dadosIPCA => dadosIPCA.ano === ano);}
/////////////////////////////////////////////////////////////////

export function mediaPorAno(ano) {
    const Ano = filtrarAno(ano);
    const somaIPCA = Ano.reduce((acumulador, dadosIPCA) => acumulador + dadosIPCA.ipca, 0);
return Ano.length > 0 ? (somaIPCA / Ano.length).toFixed(2) : 0; }
////////////////////////////////////////////////////////////////////////////////////

export function ajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal, dadosIPCA) {
    const inicio = dadosIPCA.find(dadosIPCA => dadosIPCA.ano === anoInicial && dadosIPCA.mes === mesInicial);
    const fim = dadosIPCA.find(dadosIPCA => dadosIPCA.ano === anoFinal && dadosIPCA.mes === mesFinal);
////////////////////////////////////////////////////////////////////////////////////////////////

    if (!inicio || !fim) {return null; }
    const acumulacao = dadosIPCA
///////////////////////////////////////////////////////////////////////////////////////////////////

    .filter(dadosIPCA => (dadosIPCA.ano > anoInicial || (dadosIPCA.ano === anoInicial && dadosIPCA.mes >= mesInicial)) &&
    (registro.ano < anoFinal || (dadosIPCA.ano === anoFinal && dadosIPCA.mes <= mesFinal)))
    .reduce((dadoacumulado, dadosIPCA) => dadoacumulado + dadosIPCA.ipca, 0);
//////////////////////////////////////////////////////////////////////////////////////

    const valorFinal = valor * (1 + acumulacao / 100); return valorFinal.toFixed(2); }
