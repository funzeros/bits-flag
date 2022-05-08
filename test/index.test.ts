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
    test('create', () => {
      const ins = BitsFlag.create()
      assert.strictEqual(ins.has('a'), false)
      ins.add('a')
      assert.strictEqual(ins.has('a'), true)
    })
    test('static unuse value', () => {
      const dict = { a: 'a', b: 'b' }
      const oldIns = BitsFlag.create(dict)
      oldIns.add('a')
      const newIns = BitsFlag.create(dict).setStatus(oldIns.getStatus())
      newIns.add('b')
      assert.strictEqual(newIns.has('a'), true)
    })
    test('static use value', () => {
      const oldDict = { a: 10, b: 20 }
      const oldIns = BitsFlag.create(oldDict, true)
      oldIns.add('a')
      const newDict = { b: 20, a: 10 }
      const newIns = BitsFlag.create(newDict, true).setStatus(
        oldIns.getStatus(),
      )
      assert.strictEqual(newIns.has('a'), true)
    })
  })
})
