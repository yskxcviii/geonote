/**
 * 任意の関数を実行する (即時関数の可読性向上のため)
 *
 * @param func 任意の関数
 * @returns
 */
export const scoped = <T = void>(func: () => T): T => {
  return func()
}
