(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const COINS = [
    { base: 'BTC',  cg: 'bitcoin',                     name: 'Bitcoin' },
    { base: 'ETH',  cg: 'ethereum',                    name: 'Ethereum' },
    { base: 'BNB',  cg: 'binancecoin',                 name: 'BNB' },
    { base: 'SOL',  cg: 'solana',                      name: 'Solana' },
    { base: 'XRP',  cg: 'ripple',                      name: 'XRP' },
    { base: 'ADA',  cg: 'cardano',                     name: 'Cardano' },
    { base: 'DOGE', cg: 'dogecoin',                    name: 'Dogecoin' },
    { base: 'AVAX', cg: 'avalanche-2',                 name: 'Avalanche' },
    { base: 'DOT',  cg: 'polkadot',                    name: 'Polkadot' },
    { base: 'LINK', cg: 'chainlink',                   name: 'Chainlink' },
    { base: 'TRX',  cg: 'tron',                        name: 'TRON' },
    { base: 'LTC',  cg: 'litecoin',                    name: 'Litecoin' },
    { base: 'SHIB', cg: 'shiba-inu',                   name: 'Shiba Inu' },
    { base: 'UNI',  cg: 'uniswap',                     name: 'Uniswap' },
    { base: 'ATOM', cg: 'cosmos',                      name: 'Cosmos' },
    { base: 'NEAR', cg: 'near',                        name: 'NEAR Protocol' },
    { base: 'APT',  cg: 'aptos',                       name: 'Aptos' },
    { base: 'ARB',  cg: 'arbitrum',                    name: 'Arbitrum' },
    { base: 'OP',   cg: 'optimism',                    name: 'Optimism' },
    { base: 'SUI',  cg: 'sui',                         name: 'Sui' },
    { base: 'TON',  cg: 'the-open-network',            name: 'Toncoin' },
    { base: 'FIL',  cg: 'filecoin',                    name: 'Filecoin' },
    { base: 'ICP',  cg: 'internet-computer',           name: 'Internet Computer' },
    { base: 'HBAR', cg: 'hedera-hashgraph',            name: 'Hedera' },
    { base: 'VET',  cg: 'vechain',                     name: 'VeChain' },
    { base: 'ALGO', cg: 'algorand',                    name: 'Algorand' },
    { base: 'XLM',  cg: 'stellar',                     name: 'Stellar' },
    { base: 'ETC',  cg: 'ethereum-classic',            name: 'Ethereum Classic' },
    { base: 'BCH',  cg: 'bitcoin-cash',                name: 'Bitcoin Cash' },
    { base: 'XMR',  cg: 'monero',                      name: 'Monero' },
    { base: 'ZEC',  cg: 'zcash',                       name: 'Zcash' },
    { base: 'DASH', cg: 'dash',                        name: 'Dash' },
    { base: 'MKR',  cg: 'maker',                       name: 'Maker' },
    { base: 'AAVE', cg: 'aave',                        name: 'Aave' },
    { base: 'SNX',  cg: 'synthetix-network-token',     name: 'Synthetix' },
    { base: 'GRT',  cg: 'the-graph',                   name: 'The Graph' },
    { base: 'ENA',  cg: 'ethena',                      name: 'Ethena' },
    { base: 'PEPE', cg: 'pepe',                        name: 'Pepe' },
    { base: 'WIF',  cg: 'dogwifcoin',                  name: 'dogwifhat' },
    { base: 'FET',  cg: 'artificial-superintelligence-alliance', name: 'Artificial Superintelligence' },
    { base: 'RENDER', cg: 'render-token',              name: 'Render' },
    { base: 'SEI',  cg: 'sei-network',                 name: 'Sei' },
    { base: 'TIA',  cg: 'celestia',                    name: 'Celestia' },
    { base: 'INJ',  cg: 'injective',                   name: 'Injective' },
    { base: 'JUP',  cg: 'jupiter-exchange-solana',     name: 'Jupiter' },
    { base: 'HYPE', cg: 'hyperliquid',                 name: 'Hyperliquid' },
    { base: 'POL',  cg: 'polygon-ecosystem-token',     name: 'Polygon' },
    { base: 'MATIC', cg: 'matic-network',              name: 'Polygon (MATIC)' }
  ];

  const QUICK = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA', 'LINK', 'PEPE', 'SUI'];

  const state = {
    coin: null,
    currency: 'USD',
    source: 'bingx',
    posType: 'spot',
    slMode: 'pct',
    tpMode: 'pct',
    entryManual: false,
    prices: { usd: null, brl: null },
    changePct: null,
    lastUpdated: null,
    refreshTimer: null,
    lastQuery: ''
  };

  const el = {
    searchInput: $('searchInput'),
    suggestions: $('suggestions'),
    btnSearch: $('btnSearch'),
    quickChips: $('quickChips'),
    sourceSeg: $('sourceSeg'),
    sourceNote: $('sourceNote'),
    sourceTag: $('sourceTag'),
    statusPill: $('statusPill'),
    statusText: $('statusText'),
    priceRow: $('priceRow'),
    priceSymbol: $('priceSymbol'),
    priceCurrent: $('priceCurrent'),
    priceTime: $('priceTime'),
    priceChange: $('priceChange'),
    entryInput: $('entryInput'),
    entrySuffix: $('entrySuffix'),
    btnUseMarket: $('btnUseMarket'),
    btnReload: $('btnReload'),
    posTypeSeg: $('posTypeSeg'),
    posTypeChip: $('posTypeChip'),
    capitalInput: $('capitalInput'),
    capitalSuffix: $('capitalSuffix'),
    levSlider: $('levSlider'),
    levValue: $('levValue'),
    slModeSeg: $('slModeSeg'),
    slPctInput: $('slPctInput'),
    slPriceInput: $('slPriceInput'),
    slSuffix: $('slSuffix'),
    derivedSlPct: $('derivedSlPct'),
    derivedSlValue: $('derivedSlValue'),
    tpModeSeg: $('tpModeSeg'),
    tpPctInput: $('tpPctInput'),
    tpPriceInput: $('tpPriceInput'),
    tpSuffix: $('tpSuffix'),
    derivedTpPct: $('derivedTpPct'),
    derivedTpValue: $('derivedTpValue'),
    resultsCard: $('resultsCard'),
    btnClear: $('btnClear'),
    rrText: $('rrText'),
    rrRisk: $('rrRisk'),
    rrReward: $('rrReward'),
    rrSub: $('rrSub'),
    resSlPrice: $('resSlPrice'),
    resSlDist: $('resSlDist'),
    resTpPrice: $('resTpPrice'),
    resTpDist: $('resTpDist'),
    resRisk: $('resRisk'),
    resRiskPct: $('resRiskPct'),
    resProfit: $('resProfit'),
    resProfitPct: $('resProfitPct'),
    resQty: $('resQty'),
    resNotional: $('resNotional'),
    resLiq: $('resLiq'),
    resLiqDist: $('resLiqDist')
  };

  const curSym = () => (state.currency === 'USD' ? 'US$' : 'R$');

  function parseNum(v) {
    if (v === null || v === undefined) return NaN;
    let s = String(v).trim();
    if (!s) return NaN;
    const hasDot = s.includes('.');
    const hasComma = s.includes(',');
    if (hasComma && hasDot) {
      if (s.lastIndexOf('.') < s.lastIndexOf(',')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (hasComma) {
      s = s.replace(',', '.');
    }
    const n = parseFloat(s);
    return isNaN(n) ? NaN : n;
  }

  function priceFrac(v) {
    const a = Math.abs(v);
    if (a >= 100) return 2;
    if (a >= 1) return 2;
    if (a >= 0.01) return 4;
    if (a >= 0.0001) return 6;
    return 8;
  }
  function qtyFrac(v) {
    const a = Math.abs(v);
    if (a >= 1000) return 2;
    if (a >= 1) return 4;
    if (a >= 0.01) return 6;
    return 8;
  }
  function fmtNum(v, frac) {
    if (!isFinite(v)) return '—';
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: frac });
  }
  const fmtPrice = (v) => fmtNum(v, priceFrac(v));
  const fmtQty = (v) => fmtNum(v, qtyFrac(v));
  const fmtMoney = (v) => fmtNum(v, 2);
  const withCur = (v) => `${curSym()} ${fmtMoney(v)}`;

  function setStatus(kind, text) {
    el.statusText.textContent = text;
    el.statusPill.className = 'chip ' + (kind === 'ok' ? 'chip-live' : kind === 'loading' ? 'chip-blue' : kind === 'err' ? 'chip-red' : kind === 'manual' ? 'chip-amber' : 'chip-gray');
  }

  function matchCoins(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COINS
      .filter((c) => c.base.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || (c.name + ' ' + c.base).toLowerCase().includes(q))
      .slice(0, 8);
  }

  function renderSuggestions(items) {
    el.suggestions.innerHTML = '';
    if (!items.length) {
      el.suggestions.hidden = true;
      return;
    }
    items.forEach((c) => {
      const div = document.createElement('div');
      div.className = 'suggestion';
      div.innerHTML = `<span class="sym">${c.base}/USDT</span><span class="nm">${c.name}</span>`;
      div.addEventListener('click', () => {
        el.searchInput.value = c.base;
        el.suggestions.hidden = true;
        selectCoin(c);
      });
      el.suggestions.appendChild(div);
    });
    el.suggestions.hidden = false;
  }

  function renderQuickChips() {
    QUICK.forEach((base) => {
      const coin = COINS.find((c) => c.base === base);
      if (!coin) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-btn';
      b.textContent = base;
      b.addEventListener('click', () => {
        el.searchInput.value = base;
        selectCoin(coin);
      });
      el.quickChips.appendChild(b);
    });
  }

  let usdBrlRate = null;
  function getUsdBrl() {
    if (usdBrlRate) return Promise.resolve(usdBrlRate);
    return fetch('https://api.coingecko.com/api/v3/exchange_rates')
      .then((r) => r.json())
      .then((j) => {
        if (j && j.rates && j.rates.usd && j.rates.brl) {
          usdBrlRate = j.rates.brl.value / j.rates.usd.value;
          return usdBrlRate;
        }
        return null;
      })
      .catch(() => null);
  }

  function fetchBinance(base) {
    const u = fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${base}USDT`).then((r) => (r.ok ? r.json() : Promise.reject())).then((j) => parseFloat(j.price)).catch(() => null);
    const b = fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${base}BRL`).then((r) => (r.ok ? r.json() : Promise.reject())).then((j) => parseFloat(j.price)).catch(() => null);
    return Promise.all([u, b]).then(([usd, brl]) => ({ usd, brl }));
  }

  function parseBingXTicker(j) {
    if (!j || j.code !== 0 || !j.data) return null;
    const d = j.data;
    const price = parseFloat(d.price ?? d.lastPrice);
    const change = d.priceChangePercent != null ? parseFloat(d.priceChangePercent) : null;
    if (!isFinite(price)) return null;
    return { price, change };
  }

  async function fetchBingX(base) {
    const candidates = [base, '1000' + base];
    for (const cand of candidates) {
      try {
        const r = await fetch(`https://open-api.bingx.com/openApi/swap/v2/quote/ticker?symbol=${cand}-USDT`, { signal: AbortSignal.timeout(6000) });
        if (r.ok) {
          const parsed = parseBingXTicker(await r.json());
          if (parsed) return parsed;
        }
      } catch (e) {}
    }
    for (const cand of candidates) {
      try {
        const r = await fetch(`/api/bingx/quote/ticker?symbol=${cand}-USDT`, { signal: AbortSignal.timeout(6000) });
        if (!r.ok) continue;
        const parsed = parseBingXTicker(await r.json());
        if (parsed) return parsed;
      } catch (e) {}
    }
    return null;
  }

  async function fetchPrices(coin) {
    const cgP = fetchCoinGecko(coin.cg);
    let bing = null;
    let bin = null;
    if (state.source === 'bingx') {
      bing = await fetchBingX(coin.base);
      if (!bing) bin = await fetchBinance(coin.base);
    } else {
      bin = await fetchBinance(coin.base);
    }
    const cg = await cgP;
    let usd = (bing && bing.price) || (bin && bin.usd) || cg.usd;
    let brl = (bin && bin.brl) || cg.brl;
    if (brl == null && usd != null) {
      const rate = await getUsdBrl();
      if (rate) brl = usd * rate;
    }
    return { usd, brl, changePct: (bing && bing.change) || null };
  }

  function fetchCoinGecko(cgid) {
    if (!cgid) return Promise.resolve({ usd: null, brl: null });
    return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(cgid)}&vs_currencies=usd,brl&include_last_updated_at=true`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const d = j[cgid];
        if (!d) return { usd: null, brl: null };
        return { usd: d.usd != null ? parseFloat(d.usd) : null, brl: d.brl != null ? parseFloat(d.brl) : null };
      })
      .catch(() => ({ usd: null, brl: null }));
  }

  async function fetchPrices(coin) {
    const [bin, cg] = await Promise.all([fetchBinance(coin.base), fetchCoinGecko(coin.cg)]);
    let usd = bin.usd ?? cg.usd;
    let brl = bin.brl ?? cg.brl;
    if (brl == null && usd != null) {
      const rate = await getUsdBrl();
      if (rate) brl = usd * rate;
    }
    return { usd, brl };
  }

  function resolveCoinDynamic(base) {
    return fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${base}USDT`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(async () => {
        let cgid = null;
        try {
          const q = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(base)}`).then((r) => r.json());
          if (q && q.coins && q.coins.length) cgid = q.coins[0].id;
        } catch (e) {}
        return { base, cg: cgid, name: base };
      })
      .catch(() => null);
  }

  function resolveCoinName(name) {
    return fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(name)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (!j || !j.coins || !j.coins.length) return null;
        const hit = j.coins[0];
        const base = (hit.symbol || '').toUpperCase().replace(/\s/g, '');
        return { base: base || 'TKN', cg: hit.id, name: hit.name };
      })
      .catch(() => null);
  }

  async function resolveCoin(query) {
    const q = query.trim();
    if (!q) return null;
    const lq = q.toLowerCase();
    const known =
      COINS.find((c) => c.base.toLowerCase() === lq || c.name.toLowerCase() === lq) ||
      COINS.find((c) => c.base.toLowerCase().includes(lq) || c.name.toLowerCase().includes(lq));
    if (known) return known;
    if (/^[A-Z0-9]{2,10}$/.test(q)) return resolveCoinDynamic(q);
    return resolveCoinName(q);
  }

  async function selectCoin(coin) {
    if (!coin) return;
    state.coin = coin;
    state.entryManual = false;
    el.searchInput.value = coin.base;
    el.suggestions.hidden = true;
    el.priceSymbol.textContent = coin.base + '/USDT';
    el.priceRow.hidden = false;
    setStatus('loading', 'Buscando preço...');
    const { usd, brl, changePct } = await fetchPrices(coin);
    if (!state.coin || state.coin.base !== coin.base) return;
    if (usd == null && brl == null) {
      setStatus('err', 'Erro ao buscar preço');
      return;
    }
    state.prices = { usd, brl };
    state.changePct = changePct;
    state.lastUpdated = new Date();
    if (!state.entryManual) {
      const display = state.currency === 'USD' ? usd : (brl ?? usd);
      el.entryInput.value = display != null ? String(display) : '';
    }
    renderPrice();
    setStatus('ok', 'Preço atualizado em tempo real');
    startRefresh();
  }

  async function refreshPrice() {
    if (!state.coin) return;
    if (state.entryManual) {
      setStatus('manual', 'Preço de entrada manual');
    }
    setStatus('loading', 'Atualizando preço...');
    const { usd, brl, changePct } = await fetchPrices(state.coin);
    if (!state.coin) return;
    if (usd == null && brl == null) {
      setStatus('err', 'Erro ao atualizar preço');
      return;
    }
    state.prices = { usd, brl };
    state.changePct = changePct;
    state.lastUpdated = new Date();
    if (!state.entryManual) {
      const display = state.currency === 'USD' ? usd : (brl ?? usd);
      el.entryInput.value = display != null ? String(display) : '';
    }
    renderPrice();
    setStatus(state.entryManual ? 'manual' : 'ok', state.entryManual ? 'Preço de entrada manual' : 'Preço atualizado em tempo real');
  }

  function renderPrice() {
    const p = state.prices;
    const display = state.currency === 'USD' ? (p.usd ?? p.brl) : (p.brl ?? p.usd);
    el.priceCurrent.textContent = display != null ? `${curSym()} ${fmtPrice(display)}` : '—';
    if (state.lastUpdated) {
      const t = state.lastUpdated.toLocaleTimeString('pt-BR', { hour12: false });
      el.priceTime.textContent = 'Atualizado às ' + t;
    }
    if (state.entryManual) {
      el.btnUseMarket.textContent = 'Usar preço atual';
    }
    el.sourceTag.textContent = state.source === 'bingx' ? 'BingX Futuros' : 'Binance Spot';
    const c = state.changePct;
    if (c != null && isFinite(c)) {
      el.priceChange.hidden = false;
      el.priceChange.textContent = (c >= 0 ? '+' : '') + fmtNum(c, 2) + '% (24h)';
      el.priceChange.className = 'tag ' + (c >= 0 ? 'tag-green' : 'tag-red');
    } else {
      el.priceChange.hidden = true;
    }
  }

  function setSource(src) {
    state.source = src;
    [...document.querySelectorAll('#sourceSeg .seg-btn')].forEach((b) => b.classList.toggle('active', b.dataset.source === src));
    const seg = $('sourceSeg');
    seg.dataset.active = src === 'binance' ? '1' : '0';
    el.sourceNote.textContent = src === 'bingx' ? 'Perpétuos USDT-M' : 'Spot à vista';
    el.sourceTag.textContent = src === 'bingx' ? 'BingX Futuros' : 'Binance Spot';
    if (state.coin) {
      state.entryManual = false;
      refreshPrice();
    }
  }

  function startRefresh() {
    if (state.refreshTimer) clearInterval(state.refreshTimer);
    state.refreshTimer = setInterval(() => {
      if (state.coin && !document.hidden) refreshPrice();
    }, 20000);
  }

  function setCurrency(cur) {
    state.currency = cur;
    [...document.querySelectorAll('#currencySeg .seg-btn')].forEach((b) => b.classList.toggle('active', b.dataset.currency === cur));
    const idx = cur === 'USD' ? 0 : 1;
    const seg = $('currencySeg');
    seg.dataset.active = String(idx);
    el.entrySuffix.textContent = curSym();
    el.capitalSuffix.textContent = curSym();
    el.slSuffix.textContent = curSym();
    el.tpSuffix.textContent = curSym();
    renderPrice();
    updateDerived();
    compute();
  }

  function setPosType(type) {
    state.posType = type;
    [...document.querySelectorAll('#posTypeSeg .seg-btn')].forEach((b) => b.classList.toggle('active', b.dataset.pos === type));
    const seg = $('posTypeSeg');
    seg.dataset.active = type === 'futures' ? '1' : '0';
    el.posTypeChip.textContent = type === 'futures' ? 'Futuros' : 'Spot';
    if (type === 'spot') {
      el.levSlider.value = 1;
      el.levSlider.disabled = true;
    } else {
      el.levSlider.disabled = false;
    }
    el.levValue.textContent = el.levSlider.value + 'x';
    compute();
  }

  function setSlMode(mode) {
    state.slMode = mode;
    const cur = getEntry();
    const slPct = parseNum(el.slPctInput.value);
    const slPrice = parseNum(el.slPriceInput.value);
    if (mode === 'value' && !isFinite(slPrice) && isFinite(cur)) {
      const pct = isFinite(slPct) ? slPct : 2;
      el.slPriceInput.value = cur * (1 - pct / 100);
    }
    if (mode === 'pct' && !isFinite(slPct) && isFinite(cur) && isFinite(slPrice)) {
      el.slPctInput.value = ((cur - slPrice) / cur) * 100;
    }
    [...document.querySelectorAll('#slModeSeg .seg-btn')].forEach((b) => b.classList.toggle('active', b.dataset.slMode === mode));
    const seg = $('slModeSeg');
    seg.dataset.active = mode === 'value' ? '1' : '0';
    const group = el.slModeSeg.closest('.card');
    group.querySelector('.mode-fields[data-mode="pct"]').hidden = mode !== 'pct';
    group.querySelector('.mode-fields[data-mode="value"]').hidden = mode !== 'value';
    updateDerived();
    compute();
  }

  function setTpMode(mode) {
    state.tpMode = mode;
    const cur = getEntry();
    const tpPct = parseNum(el.tpPctInput.value);
    const tpPrice = parseNum(el.tpPriceInput.value);
    if (mode === 'value' && !isFinite(tpPrice) && isFinite(cur)) {
      const pct = isFinite(tpPct) ? tpPct : 6;
      el.tpPriceInput.value = cur * (1 + pct / 100);
    }
    if (mode === 'pct' && !isFinite(tpPct) && isFinite(cur) && isFinite(tpPrice)) {
      el.tpPctInput.value = ((tpPrice - cur) / cur) * 100;
    }
    [...document.querySelectorAll('#tpModeSeg .seg-btn')].forEach((b) => b.classList.toggle('active', b.dataset.tpMode === mode));
    const seg = $('tpModeSeg');
    seg.dataset.active = mode === 'value' ? '1' : '0';
    const group = el.tpModeSeg.closest('.card');
    group.querySelector('.mode-fields[data-mode="pct"]').hidden = mode !== 'pct';
    group.querySelector('.mode-fields[data-mode="value"]').hidden = mode !== 'value';
    updateDerived();
    compute();
  }

  function getEntry() {
    const manual = parseNum(el.entryInput.value);
    if (isFinite(manual) && manual > 0) return manual;
    const p = state.prices;
    const d = state.currency === 'USD' ? p.usd : (p.brl ?? p.usd);
    return isFinite(d) && d > 0 ? d : NaN;
  }

  function updateDerived() {
    const cur = getEntry();
    if (!isFinite(cur) || cur <= 0) {
      el.derivedSlPct.textContent = '';
      el.derivedSlValue.textContent = '';
      el.derivedTpPct.textContent = '';
      el.derivedTpValue.textContent = '';
      return;
    }
    const slPct = parseNum(el.slPctInput.value);
    const slPrice = parseNum(el.slPriceInput.value);
    const tpPct = parseNum(el.tpPctInput.value);
    const tpPrice = parseNum(el.tpPriceInput.value);
    if (isFinite(slPct)) {
      el.derivedSlPct.textContent = 'Stop Loss ≈ ' + curSym() + ' ' + fmtPrice(cur * (1 - slPct / 100));
    }
    if (isFinite(slPrice)) {
      const p = ((cur - slPrice) / cur) * 100;
      el.derivedSlValue.textContent = 'Variação de ' + (p >= 0 ? '−' : '') + fmtNum(Math.abs(p), 2) + '%';
    }
    if (isFinite(tpPct)) {
      el.derivedTpPct.textContent = 'Take Profit ≈ ' + curSym() + ' ' + fmtPrice(cur * (1 + tpPct / 100));
    }
    if (isFinite(tpPrice)) {
      const p = ((tpPrice - cur) / cur) * 100;
      el.derivedTpValue.textContent = 'Variação de +' + fmtNum(Math.abs(p), 2) + '%';
    }
  }

  function renderPlaceholders() {
    el.resSlPrice.textContent = '—';
    el.resSlDist.textContent = 'Informe entrada e stop loss';
    el.resTpPrice.textContent = '—';
    el.resTpDist.textContent = 'Informe o take profit';
    el.resRisk.textContent = '—';
    el.resRiskPct.textContent = '—';
    el.resProfit.textContent = '—';
    el.resProfitPct.textContent = '—';
    el.resQty.textContent = '—';
    el.resNotional.textContent = '—';
    el.resLiq.textContent = '—';
    el.resLiqDist.textContent = 'Somente futuros';
    el.rrText.textContent = '—';
    el.rrRisk.style.width = '50%';
    el.rrReward.style.width = '50%';
    el.rrSub.textContent = 'Selecione uma moeda e informe o aporte para ver os resultados em tempo real.';
  }

  function compute() {
    const entry = getEntry();
    const capital = parseNum(el.capitalInput.value);
    const leverage = state.posType === 'futures' ? Math.max(1, parseInt(el.levSlider.value, 10) || 1) : 1;
    const slMode = state.slMode;
    const tpMode = state.tpMode;

    const slPct = slMode === 'pct' ? parseNum(el.slPctInput.value) : (isFinite(parseNum(el.slPriceInput.value)) && isFinite(entry) ? ((entry - parseNum(el.slPriceInput.value)) / entry) * 100 : NaN);
    const slPrice = slMode === 'pct' ? (isFinite(slPct) ? entry * (1 - slPct / 100) : NaN) : parseNum(el.slPriceInput.value);
    const tpPct = tpMode === 'pct' ? parseNum(el.tpPctInput.value) : (isFinite(parseNum(el.tpPriceInput.value)) && isFinite(entry) ? ((parseNum(el.tpPriceInput.value) - entry) / entry) * 100 : NaN);
    const tpPrice = tpMode === 'pct' ? (isFinite(tpPct) ? entry * (1 + tpPct / 100) : NaN) : parseNum(el.tpPriceInput.value);

    const valid = isFinite(entry) && entry > 0 && isFinite(capital) && capital > 0;
    if (!valid) {
      renderPlaceholders();
      return;
    }

    const notional = capital * leverage;
    const qty = notional / entry;
    const risk = isFinite(slPrice) && slPrice < entry ? qty * (entry - slPrice) : 0;
    const profit = isFinite(tpPrice) && tpPrice > entry ? qty * (tpPrice - entry) : 0;
    const rr = risk > 0 ? profit / risk : null;
    const liq = state.posType === 'futures' ? entry * (1 - 1 / leverage) : null;

    el.resSlPrice.textContent = isFinite(slPrice) ? curSym() + ' ' + fmtPrice(slPrice) : '—';
    el.resSlDist.textContent = isFinite(slPct) ? '−' + fmtNum(Math.abs(slPct), 2) + '% do preço' : '—';
    el.resTpPrice.textContent = isFinite(tpPrice) ? curSym() + ' ' + fmtPrice(tpPrice) : '—';
    el.resTpDist.textContent = isFinite(tpPct) ? '+' + fmtNum(Math.abs(tpPct), 2) + '% do preço' : '—';
    el.resRisk.textContent = withCur(risk);
    el.resRiskPct.textContent = capital > 0 ? fmtNum((risk / capital) * 100, 1) + '% do aporte' : '—';
    el.resProfit.textContent = withCur(profit);
    el.resProfitPct.textContent = capital > 0 ? '+' + fmtNum((profit / capital) * 100, 1) + '% do aporte' : '—';
    el.resQty.textContent = fmtQty(qty) + ' ' + (state.coin ? state.coin.base : '');
    el.resNotional.textContent = 'Notional: ' + withCur(notional) + (leverage > 1 ? ` (${leverage}x)` : '');
    if (liq != null) {
      el.resLiq.textContent = curSym() + ' ' + fmtPrice(liq);
      el.resLiqDist.textContent = fmtNum(((entry - liq) / entry) * 100, 2) + ' abaixo da entrada';
    } else {
      el.resLiq.textContent = '—';
      el.resLiqDist.textContent = 'Somente futuros';
    }

    if (rr != null && isFinite(rr) && rr > 0) {
      el.rrText.textContent = '1 : ' + fmtNum(rr, 2);
      const total = 1 + rr;
      const rw = Math.max(12, Math.min(88, (1 / total) * 100));
      el.rrRisk.style.width = rw + '%';
      el.rrReward.style.width = (100 - rw) + '%';
      el.rrSub.textContent = 'Para cada ' + curSym() + ' 1 de risco, o retorno esperado é de ' + curSym() + ' ' + fmtNum(rr, 2) + '.';
    } else {
      el.rrText.textContent = '—';
      el.rrRisk.style.width = '50%';
      el.rrReward.style.width = '50%';
      el.rrSub.textContent = 'Defina um stop loss abaixo do preço de entrada para calcular a relação.';
    }
  }

  function handleInput(e) {
    if (e.target === el.entryInput) {
      const v = parseNum(el.entryInput.value);
      if (isFinite(v) && v > 0) {
        state.entryManual = true;
        setStatus('manual', 'Preço de entrada manual');
      } else {
        state.entryManual = false;
        if (state.coin && (state.prices.usd != null || state.prices.brl != null)) {
          setStatus('ok', 'Preço atualizado em tempo real');
        }
      }
      renderPrice();
    }
    updateDerived();
    compute();
  }

  function clearAll() {
    state.coin = null;
    state.entryManual = false;
    state.prices = { usd: null, brl: null };
    state.changePct = null;
    state.lastUpdated = null;
    if (state.refreshTimer) clearInterval(state.refreshTimer);
    el.searchInput.value = '';
    el.suggestions.hidden = true;
    el.priceRow.hidden = true;
    el.entryInput.value = '';
    el.capitalInput.value = '';
    el.slPctInput.value = '';
    el.slPriceInput.value = '';
    el.tpPctInput.value = '';
    el.tpPriceInput.value = '';
    el.levSlider.value = 1;
    el.levValue.textContent = '1x';
    setPosType('spot');
    setSlMode('pct');
    setTpMode('pct');
    renderPlaceholders();
    setStatus('gray', 'Aguardando moeda');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === el.searchInput) {
      e.preventDefault();
      doSearch();
    }
    if (e.key === 'Escape') el.suggestions.hidden = true;
  });

  let suggestTimer = null;
  el.searchInput.addEventListener('input', () => {
    clearTimeout(suggestTimer);
    suggestTimer = setTimeout(() => renderSuggestions(matchCoins(el.searchInput.value)), 160);
  });
  document.addEventListener('click', (e) => {
    if (!el.searchInput.contains(e.target)) el.suggestions.hidden = true;
  });

  function doSearch() {
    const q = el.searchInput.value;
    if (!q.trim()) return;
    if (q.trim().toLowerCase() === state.lastQuery && state.coin) {
      refreshPrice();
      return;
    }
    state.lastQuery = q.trim().toLowerCase();
    setStatus('loading', 'Procurando...');
    resolveCoin(q).then((coin) => {
      if (!coin) {
        setStatus('err', 'Moeda não encontrada');
        return;
      }
      selectCoin(coin);
    });
  }

  el.btnSearch.addEventListener('click', doSearch);
  el.btnReload.addEventListener('click', () => {
    if (state.coin) refreshPrice();
    else doSearch();
  });
  el.btnUseMarket.addEventListener('click', () => {
    state.entryManual = false;
    const p = state.prices;
    const d = state.currency === 'USD' ? p.usd : (p.brl ?? p.usd);
    if (isFinite(d) && d > 0) el.entryInput.value = String(d);
    setStatus('ok', 'Preço atualizado em tempo real');
    renderPrice();
    updateDerived();
    compute();
  });

  document.querySelectorAll('#currencySeg .seg-btn').forEach((b) => b.addEventListener('click', () => setCurrency(b.dataset.currency)));
  document.querySelectorAll('#sourceSeg .seg-btn').forEach((b) => b.addEventListener('click', () => setSource(b.dataset.source)));
  document.querySelectorAll('#posTypeSeg .seg-btn').forEach((b) => b.addEventListener('click', () => setPosType(b.dataset.pos)));
  document.querySelectorAll('#slModeSeg .seg-btn').forEach((b) => b.addEventListener('click', () => setSlMode(b.dataset.slMode)));
  document.querySelectorAll('#tpModeSeg .seg-btn').forEach((b) => b.addEventListener('click', () => setTpMode(b.dataset.tpMode)));

  el.levSlider.addEventListener('input', () => {
    el.levValue.textContent = el.levSlider.value + 'x';
    compute();
  });

  el.capitalInput.addEventListener('input', handleInput);
  el.entryInput.addEventListener('input', handleInput);
  el.slPctInput.addEventListener('input', (e) => { updateDerived(); compute(); });
  el.slPriceInput.addEventListener('input', (e) => { updateDerived(); compute(); });
  el.tpPctInput.addEventListener('input', (e) => { updateDerived(); compute(); });
  el.tpPriceInput.addEventListener('input', (e) => { updateDerived(); compute(); });

  el.btnClear.addEventListener('click', clearAll);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && state.coin) refreshPrice();
  });

  setCurrency('USD');
  setSource('bingx');
  setPosType('spot');
  setSlMode('pct');
  setTpMode('pct');
  renderPlaceholders();
  renderQuickChips();
})();
