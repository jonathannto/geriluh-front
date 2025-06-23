const PROXY_CONFIG = [
  {
    context: ['/v1'],
    target: 'http://localhost:8080', //api local
    secure: false, // Desabilita a verificação de certificado
    changeOrigin: true, // Muda o cabeçalho Host para o destino
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
