import Ajv from 'ajv';
import { schema } from '../src';
import exampleList from './schema/example.protectionmarketlist.json';
import exampleNameSymbolSpecialCharacters from './schema/example-name-symbol-special-characters.protectionmarketlist.json';
import bigExampleList from './schema/bigexample.protectionmarketlist.json';
import exampleListMinimum from './schema/exampleminimum.protectionmarketlist.json';
import emptyList from './schema/empty.protectionmarketlist.json';
import bigWords from './schema/bigwords.protectionmarketlist.json';
import invalidTokenAddress1 from './schema/invalidtokenaddress.1.protectionmarketlist.json';
import invalidTokenAddress2 from './schema/invalidtokenaddress.2.protectionmarketlist.json';
import invalidTriggerAddress from './schema/invalidtriggeraddress.protectionmarketlist.json';
import invalidTimestamp from './schema/invalidtimestamp.protectionmarketlist.json';
import invalidLogoURI1 from './schema/invalidlogouri.1.protectionmarketlist.json';
import invalidLogoURI2 from './schema/invalidlogouri.2.protectionmarketlist.json';
import invalidVersion1 from './schema/invalidversion.1.protectionmarketlist.json';
import invalidVersion2 from './schema/invalidversion.2.protectionmarketlist.json';
import invalidVersion3 from './schema/invalidversion.3.protectionmarketlist.json';
import invalidDecimals1 from './schema/invaliddecimals.1.protectionmarketlist.json';
import invalidNumTags from './schema/invalidNumTags.protectionmarketlist.json';
import invalidDecimals2 from './schema/invaliddecimals.2.protectionmarketlist.json';
import invalidDecimals3 from './schema/invaliddecimals.3.protectionmarketlist.json';
import invalidDecimals4 from './schema/invaliddecimals.4.protectionmarketlist.json';
import extensionsValid from './schema/extensions-valid.protectionmarketlist.json';
import extensionsInvalid from './schema/extensions-invalid.protectionmarketlist.json';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validator = ajv.compile(schema);

describe('schema', () => {
  it('is valid', () => {
    expect(ajv.validateSchema(schema)).toEqual(true);
  });

  function checkSchema(schema: any, valid: boolean): void {
    const isValid = validator(schema);
    expect(validator.errors).toMatchSnapshot();
    expect(isValid).toEqual(valid);
  }

  it('works for example schema', () => {
    checkSchema(exampleList, true);
  });

  it('works for special characters schema', () => {
    checkSchema(exampleNameSymbolSpecialCharacters, true);
  });

  it('works for big example schema', () => {
    checkSchema(bigExampleList, true);
  });

  it('minimum example schema', () => {
    checkSchema(exampleListMinimum, true);
  });

  it('requires name, timestamp, version, tokens', () => {
    checkSchema({}, false);
  });

  it('empty list fails', () => {
    checkSchema(emptyList, false);
  });

  it('fails with big names', () => {
    checkSchema(bigWords, false);
  });

  it('checks token address', () => {
    checkSchema(invalidTokenAddress1, false);
    checkSchema(invalidTokenAddress2, false);
  });

  it('checks trigger address', () => {
    checkSchema(invalidTriggerAddress, false);
  });

  it('invalid timestamp', () => {
    checkSchema(invalidTimestamp, false);
  });

  it('invalid logo URI', () => {
    checkSchema(invalidLogoURI1, false);
    checkSchema(invalidLogoURI2, false);
  });

  it('invalid decimals', () => {
    checkSchema(invalidDecimals1, false);
    checkSchema(invalidDecimals2, false);
    checkSchema(invalidDecimals3, false);
    checkSchema(invalidDecimals4, false);
  });

  it('invalid number of tags on token', () => {
    checkSchema(invalidNumTags, false);
  });

  it('checks version', () => {
    checkSchema(invalidVersion1, false);
    checkSchema(invalidVersion2, false);
    checkSchema(invalidVersion3, false);
  });

  it('checks extensions', () => {
    checkSchema(extensionsValid, true);
    checkSchema(extensionsInvalid, false);
  });

  it('allows up to 10k tokens', () => {
    const exampleListWith10kTokens = {
      ...exampleList,
      markets: [...Array(10000)].map(() => exampleList.markets[0]),
    };
    checkSchema(exampleListWith10kTokens, true);
  });

  it('fails with 10001 tokens', () => {
    const exampleListWith10kTokensPlusOne = {
      ...exampleList,
      markets: [...Array(10001)].map(() => exampleList.markets[0]),
    };
    checkSchema(exampleListWith10kTokensPlusOne, false);
  });
});
