"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.firebase_params = void 0;
const firebase = require("firebase-admin");
const serviceAccount = require("../../gymshare-dev-firebase-adminsdk-3lots-6437af0799.json");
exports.firebase_params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privatekeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509Certurl: serviceAccount.client_x509_cert_url,
};
if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(Object.assign({}, exports.firebase_params)),
        databaseURL: 'https://gymshare-dev.firebaseio.com',
    });
}
exports.admin = firebase;
//# sourceMappingURL=firebase.utils.js.map