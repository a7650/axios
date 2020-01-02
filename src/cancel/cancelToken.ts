import { CancelExecutor } from '../types'

interface resolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  public promise: Promise<string>
  public reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: resolvePromise
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) return
      this.reason = message || 'canceled'
      resolvePromise(this.reason)
    })
  }
}
