'use client'

import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUser } from 'context/user-context'
import TextInput from './ui/text-input'
import Button from './ui/button'
import { useColorModeValue } from './ui/color-mode'
import { sanitize } from 'app/utils/input-utils'

export default function NameForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUser()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!role.trim()) {
      setError('Please enter your job title.')
      return
    }
    setError('')
    setUser({ name: name.trim(), role: role.trim() })
    router.push('/characters/1')
    setLoading(!loading)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        boxShadow={'xl'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'xl'}
        p={10}
        my={16}
        gap={8}
        align={'center'}>
        <Text 
          fontSize={'lg'} 
          color={useColorModeValue('gray.500', 'gray.300')}>
            Pluto is a planet, who are you?
        </Text>
        <Stack gap={4} direction={'column'} w={'full'}>
          <TextInput
            placeholder={'Alice'}
            value={name}
            onChange={e => {
              setName(sanitize(e.target.value))
              if (error) setError('')
            }} />
          <TextInput
            placeholder={'Engineer'}
            value={role}
            onChange={e => {
              setRole(sanitize(e.target.value))
              if (error) setError('')
            }} />
          {error && (
            <Text color="red.400" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}
          <Button loading={loading}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>

  )
}
