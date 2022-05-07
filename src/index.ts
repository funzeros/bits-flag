/**
 * @example
 * ```ts
 * const bits = new BitsFlag<'a'|'b'>()
 * ```
 *
 * @beta
 */

export class BitsFlag<T extends string> {
  private status = 0

  private count = 0

  private bits: Map<T, number> = new Map()

  private set(key: T) {
    this.bits.set(key, 1 << ++this.count)
  }

  private get(key: T) {
    if (!this.bits.has(key)) {
      this.set(key)
    }
    return this.bits.get(key) as number
  }

  /**
   * 添加一个状态
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
   * 检测状态存在与否
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
   * 删除一个状态
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
   * 初始化
   * @returns BitsFlag
   * @example
   * ```ts
   * bits.reset()
   * ```
   *
   * @beta
   */
  public reset() {
    this.status = 0
    this.count = 0
    this.bits.clear()
    return this
  }
}
