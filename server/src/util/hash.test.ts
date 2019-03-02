import { expect } from 'chai';
import { hash, compare } from './hash';

describe('hash.ts: basic', () => {
  it('compare should validate hash and original string', async () => {
    const str = 'superSecretPassword';
    let hashed: string = await hash(str);
    expect(hashed !== str).to.equal(true, 'hash should be diff from input');
    expect(await compare(str, hashed)).to.equal(true, 'compare should return true when used with correct input');
    expect(await compare('hello', hashed)).to.equal(false, 'compare should return false when used with incorrect input');
    return;
  })
})
