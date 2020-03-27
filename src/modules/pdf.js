const pug = require('pug');
const path = require('path');
const pdf = require('html-pdf');

function createPDF(htmlPath, params) {
  const html = pug.renderFile(path.join(__dirname, htmlPath), params);
  return new Promise((resolve, reject) => {
    // pdf.create(html, { format: 'A4' }).toFile(path.join(__dirname, '../../public/pdf/Derogation.pdf'), (err, res) => {
    //   if (err) return reject(err);
    //   return resolve(res);
    // });

    pdf.create(html, { format: 'A4' }).toBuffer((err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

module.exports = {
  createPDF,
}