"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairUtils = exports.Encryption = exports.Hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const node_rsa_1 = __importDefault(require("node-rsa"));
var Hash;
(function (Hash) {
    function hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.hashSync(password, 10);
        });
    }
    Hash.hash = hash;
    function compare(password, hash) {
        return bcrypt_1.default.compareSync(password, hash);
    }
    Hash.compare = compare;
})(Hash = exports.Hash || (exports.Hash = {}));
var Encryption;
(function (Encryption) {
    const key = new node_rsa_1.default();
    // Encrypt the keys with a master password
    const masterPassword = "your_master_password";
    function encryptWithMasterPassword(data, rawMasterPassword) {
        const salt = crypto_1.default.randomBytes(16);
        const iv = crypto_1.default.randomBytes(16);
        const key = crypto_1.default.pbkdf2Sync(rawMasterPassword, salt, 100000, 32, "sha512");
        const cipher = crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
        const encrypted = Buffer.concat([
            cipher.update(data, "utf8"),
            cipher.final(),
        ]);
        const tag = cipher.getAuthTag();
        return {
            iv: iv.toString("hex"),
            encryptedData: Buffer.concat([salt, tag, encrypted]).toString("hex"),
        };
    }
    Encryption.encryptWithMasterPassword = encryptWithMasterPassword;
    function decryptWithMasterPassword(encryptedData, rawMasterPassword, ivHex) {
        const encrypted = Buffer.from(encryptedData, "hex");
        const salt = encrypted.slice(0, 16);
        const tag = encrypted.slice(16, 32);
        const data = encrypted.slice(32);
        const key = crypto_1.default.pbkdf2Sync(rawMasterPassword, salt, 100000, 32, "sha512");
        const decipher = crypto_1.default.createDecipheriv("aes-256-gcm", key, Buffer.from(ivHex, "hex"));
        decipher.setAuthTag(tag);
        // @ts-ignore
        let decrypted = decipher.update(data, "binary", "utf8");
        // @ts-ignore
        decrypted += decipher.final("utf8");
        return decrypted;
    }
    Encryption.decryptWithMasterPassword = decryptWithMasterPassword;
    function generateKeyPair() {
        const k = key.generateKeyPair(1024);
        const priv = k.exportKey("private");
        const pub = k.exportKey("public");
        return {
            private: priv,
            public: pub,
        };
    }
    Encryption.generateKeyPair = generateKeyPair;
    function getPrivateKey(k) {
        return k.private;
    }
    Encryption.getPrivateKey = getPrivateKey;
    function getPublicKey(k) {
        return k.public;
    }
    Encryption.getPublicKey = getPublicKey;
    function encryptWithPublic(data, publicKey) {
        // console.log("encryptWithPublic", data, publicKey);
        return new node_rsa_1.default()
            .importKey(publicKey, "public")
            .encrypt(data, "base64");
    }
    Encryption.encryptWithPublic = encryptWithPublic;
    function encryptWithPrivate(data, privateKey) {
        // console.log("encryptWithPrivate", data, privateKey);
        return new node_rsa_1.default()
            .importKey(privateKey, "private")
            .encryptPrivate(data, "base64");
    }
    Encryption.encryptWithPrivate = encryptWithPrivate;
    function decryptWithPublic(data, publicKey) {
        // console.log("decryptWithPublic", data, publicKey);
        return new node_rsa_1.default()
            .importKey(publicKey, "public")
            .decryptPublic(data, "utf8");
    }
    Encryption.decryptWithPublic = decryptWithPublic;
    function decryptWithPrivate(data, privateKey) {
        // console.log("decryptWithPrivate", data, privateKey);
        return new node_rsa_1.default()
            .importKey(privateKey, "private")
            .decrypt(data, "utf8");
    }
    Encryption.decryptWithPrivate = decryptWithPrivate;
})(Encryption = exports.Encryption || (exports.Encryption = {}));
var KeyPairUtils;
(function (KeyPairUtils) {
    function encryptKeyPairWithMasterPassword(keypair, rawMasterPassword) {
        const privateKey = Encryption.encryptWithMasterPassword(keypair.private, rawMasterPassword);
        const publicKey = Encryption.encryptWithMasterPassword(keypair.public, rawMasterPassword);
        return {
            private: privateKey.encryptedData,
            privateIv: privateKey.iv,
            public: publicKey.encryptedData,
            publicIv: publicKey.iv,
        };
    }
    KeyPairUtils.encryptKeyPairWithMasterPassword = encryptKeyPairWithMasterPassword;
    function decryptKeyWithMasterPassword(encryptedKey, iv, rawMasterPassword) {
        return Encryption.decryptWithMasterPassword(encryptedKey, rawMasterPassword, iv);
    }
    KeyPairUtils.decryptKeyWithMasterPassword = decryptKeyWithMasterPassword;
})(KeyPairUtils = exports.KeyPairUtils || (exports.KeyPairUtils = {}));
// const { private: priv, public: pub } = Encryption.generateKeyPair();
// const pw =
// 	"AnhVfqCswp9uqcNnxtKjEsshDkUV393siNCBWqMQiWjLRkYscts4mUkGiVE2CeTudtTxd";
// const encryptedKeyPair = KeyPairUtils.encryptKeyPairWithMasterPassword(
// 	{ private: priv, public: pub },
// 	pw
// );
// console.log(priv);
// console.log(encryptedKeyPair);
// const k = KeyPairUtils.decryptKeyWithMasterPassword(
// 	encryptedKeyPair.private,
// 	encryptedKeyPair.privateIv,
// 	pw
// );
// const { iv, encryptedData } = Encryption.encryptWithMasterPassword(pub, pw);
// console.log({ iv, encryptedData });
// const d = Encryption.decryptWithMasterPassword(encryptedData, pw, iv);
// console.log(d);
//# sourceMappingURL=encrypt.js.map