import { ProtectionMarketList } from '../src';
import exampleList from './schema/example.protectionmarketlist.json';

describe('types', () => {
  it('matches example schema', () => {
    // this is enough--typescript won't cast it unless it matches the interface
    const list: ProtectionMarketList = exampleList;

    expect(list.name).toEqual('My Protection Market List');
  });
});
