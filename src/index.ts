/**
 * @example
 * ```ts
 * const bits = new BitsFlag<'a'|'b'>()
 * ```
 *
 * @beta
 */

export class BitsFlag<T extends string | number | symbol> {
  private status = 0

  private count = 0

  private bits: Map<T, number> = new Map()

  private set(key: T, value?: number) {
    if (value) {
      this.bits.set(key, value)
      this.status = Math.max(...Array.from(this.bits.values())) + 1
      return
    }
    this.bits.set(key, 1 << ++this.count)
  }

  /**
   * 获取一个标记值
   * @param key - input string
   * @returns number
   * @description 非静态值的实例获取到的是经过位运算的标记值
   * @example
   * ```ts
   * bits.get('a')
   * ```
   *
   * @beta
   */
  public get(key: T) {
    if (!this.bits.has(key)) {
      this.set(key)
    }
    return this.bits.get(key) as number
  }

  /**
   * 添加一个标记
   * @param key - input string
   * @returns BitsFlag
   * @example
   * ```ts
   * bits.add('a')
   * ```
   *
   * @beta
   */
  public add(key: T) {
    this.status |= this.get(key)
    return this
  }

  /**
   * 检测标记存在与否
   * @param key - input string
   * @returns boolean
   * @example
   * ```ts
   * bits.has('a')
   * ```
   *
   * @beta
   */
  public has(key: T) {
    return Boolean(this.status & this.get(key))
  }

  /**
   * 删除一个标记
   * @param key - input string
   * @returns BitsFlag
   * @example
   * ```ts
   * bits.delete('a')
   * ```
   *
   * @beta
   */
  public delete(key: T) {
    this.status &= ~this.get(key)
    return this
  }

  /**
   * 重置状态
   * @returns BitsFlag
   * @example
   * ```ts
   * bits.clear()
   * ```
   *
   * @beta
   */
  public clear() {
    this.status = 0
    return this
  }

  /**
   * 获取状态
   * @returns number
   * @example
   * ```ts
   * bits.getStatus()
   * ```
   *
   * @beta
   */
  public getStatus() {
    return this.status
  }

  /**
   * 设置状态
   * @param status - input number
   * @returns BitsFlag
   * @example
   * ```ts
   * bits.setStatus()
   * ```
   *
   * @beta
   */
  public setStatus(status: number) {
    this.status = status
    return this
  }

  /**
   * 静态创建
   * @param enums - input enum object
   * @param useValue - input boolean
   * @description useValue为是否使用枚举值，为true时enums枚举对象的值必须为数字类型
   * @returns BitsFlag
   * @example
   * ```ts
   * BitsFlag.create({a:1,b:2},true)
   * BitsFlag.create({a:'A',b:'B'})
   * ```
   *
   * @beta
   */
  public static create<T extends CreateEnums<R>, R extends boolean>(
    enums?: T,
    useValue?: R,
  ) {
    const instance = new BitsFlag<keyof T>()
    if (!enums) return instance
    if (useValue) {
      Object.keys(enums).forEach(key => {
        instance.set(key, enums[key])
      })
    } else {
      Object.keys(enums).forEach(key => {
        instance.set(key)
      })
    }
    return instance
  }
}
interface CreateEnums<R> {
  [k: string]: R extends true ? number : any
}
