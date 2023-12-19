const url = require('url')
const address = 'http://wwww.meusite.com.br/catalog?produtos=cadeira'
const parsedUrl = new url.URL(address)

console.log(parsedUrl.host) // wwww.meusite.com.br - nome do dominio
console.log(parsedUrl.pathname) // /catalog - nome da rota
console.log(parsedUrl.search) // ?produtos=cadeira - item buscado
console.log(parsedUrl.searchParams) // URLSearchParams { 'produtos' => 'cadeira' } parametros de busca
console.log(parsedUrl.searchParams.get('catalog')) // null - resultado da busca usando os parametros