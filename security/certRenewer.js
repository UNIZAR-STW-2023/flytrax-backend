/*
  File's name: certRenewer.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const fs = require('fs');
const { execSync } = require('child_process');

const CERT_PATH = './security/cert.pem';
const PRIVATE_KEY_PATH = './security/private.key';
const CSR_PATH = './security/csr.pem';

function renewCert() {
  const cert = fs.readFileSync(CERT_PATH);
  const now = new Date();
  const expiration = new Date(cert.validity.end);

  if (now > expiration) {
    console.log('Renewing SSL/TLS certificate...');

    // Generate a new private key
    execSync(`openssl genrsa -out ${PRIVATE_KEY_PATH} 2048`);

    // Create a new CSR
    execSync(`openssl req -new -key ${PRIVATE_KEY_PATH} -out ${CSR_PATH}`);

    // Submit the CSR to the CA and get a new certificate
    // Once you receive the new certificate, save it to the cert.pem file

    console.log('Certificate renewed.');
  }
}

module.exports = renewCert;