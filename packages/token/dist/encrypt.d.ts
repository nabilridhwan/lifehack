export interface GeneratedKeyPair {
    private: string;
    public: string;
}
export declare namespace Hash {
    function hash(password: string): Promise<string>;
    function compare(password: string, hash: string): boolean;
}
export declare namespace Encryption {
    function encryptWithMasterPassword(data: string, rawMasterPassword: string): {
        iv: string;
        encryptedData: string;
    };
    function decryptWithMasterPassword(encryptedData: string, rawMasterPassword: string, ivHex: string): string;
    function generateKeyPair(): GeneratedKeyPair;
    function getPrivateKey(k: GeneratedKeyPair): string;
    function getPublicKey(k: GeneratedKeyPair): string;
    function encryptWithPublic(data: string, publicKey: string): string;
    function encryptWithPrivate(data: string, privateKey: string): string;
    function decryptWithPublic(data: string, publicKey: string): string;
    function decryptWithPrivate(data: string, privateKey: string): string;
}
export declare namespace KeyPairUtils {
    function encryptKeyPairWithMasterPassword(keypair: GeneratedKeyPair, rawMasterPassword: string): {
        private: string;
        privateIv: string;
        public: string;
        publicIv: string;
    };
    function decryptKeyWithMasterPassword(encryptedKey: string, iv: string, rawMasterPassword: string): string;
}
