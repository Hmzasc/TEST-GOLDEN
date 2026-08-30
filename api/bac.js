const axios = require('axios');
const cheerio = require('cheerio');

const SITE_CONFIG = {
  baseUrl: 'https://www.mauribac.com',
  slugs: {
    bac: 'bac-2025-7vvixTtmi',
    bacSecond: 'bac-second-session-2025-YeDV1ug1m'
  }
};

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

function padNumeroBac(n) {
  return String(n).trim().padStart(5, '0');
}

function extractBacData($, type) {
  const result = { type };
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
    
    if (href.includes('/wilaya/') && !href.includes('/centre/') && !href.includes('/ecole/')) {
      result.wilaya = result.wilaya || text;
    }
    if (href.includes('/wilaya/') && href.includes('/centre/')) {
      result.centre = result.centre || text;
    }
    if (href.includes('/ecole/')) {
      result.school = result.school || text;
    }
    if (!result.serie) {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      const serieLine = lines.find(l => !l.includes('الباكلوريا') && !l.includes('Baccalauréat') && l.length > 2);
      if (serieLine) result.serie = serieLine;
    }
  });
  
  return result;
}

module.exports = async (req, res) => {
  // تمكين CORS (للاستخدام من المتصفح)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { numero, type } = req.query; // type = 'bac' أو 'bac2'
  
  if (!numero || !type) {
    return res.status(400).json({ error: 'الرجاء إرسال رقم المترشح ونوع الامتحان' });
  }
  
  const slug = type === 'bac2' ? SITE_CONFIG.slugs.bacSecond : SITE_CONFIG.slugs.bac;
  const url = `${SITE_CONFIG.baseUrl}/${slug}/numero/${padNumeroBac(numero)}/`;
  
  try {
    const response = await axios.get(url, { headers: HEADERS, timeout: 10000 });
    const $ = cheerio.load(response.data);
    const data = extractBacData($, type);
    
    if (!data.name && !data.decision) {
      return res.status(404).json({ error: 'الرقم غير موجود' });
    }
    
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 404) {
      res.status(404).json({ error: 'الرقم غير موجود' });
    } else {
      res.status(500).json({ error: 'حدث خطأ في الخادم' });
    }
  }
};