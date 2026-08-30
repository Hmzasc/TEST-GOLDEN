const axios = require('axios');
const cheerio = require('cheerio');

const SITE_CONFIG = {
  baseUrl: 'https://www.mauribac.com',
  slug: 'bepc-2025-9t2g9YlrU'
};

const HEADERS = { 'User-Agent': 'Mozilla/5.0 ...' };

function padNumero(n) { return String(n).trim().padStart(5, '0'); }

function extractData($) {
  // نفس extractBacData مع تعديل بسيط
  const result = {};
  const container = $('div.w-full').first();
  result.name = container.find('h1.text-2xl').first().text().trim() || $('h1').first().text().trim();
  result.decision = container.find('div.px-2').first().text().trim().split('\n')[0].trim();
  const avgRaw = container.find('div.text-gray-700').first().text().trim();
  const avgMatch = avgRaw.match(/\d+[.,]\d+|\d+/);
  result.moyenne = avgMatch ? avgMatch[0].replace(',', '.') : '';
  
  container.find('a').each((_, el) => {
    const href = $(el).attr('href') || '';
    const text = $(el).text().trim();
    if (!text) return;
    if (href.includes('/wilaya/') && !href.includes('/centre/')) result.wilaya = result.wilaya || text;
    if (href.includes('/wilaya/') && href.includes('/centre/')) result.centre = result.centre || text;
    if (href.includes('/ecole/')) result.school = result.school || text;
  });
  return result;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { numero } = req.query;
  if (!numero) return res.status(400).json({ error: 'أدخل رقم المترشح' });
  
  try {
    const url = `${SITE_CONFIG.baseUrl}/${SITE_CONFIG.slug}/numero/${padNumero(numero)}/`;
    const response = await axios.get(url, { headers: HEADERS, timeout: 10000 });
    const $ = cheerio.load(response.data);
    const data = extractData($);
    if (!data.name && !data.decision) return res.status(404).json({ error: 'الرقم غير موجود' });
    res.json({ success: true, data });
  } catch (err) {
    if (err.response?.status === 404) res.status(404).json({ error: 'الرقم غير موجود' });
    else res.status(500).json({ error: 'خطأ في الخادم' });
  }
};