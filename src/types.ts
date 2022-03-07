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

export interface InvestmentOpportunity {
  readonly divest: DivestScript;
  readonly dataURI: string; // API endpoint to query for user data from, e.g. balances
  readonly invest: InvestScript;
  readonly logoURI?: string;
  readonly strategy?: StrategyLeg[];
  readonly tokens: {
    // arrays of token addresses, to be looked up in the `tokens` mapping
    readonly input: string[]; // token addresses the user will deposit to enter this opportunity, and receipt upon exiting
    readonly receipt: string[]; // receipt token addresses the user needs to exit this opportunity
    readonly rewards: string[]; // rewards token addresses the user may claim when exiting this opportunity
  };
}

// Parameters for investing into a protected investment.
//
// Example  'function invest(uint256[] calldata amounts) external payable'
//
//  The `tokens` property defines the  set of input tokens that can be used to deposit into this investment opportunity.
// The items in the function signature correspond to these `tokens`. For example, if we're investing in the 3Crypto pool,
// the `tokens` array would be [ETH, WBTC, USDT]. When calling `invest` on `address`, amounts[0] would correspond to the
// amount of ETH to invest, amounts[1] would correspond to the amount of WBTC to invest, etc. An amount of MAX_UINT256
// should be used to signal that you want to invest all tokens you have
export interface InvestScript {
  readonly address: string;
  readonly signature: string;
}

// Parameters for exiting a protected investment.
//
// Function signature meaning is analogous to `InvestScript`. The `amounts` and `claimRewards` parameters are uint256
// where zero means don't withdraw/claim anything and MAX_UINT256 means withdraw/claim all. Note that not all
// reward tokens will support arbitrary claim amounts. The `recipient` field specifies the address all output
// tokens and reward tokens should be sent to
export interface DivestScript {
  readonly address: string;
  readonly signature: string;
}

export interface StrategyLeg {
  readonly action: 'Borrow' | 'Swap to' | 'Deposit for' | 'Deposit to' | 'Stake on';
  readonly actionReceiver: string;
  readonly logoURI?: string;
  readonly platformId: number; // Platform ID of strategy target
  readonly token: string; // address of the token, to be looked up in the `tokens` mapping
}

export interface MarketList {
  readonly keywords?: string[];
  readonly logoURI?: string;
  readonly markets: MarketInfo[];
  readonly name: string;
  readonly tags?: Tags;
  readonly timestamp: string;
  readonly tokens: Record<string, TokenInfo>; // maps from checksummed token address to TokenInfo
  readonly version: Version;
}

export interface MarketInfo extends TokenInfo {
  readonly investmentOpportunity?: InvestmentOpportunity; // details on how protected investing using this market
  readonly trigger: string; // trigger contract address for protection markets, or zero address for money markets
  readonly underlying: string; // address of underlying, if `underlying === 0xEeee....EEeE`, underlying is ETH
}

export interface TokenInfo {
  readonly address: string;
  readonly chainId: number;
  readonly decimals: number;
  readonly extensions?: {
    readonly [key: string]: string | number | boolean | null;
  };
  readonly logoURI?: string;
  readonly name: string;
  readonly symbol: string;
  readonly tags?: string[];
}
