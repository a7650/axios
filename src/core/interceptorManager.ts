import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(Interceptor => {
      if (Interceptor !== null) {
        fn(Interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors) {
      this.interceptors[id] = null
    }
  }
}
