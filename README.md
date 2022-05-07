# Bits-Flag

## 简介
> 基于位运算的高性能标志管理

## 使用
```typescript
    import { BitsFlag } from 'bits-flag'

    const bits = new BitsFlag<'a' | 'b'>()

    bits.add('a')

    bits.has('a')

    bits.delete('a')

    bits.clear()
    
    bits.reset()
```
