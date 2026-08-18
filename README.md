# Crypto Risk & Trade Calculator

Calculadora de Risco e Trade para Criptomoedas: position sizing, stop loss, take profit e relação risco x retorno em tempo real, com preços da **BingX Futuros** (perpétuos USDT-M), Binance e CoinGecko.

## Recursos

- Busca automática de preço por nome ou código (BTC, ETH, SOL, "Bitcoin"...)
- Fonte de preço selecionável: BingX Futuros (padrão) ou Binance Spot
- Indicador de status em tempo real + variação 24h
- Stop Loss flexível (por % ou preço fixo) com conversão automática
- Take Profit por % ou preço alvo
- Aporte, alavancagem (1x–100x, Spot/Futuros)
- Painel de resultados em tempo real: preço do SL, preço do TP, risco máximo, lucro potencial, tamanho da posição, liquidação estimada e relação R:R visual
- Moeda em USD ou BRL
- Dark mode estilo trading dashboard, responsivo

## Como rodar

```bash
python3 server.py
```

O servidor serve a aplicação em `http://localhost:8000` e inclui um proxy local (`/api/bingx/*`) usado como fallback quando a API da BingX bloqueia requisições cross-origin (CORS). Para apenas abrir o arquivo sem o proxy, abra `index.html` diretamente — o app tenta a API da BingX primeiro e cai no proxy quando necessário.

## Estrutura

- `index.html` — interface
- `styles.css` — tema dark / dashboard
- `app.js` — lógica, busca de preços e cálculos
- `server.py` — servidor estático + proxy para a API da BingX

## Observações

- Dados de preço: BingX Futuros, Binance e CoinGecko (APIs públicas, sem chave).
- BRL: como a BingX não tem pares BRL, o valor em R$ é derivado via taxa USD/BRL.
- Estimativas para fins informativos e educacionais — não constituem recomendação de investimento.
