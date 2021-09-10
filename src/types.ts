export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: {
    readonly [key: string]: string | number | boolean | null;
  };
}

export interface Version {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}

export interface Tags {
  readonly [tagId: string]: {
    readonly name: string;
    readonly description: string;
  };
}

// Parameters for investing into a protected investment.
//
// The function signature is constant, which is why it's an optional property. The `tokens` property defines the
// set of input tokens that can be used to deposit into this investment opportunity. The items in the function
// signature correspond to these `tokens`. For example, if we're investing in the 3Crypto pool, the `tokens` array
// would be [ETH, WBTC, USDT]. When calling `invest` on `address`, amounts[0] would correspond to the amount of ETH
// to invest, amounts[1] would correspond to the amount of WBTC to invest, etc. An amount of MAX_UINT256 should be
// used to signal that you want to invest all tokens you have
//
// The same concept also applies to `approves`, which defines whether or not to check and execute approvals for the
// given token. This is an option to save gas. Similar to `amounts`, the number passed in here specifies how much
// to approve the spending contract for
export interface InvestScript {
  readonly address: string;
  readonly signature?: 'function invest(uint256[] amounts, uint256[] approve)';
}

// Parameters for exiting a protected investment.
//
// Function signature meaning is analogous to `InvestScript`. The `amounts` and `claimRewards` parameters are uint256
// where zero means don't withdraw/claim anything and MAX_UINT256 means withdraw/claim all. Note that not all
// reward tokens will support arbitrary claim amounts. The `recipient` field specifies the address all output
// tokens and reward tokens should be sent to
export interface DivestScript {
  readonly address: string;
  readonly signature?: 'function divest(address recipient, uint256[] receiptAmounts, uint256[] rewardAmounts)';
}

export interface StrategyLeg {
  action: 'Borrow' | 'Swap to' | 'Deposit for' | 'Deposit to' | 'Stake on';
  destination: number; // Platform ID of strategy target
  logoURI?: string;
}

export interface InvestmentOpportunity {
  readonly invest: InvestScript;
  readonly divest: DivestScript;
  readonly dataURI: string; // API endpoint to query for user data from, e.g. balances
  readonly tokens: {
    readonly input: TokenInfo[]; // tokens the user will deposit to enter this opportunity, and receipt upon exiting
    readonly receipt: TokenInfo[]; // receipt tokens the user needs to exit this opportunity
    readonly rewards: TokenInfo[]; // rewards tokens the user may claim when exiting this opportunity
  };
  readonly strategy?: StrategyLeg[];
}

export interface ProtectionMarketInfo extends TokenInfo {
  readonly underlying: TokenInfo; // if `underlying.address === 0xEeee....EEeE`, underlying is ETH
  readonly trigger: string; // trigger contract address for protection markets, or zero address for money markets
  readonly investmentOpportunity?: InvestmentOpportunity; // details on how protected investing using this market
}

export interface ProtectionMarketList {
  readonly name: string;
  readonly timestamp: string;
  readonly version: Version;
  readonly markets: ProtectionMarketInfo[];
  readonly keywords?: string[];
  readonly tags?: Tags;
  readonly logoURI?: string;
}
