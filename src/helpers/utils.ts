const _toString = Object.prototype.toString

const typeClass = {
  date: '[object Date]',
  object: '[object Object]'
}

export function isDate(val: any): val is Date {
  return _toString.call(val) === typeClass['date']
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return _toString.call(val) === typeClass['object']
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
