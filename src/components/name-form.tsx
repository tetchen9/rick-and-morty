'use client'

import { ReactElement, useState } from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useUser } from 'context/user-context'
import TextInput from 'components/ui/text-input'
import Button from 'components/ui/button'
import { useColorModeValue } from 'components/ui/color-mode'
import { sanitize } from 'app/utils/input-utils'

const NameForm = (): ReactElement => {
  const router = useRouter()
  const { user, setUser } = useUser()
  const [name, setName] = useState(user?.name || '')
  const [role, setRole] = useState(user?.role || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = (): string | null => {
    if (!name.trim()) {
      return 'Please enter your name.'
    }
    if (!role.trim()) {
      return 'Please enter your job title.'
    }
    return null
  }

  const handleNavigation = () => {
    let returnTo: string | null = null
    if (typeof window !== 'undefined') {
      returnTo = sessionStorage.getItem('returnTo')
      if (returnTo) sessionStorage.removeItem('returnTo')
    }
    router.push(returnTo || '/characters/1')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setUser({ name: name.trim(), role: role.trim() })
    
    handleNavigation()
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
            aria-label='Username'
            onChange={e => {
              setName(sanitize(e.target.value))
              if (error) setError('')
            }} 
            autoFocus
          />
          <TextInput
            placeholder={'Engineer'}
            value={role}
            aria-label='Job title'
            onChange={e => {
              setRole(sanitize(e.target.value))
              if (error) setError('')
            }} />
          {error && (
            <Text color="red.400" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}
          <Button loading={loading} type='submit'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>

  )
}


export default NameForm
