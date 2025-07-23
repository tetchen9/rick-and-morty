import { describe, it, expect } from 'vitest'
import { getDescription } from './character-utils'

describe('getDescription', () => {
  it('returns description with location and correct article for species starting with consonant', () => {
    expect(getDescription('Earth', 'Human')).toBe('A Human from Earth')
  })

  it('returns description with location and correct article for species starting with vowel', () => {
    expect(getDescription('Mars', 'alien')).toBe('An alien from Mars')
  })

  it('returns description without location', () => {
    expect(getDescription('', 'Human')).toBe('A Human')
  })

  it('returns description with unknown location', () => {
    expect(getDescription('unknown', 'Human')).toBe('A Human')
  })

  it('returns description with correct article for species starting with uppercase vowel', () => {
    expect(getDescription('Venus', 'Alien')).toBe('An Alien from Venus')
  })

  it('returns description with correct article for species starting with lowercase vowel', () => {
    expect(getDescription('Pluto', 'android')).toBe('An android from Pluto')
  })

  it('returns description with empty species', () => {
    expect(getDescription('Earth', '')).toBe('')
  })

  it('returns description with empty location and species', () => {
    expect(getDescription('', '')).toBe('')
  })

  it('returns description with location and species starting with "a"', () => {
    expect(getDescription('Citadel', 'ant')).toBe('An ant from Citadel')
  })

  it('returns description with location and species starting with "A"', () => {
    expect(getDescription('Citadel', 'Ant')).toBe('An Ant from Citadel')
  })
})
