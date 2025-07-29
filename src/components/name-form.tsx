'use client'

import { ReactElement, useState } from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useUser } from 'context/user-context'
import TextInput from 'components/ui/text-input'
import Button from 'components/ui/button'
import { useColorModeValue } from 'components/ui/color-mode'
import { sanitize } from 'app/utils/input-utils'
import { UserInfo } from 'types/user-info'

type NameFormProps = {
  user?: UserInfo
}

const NameForm = ({ user }: NameFormProps): ReactElement => {
  const router = useRouter()
  const [name, setName] = useState(user?.name || '')
  const [role, setRole] = useState(user?.role || '')
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
