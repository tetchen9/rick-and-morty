'use client'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TextInput from './ui/text-input'
import Button from './ui/button'
import { useColorModeValue } from './ui/color-mode'


export default function NameForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

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
    router.push('/characters/1')
  }

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      py={12}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <form onSubmit={handleSubmit}>
        <Stack
          boxShadow={'xl'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          p={10}
          gap={8}
          align={'center'}>
          <Stack align={'center'} gap={2}>
            <Text fontSize={'lg'} color={'gray.500'}>
              Tell us who you are
            </Text>
          </Stack>
          <Stack gap={4} direction={'column'} w={'full'}>
            <TextInput
              placeholder={'Alice'}
              value={name}
              onChange={e => {
                setName(e.target.value)
                if (error) setError('')
              }} />
            <TextInput
              placeholder={'Engineer'}
              value={role}
              onChange={e => {
                setRole(e.target.value)
                if (error) setError('')
              }} />
            {error && (
              <Text color="red.400" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}
            <Button>Submit</Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  )
}
