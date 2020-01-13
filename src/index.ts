import * as CryptoJS from 'crypto-js';

class Block {
    static calculateHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string,
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): Boolean =>
        typeof aBlock.index === 'number' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number,
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    //생성자
}

const genesisBlock: Block = new Block(0, '2020202020', '', 'Hello', 123456);
//genesisBlock은 Block 타입이고 생성자에 인자를 넣어서 생성

let blockChain: Block[] = [genesisBlock];
//blockChain은 Block의 배열 이고 genesisBlock이 들어감

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data,
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp,
    );
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
    Block.calculateHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data,
    );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): Boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};

createNewBlock('Second Block');
createNewBlock('Third Block');
createNewBlock('Fourth Block');

console.log(blockChain);

export {};
