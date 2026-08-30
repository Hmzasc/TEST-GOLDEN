const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.mauribac.com';
const CONCOURS_SLUG = 'concours-2025-sHeCedayc';

const HEADERS = { 'User-Agent': 'Mozilla/5.0 ...' };

function padNumero(n) { return String(n).trim().padStart(3, '0'); }

async function scrapeWilayas() {
  const url = `${BASE_URL}/${CONCOURS_SLUG}/`;
  const res = await axios.get(url, { headers: HEADERS });
  const $ = cheerio.load(res.data);
  const wilayas = [];
  $('select.select-url-filter option').each((_, el) => {
    const value = $(el).attr('value') || '';
    const text = $(el).text().trim();
    if (!value || value === '' || text.includes('جميع')) return;
    const match = value.match(/\/wilaya\/([^/]+)\/?$/);
    if (!match) return;
    const encodedName = match[1];
    const nameMatch = text.match(/^(.+?)\s*\(\d+\)$/);
    const displayName = nameMatch ? nameMatch[1].trim() : decodeURIComponent(encodedName);
    wilayas.push({ name: displayName, encodedName });
  });
  return wilayas;
}

async function scrapeMoughataas(wilayaEncoded) {
  const url = `${BASE_URL}/${CONCOURS_SLUG}/wilaya/${wilayaEncoded}/`;
  const res = await axios.get(url, { headers: HEADERS });
  const $ = cheerio.load(res.data);
  const list = [];
  $('select.select-url-filter option').each((_, el) => {
    const value = $(el).attr('value') || '';
    const text = $(el).text().trim();
    if (!value || value === '' || text.includes('جميع')) return;
    const match = value.match(/\/moughataa\/([^/]+)\/?$/);
    if (!match) return;
    const encodedName = match[1];
    const nameMatch = text.match(/^(.+?)\s*\(\d+\)$/);
    const displayName = nameMatch ? nameMatch[1].trim() : decodeURIComponent(encodedName);
    list.push({ name: displayName, encodedName });
  });
  return list;
}

async function scrapeCentres(wilayaEncoded, moughataaEncoded) {
  const url = `${BASE_URL}/${CONCOURS_SLUG}/wilaya/${wilayaEncoded}/moughataa/${moughataaEncoded}/`;
  const res = await axios.get(url, { headers: HEADERS });
  const $ = cheerio.load(res.data);
  const list = [];
  $('select.select-url-filter option').each((_, el) => {
    const value = $(el).attr('value') || '';
    const text = $(el).text().trim();
    if (!value || value === '' || text.includes('جميع')) return;
    const match = value.match(/\/centre\/([^/]+)\/?$/);
    if (!match) return;
    const encodedName = match[1];
    const nameMatch = text.match(/^(.+?)\s*\(\d+\)$/);
    const displayName = nameMatch ? nameMatch[1].trim() : decodeURIComponent(encodedName);
    list.push({ name: displayName, encodedName });
  });
  return list;
}

async function scrapeConcoursResult(wilayaEncoded, moughataaEncoded, centreEncoded, numero) {
  const padded = padNumero(numero);
  const url = `${BASE_URL}/${CONCOURS_SLUG}/wilaya/${wilayaEncoded}/moughataa/${moughataaEncoded}/centre/${centreEncoded}/numero/${padded}/`;
  const res = await axios.get(url, { headers: HEADERS });
  const $ = cheerio.load(res.data);
  const container = $('div.w-full').first();
  const result = { numero: padded };
  result.name = container.find('h1.text-2xl').first().text().trim() || $('h1').first().text().trim();
  result.decision = container.find('div.px-2').first().text().trim().split('\n')[0].trim();
  const avgRaw = container.find('div.text-gray-700').first().text().trim();
  const avgMatch = avgRaw.match(/\d+[.,]\d+|\d+/);
  result.moyenne = avgMatch ? avgMatch[0].replace(',', '.') : '';
  return result;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { action, wilaya, moughataa, centre, numero } = req.query;
  
  try {
    if (action === 'wilayas') {
      const wilayas = await scrapeWilayas();
      return res.json({ success: true, data: wilayas });
    }
    if (action === 'moughataas' && wilaya) {
      const moughataas = await scrapeMoughataas(wilaya);
      return res.json({ success: true, data: moughataas });
    }
    if (action === 'centres' && wilaya && moughataa) {
      const centres = await scrapeCentres(wilaya, moughataa);
      return res.json({ success: true, data: centres });
    }
    if (action === 'result' && wilaya && moughataa && centre && numero) {
      const result = await scrapeConcoursResult(wilaya, moughataa, centre, numero);
      return res.json({ success: true, data: result });
    }
    
    res.status(400).json({ error: 'معاملات غير صحيحة' });
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 404) {
      res.status(404).json({ error: 'الرقم غير موجود' });
    } else {
      res.status(500).json({ error: 'خطأ في الخادم' });
    }
  }
};