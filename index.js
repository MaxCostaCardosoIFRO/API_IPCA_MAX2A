import express from 'express';
import Inflacao from './dados/dados.js';
const servidor = express();
const porta = 8080;
/////////////////////////////////////

servidor.get('/historicoIPCA/calculos', (req, res) => {
console.log(" Acesso:", req.query);
/////////////////////////////////////////////

  const valorBase = parseFloat (req.query.valor);
  const mesInicio = parseInt   (req.query.mesInicial);
  const anoInicio = parseInt   (req.query.anoInicial);
  const mesFim    = parseInt   (req.query.mesFinal);
  const anoFim    = parseInt   (req.query.anoFinal);
///////////////////////////////////////////////////

  if (isNaN(valorBase) || 
      isNaN(mesInicio) || 
      isNaN(anoInicio) ||
      isNaN(mesFim)    || 
      isNaN(anoFim)    ||

  mesInicio < 1 || mesInicio > 12 || mesFim < 1 || mesFim > 12 || anoInicio > anoFim || anoFim > 2024) 
/////////////////////////////////////////////////////////////////////////////////////////////////////////

  {return res.status(400).json({ erro: "Parâmetros inválidos ou não se encontra em nossa aplicação."});  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

  const tempo = Inflacao.filter(item => { return (
  (item.ano > anoInicio || (item.ano === anoInicio && item.mes >= mesInicio)) && 
  (item.ano < anoFim || (item.ano === anoFim && item.mes <= mesFim)))});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (tempo.length === 0) {return res.status(404).json({ erro: "Dado não encontrado, verifique a informação que procura." });}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let valor = valorBase; 
  tempo.forEach(item => { valor *= (1 + item.ipca / 100);});
  res.json ({ valorBase, valor: valor.toFixed(2), });});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

servidor.get('/historicoIPCA', (req, res) => {
  const parametroAno = parseInt(req.query.ano);
  if (!isNaN(parametroAno)) { const dadoano = Inflacao.filter(item => item.ano === parametroAno);
  return dadoano.length > 0 ? res.json(dadoano) : res.status(404).json({erro:"Nenhuma informação foi encontrada para esta pesquisa "});}
  res.json(Inflacao);});
//////////////////////////////////////////////////////////////////////////////////////////////

servidor.get('/historicoIPCA/:id', (req, res) => {
  const parametro = parseInt(req.params.id);
  if (isNaN(parametro)) {
  return res.status(400).json({ erro: 'ID inválido, verifique a informação que procura.' });}
  const dado = Inflacao.find(item => item.id === parametro);
  return dado ? res.json(dado) : res.status(404).json({ erro: 'Dado não encontrado.' }); });
///////////////////////////////////////////////////////////////////////////

servidor.listen(porta, () => {let data = new Date
  console.log(`Alicação em execução na porta ${porta}` + "servidor iniciado em: " + data); });
