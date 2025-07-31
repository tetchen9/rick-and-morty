type LocalStorageMock = {
    getItem: ReturnType<typeof vi.fn>
    setItem: ReturnType<typeof vi.fn>
    removeItem: ReturnType<typeof vi.fn>
    clear: ReturnType<typeof vi.fn>
  }
  
/**
 * Mock localStorage
 */
export const localStorageMock: LocalStorageMock = (function (): LocalStorageMock {
  let store: { [key: string]: string } = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      if (key in store) {
        const newStore: { [key: string]: string } = {}
        Object.keys(store).forEach(k => {
          if (k !== key) {
            newStore[k] = store[k]
          }
        })
        store = newStore
      }
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()
