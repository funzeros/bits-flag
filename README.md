# BitsFlag

## 简介
> 基于位运算的~~高性能~~标记管理器
> 测试覆盖率 **100%**
> 支持 **typescript**

## 使用

### 1. 动态使用-动态值
> 每一个标记的值不固定，根据使用顺序自动生成。
> 适用于不在乎标记值，不需要多实例交互的场景。
```typescript
    import { BitsFlag } from 'bits-flag'

    const bits = new BitsFlag<'a' | 'b'>()

    bits.add('a')

    bits.has('a')

    bits.delete('a')

    bits.clear()
```

### 2. 静态使用-动态值
> 根据传入枚举顺序生成标记值，只要枚举顺序相同，值就相同。
> 适用于不在乎标记值，但需要多实例交互的场景。
```typescript
    import { BitsFlag } from 'bits-flag'

    const dict = { a: 'a', b: 'b' }

    const oldIns = BitsFlag.create(dict)

    oldIns.add('a')

    const newIns = BitsFlag.create(dict).setStatus(oldIns.getStatus())

    newIns.add('b')

    newIns.has('a') // true
```

### 3. 静态使用-静态值
> 直接使用传入枚举的键值作为标记和值。
> 适用于在乎标记值，且需要多实例交互的场景。
```typescript
    import { BitsFlag } from 'bits-flag'

    const oldDict = { a: 10, b: 20 }

    const oldIns = BitsFlag.create(oldDict,true)

    oldIns.add('a')

    const newDict = { b: 20, a:10 }

    const newIns = BitsFlag.create(newDict,true).setStatus(oldIns.getStatus())

    newIns.add('b')

    newIns.has('a') // true
```
