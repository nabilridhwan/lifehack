import bcrypt from "bcrypt";
import crypto from "crypto";
import NodeRSA from "node-rsa";

export interface GeneratedKeyPair {
	private: string;
	public: string;
}

export namespace Hash {
	export async function hash(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	export function compare(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}
}

export namespace Encryption {
	const key = new NodeRSA();

	// Encrypt the keys with a master password
	const masterPassword = "your_master_password";

	export function encryptWithMasterPassword(
		data: string,
		rawMasterPassword: string
	): { iv: string; encryptedData: string } {
		const salt = crypto.randomBytes(16);
		const iv = crypto.randomBytes(16);
		const key = crypto.pbkdf2Sync(
			rawMasterPassword,
			salt,
			100000,
			32,
			"sha512"
		);
		const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
		const encrypted = Buffer.concat([
			cipher.update(data, "utf8"),
			cipher.final(),
		]);
		const tag = cipher.getAuthTag();

		return {
			iv: iv.toString("hex"),
			encryptedData: Buffer.concat([salt, tag, encrypted]).toString(
				"hex"
			),
		};
	}

	export function decryptWithMasterPassword(
		encryptedData: string,
		rawMasterPassword: string,
		ivHex: string
	): string {
		const encrypted = Buffer.from(encryptedData, "hex");
		const salt = encrypted.slice(0, 16);
		const tag = encrypted.slice(16, 32);
		const data = encrypted.slice(32);
		const key = crypto.pbkdf2Sync(
			rawMasterPassword,
			salt,
			100000,
			32,
			"sha512"
		);
		const decipher = crypto.createDecipheriv(
			"aes-256-gcm",
			key,
			Buffer.from(ivHex, "hex")
		);
		decipher.setAuthTag(tag);
		// @ts-ignore
		let decrypted = decipher.update(data, "binary", "utf8");
		// @ts-ignore
		decrypted += decipher.final("utf8");
		return decrypted;
	}

	export function generateKeyPair(): GeneratedKeyPair {
		const k = key.generateKeyPair(1024);
		const priv = k.exportKey("private");
		const pub = k.exportKey("public");

		return {
			private: priv,
			public: pub,
		};
	}

	export function getPrivateKey(k: GeneratedKeyPair) {
		return k.private;
	}

	export function getPublicKey(k: GeneratedKeyPair) {
		return k.public;
	}

	export function encryptWithPublic(data: string, publicKey: string) {
		// console.log("encryptWithPublic", data, publicKey);
		return new NodeRSA()
			.importKey(publicKey, "public")
			.encrypt(data, "base64");
	}

	export function encryptWithPrivate(data: string, privateKey: string) {
		// console.log("encryptWithPrivate", data, privateKey);
		return new NodeRSA()
			.importKey(privateKey, "private")
			.encryptPrivate(data, "base64");
	}

	export function decryptWithPublic(data: string, publicKey: string) {
		// console.log("decryptWithPublic", data, publicKey);
		return new NodeRSA()
			.importKey(publicKey, "public")
			.decryptPublic(data, "utf8");
	}

	export function decryptWithPrivate(data: string, privateKey: string) {
		// console.log("decryptWithPrivate", data, privateKey);
		return new NodeRSA()
			.importKey(privateKey, "private")
			.decrypt(data, "utf8");
	}
}

export namespace KeyPairUtils {
	export function encryptKeyPairWithMasterPassword(
		keypair: GeneratedKeyPair,
		rawMasterPassword: string
	) {
		const privateKey = Encryption.encryptWithMasterPassword(
			keypair.private,
			rawMasterPassword
		);
		const publicKey = Encryption.encryptWithMasterPassword(
			keypair.public,
			rawMasterPassword
		);

		return {
			private: privateKey.encryptedData,
			privateIv: privateKey.iv,
			public: publicKey.encryptedData,
			publicIv: publicKey.iv,
		};
	}

	export function decryptKeyWithMasterPassword(
		encryptedKey: string,
		iv: string,
		rawMasterPassword: string
	) {
		return Encryption.decryptWithMasterPassword(
			encryptedKey,
			rawMasterPassword,
			iv
		);
	}
}

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
