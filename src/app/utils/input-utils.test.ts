import { describe, it, expect } from 'vitest'
import { sanitize } from './input-utils'

describe('sanitize', () => {
  it('removes & from the string', () => {
    expect(sanitize('hello & world')).toBe('hello  world')
  })

  it('removes < and > from the string', () => {
    expect(sanitize('<tag>')).toBe('tag')
  })

  it('removes double and single quotes', () => {
    expect(sanitize('"hello" \'world\'')).toBe('hello world')
  })

  it('removes forward slash', () => {
    expect(sanitize('a/b/c')).toBe('abc')
  })

  it('removes multiple special characters', () => {
    expect(sanitize('&<>"\'/')).toBe('')
  })

  it('returns the same string if no special characters', () => {
    expect(sanitize('Rick and Morty')).toBe('Rick and Morty')
  })

  it('preserves spaces', () => {
    expect(sanitize('Rick & Morty <is> "cool"')).toBe('Rick  Morty is cool')
  })

  it('works with empty string', () => {
    expect(sanitize('')).toBe('')
  })

  it('works with only special characters', () => {
    expect(sanitize('&<>"\'/')).toBe('')
  })
})
