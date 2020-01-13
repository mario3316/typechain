import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateHash = (
        index: number, 
        previousHash: string,
        timestamp: number,
        data: string
        ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    //생성자
}

const genesisBlock: Block = new Block(0, "2020202020", "", "Hello", 123456);
//genesisBlock은 Block 타입이고 생성자에 인자를 넣어서 생성

let blockChain: Block[] = [genesisBlock];
//blockChain은 Block의 배열 이고 genesisBlock이 들어감

const getBlockChain = () : Block[] => blockChain;

const getLatestBlock = () : Block => blockChain[blockChain.length -1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime()/ 1000);

console.log(blockChain);

export {};
