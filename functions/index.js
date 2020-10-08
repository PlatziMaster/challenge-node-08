const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.database();
const ref = db.ref('/assistant');
const childRedf = ref.child('technical');

exports.helloWorld = functions.https.onRequest((request, response) => {
  if (request.method === 'GET') {
    const data = childRedf;
    data.on('value', (sanpshot) => {
      const parseData = Object.keys(sanpshot.val()).map(key => sanpshot.val()[key]);
      response.json(parseData);
    })
  } else {
    response.status(500).send('No tienes permisos')
  }
});

exports.saveData = functions.https.onRequest((request, response) => {
  if (request.method === 'POST') {
    const data = childRedf.push();
    data.set(request.body);
    response.status(200).json(request.body)
  } else {
    response.status(500).send('No tienes permisos')
  }
});
