// index.test.ts

import assert from 'assert'
import { BitsFlag } from '../src'

describe('validate:', () => {
  describe('BitsFlag', () => {
    const bits = new BitsFlag<'a' | 'b' | 'c' | 'd'>()
    test('has a', () => {
      bits.add('a')
      assert.strictEqual(bits.has('a'), true)
      assert.strictEqual(bits.has('b'), false)
    })
    test('has a,has b', () => {
      bits.add('b')
      assert.strictEqual(bits.has('a'), true)
      assert.strictEqual(bits.has('b'), true)
    })
    test('delete a,has b', () => {
      bits.delete('a')
      assert.strictEqual(bits.has('a'), false)
      assert.strictEqual(bits.has('b'), true)
    })
    test('clear', () => {
      bits.add('c')
      bits.clear()
      assert.strictEqual(bits.has('a'), false)
      assert.strictEqual(bits.has('c'), false)
    })
    test('reset', () => {
      bits.add('d')
      bits.reset()
      assert.strictEqual(bits.has('a'), false)
      assert.strictEqual(bits.has('d'), false)
    })
  })
})
