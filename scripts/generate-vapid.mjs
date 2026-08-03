import pkg from 'web-push';
const { generateVAPIDKeys } = pkg;
const keys = generateVAPIDKeys();
console.log("VAPID_PUBLIC_KEY=" + keys.publicKey);
console.log("VAPID_PRIVATE_KEY=" + keys.privateKey);