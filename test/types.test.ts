import { MarketList } from '../src';
import exampleList from './schema/example.marketlist.json';

describe('types', () => {
  it('matches example schema', () => {
    // this is enough--typescript won't cast it unless it matches the interface
    const list = exampleList as MarketList;

    expect(list.name).toEqual('My Market List');
  });
});
