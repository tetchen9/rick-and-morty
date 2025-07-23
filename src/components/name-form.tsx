'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Flex,
  Stack,
  Text,
  Input,
  Button,
} from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'

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
      <form onSubmit={handleSubmit} >
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
            <Input
              type={'text'}
              placeholder={'Alice'}
              value={name}
              onChange={e => {
                setName(e.target.value)
                if (error) setError('')
              }}
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              rounded={'full'}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
            />
            <Input
              type={'text'}
              placeholder={'Engineer'}
              value={role}
              onChange={e => {
                setRole(e.target.value)
                if (error) setError('')
              }}
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              rounded={'full'}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
            />
            {error && (
              <Text color="red.400" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}
            <Button
              type="submit"
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              flex={'1 0 auto'}
              _hover={{ bg: 'blue.500' }}
              _focus={{ bg: 'blue.500' }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  )
}
