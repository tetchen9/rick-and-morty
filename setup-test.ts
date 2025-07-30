import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"
import "@testing-library/jest-dom/vitest"
import { JSDOM } from "jsdom"
import ResizeObserver from "resize-observer-polyfill"
import { vi } from "vitest"
import "vitest-axe/extend-expect"

afterEach(() => {
    cleanup()
})

const { window } = new JSDOM()

// ResizeObserver mock
vi.stubGlobal("ResizeObserver", ResizeObserver)
window["ResizeObserver"] = ResizeObserver

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock)
window["IntersectionObserver"] = IntersectionObserverMock

// Scroll Methods mock
window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}


// Polyfill matchMedia for Chakra UI color mode support
if (!window.matchMedia) {
  window.matchMedia = function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () { return false; }
    }
  }
}

// requestAnimationFrame mock
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)

// URL object mock
window.URL.createObjectURL = () => "https://i.pravatar.cc/300"
window.URL.revokeObjectURL = () => {}

// navigator mock
Object.defineProperty(window, "navigator", {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

// Override globalThis
Object.assign(global, { window, document: window.document })

// mock sessionStorage and localStorage for all tests
function mockStorage(target: any) {
  Object.defineProperty(target, 'sessionStorage', {
    configurable: true,
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    },
  });
  Object.defineProperty(target, 'localStorage', {
    configurable: true,
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    },
  });
}

mockStorage(globalThis);
if (typeof window !== 'undefined') {
  mockStorage(window);
}

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: function MockImage({ src, alt, fill, ...props }: any) {
    const { createElement } = require('react')
    // Filter out Next.js specific props that don't work with regular img
    const { width, height, quality, priority, ...imgProps } = props
    return createElement('img', { src, alt, ...imgProps })
  },
}))


beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      },
      writable: true,
    })
  })