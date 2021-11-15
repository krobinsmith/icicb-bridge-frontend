declare interface Window  {
    connector: IConnector;
	ethereum: any;
    Web3: any;
}


interface WalletTypes {
    chainIds:{[chainId:number|string]:string}
    chainId:number
    rpc:string

    status: string
    address: string
    checking: boolean
    balance: string
	err:string
}

interface NetworkTypes {
    bridge: string
    chainId: number
    coin: string
    decimals: number
    confirmations: number 
    blocktime: number
    rpc: string
    explorer: string
    erc20: string
    disabled?: boolean
}

/* interface TokenTypes {
    [network:string]:{
        [token:string]:{
            symbol: string
            decimals: number
        }
    }
} */

interface PendingType {
    chain:string
    targetChain:string
    address:string
    token:string
    value:number
    created: number
}

interface TxType {
    tx:string
    err:boolean
    fee:string
}

interface PendingTypes {
    [txid:string]:PendingType
}

interface TxTypes {
    [txid:string]:TxType
}

interface CoinTypes {
    [symbol:string]:{[chain:string]:{
        address:string
        decimals:number
    }}
}

declare interface BridgeTypes extends WalletTypes {
    lang: string
    L: {[lang:string]:any}

    coins: CoinTypes
    loading: boolean
    inited: boolean
    pending: PendingTypes
    txs: TxTypes
    chain: string
    targetChain: string
	token: string // symbol
    value: string
}
declare interface ResultType {
    err: string,
    result: string
}
interface UseWalletTypes extends BridgeTypes {
    update(payload:{[key:string]:string|number|boolean|PendingTypes|TxTypes|CoinTypes})

    getPending():{pending: PendingTypes, txs:TxTypes}
    setPending(key:string, pending:PendingType)
    removePending(txId:string)
    setTxs(txs:TxTypes)
    balance(token:string, rpc?:string):Promise<string|undefined>
    bridgebalance(chain:string, token:string): Promise<string|undefined>

    connect():Promise<void>

    waitTransaction(txId:string): Promise<boolean>
    
    approval(token:string): Promise<string|undefined>
    approve(token:string, amount:string): Promise<string|undefined>

    /* depositToIcicb(token:string, amount:string, targetChain:string, targetToken:string): Promise<string|null> */
    deposit(token:string, amount:string, targetChain:number): Promise<string|undefined>
}

declare type CallbackAccountsChanged = (address:string)=>void
declare type CallbackChainChanged = (chainid:number)=>void
