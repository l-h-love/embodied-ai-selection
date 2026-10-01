const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { chromium } = require('playwright');

(async () => {
  const mdPath = 'D:/project/具身智能竞赛/docs/简历_一页版.md';
  const htmlPath = 'D:/project/具身智能竞赛/docs/简历_一页版.html';
  const pdfPath = 'D:/project/具身智能竞赛/docs/简历_一页版.pdf';
  const md = fs.readFileSync(mdPath, 'utf8');
  const body = marked.parse(md, { gfm: true, breaks: false });
  const css = `
    @page { size: A4; margin: 8mm 9mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; color: #172033; }
    body { font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif; font-size: 8.5pt; line-height: 1.27; }
    h1 { font-size: 18pt; line-height: 1.05; margin: 0 0 3px; letter-spacing: 0.05em; }
    h1 + p { margin-top: 0; margin-bottom: 4px; font-size: 9.5pt; }
    h1 + p + p { margin-top: 0; margin-bottom: 5px; color: #3155a6; font-weight: 600; }
    h2 { font-size: 11pt; line-height: 1.1; margin: 7px 0 3px; padding-bottom: 1px; border-bottom: 1.2px solid #3155a6; color: #173b82; }
    h3 { font-size: 9.6pt; line-height: 1.15; margin: 5px 0 2px; color: #132b57; }
    p { margin: 2px 0; }
    ul { margin: 1px 0 2px 15px; padding: 0; }
    li { margin: 0.8px 0; padding: 0; }
    hr { border: 0; border-top: 1px solid #dfe5ef; margin: 3px 0; }
    blockquote { margin: 2px 0 2px 0; padding: 2px 6px; background: #f5f7fb; border-left: 2px solid #9aaed2; color: #4a586e; font-size: 7.8pt; }
    strong { color: #111c33; }
    code { font-family: Consolas, monospace; font-size: 8pt; background: #f1f3f7; padding: 0 2px; }
    @media print { a { color: inherit; text-decoration: none; } }
  `;
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>简历</title><style>${css}</style></head><body>${body}</body></html>`;
  fs.writeFileSync(htmlPath, html, 'utf8');
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage();
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log(JSON.stringify({ htmlPath, pdfPath }, null, 2));
})();