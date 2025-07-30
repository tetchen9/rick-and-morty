import NextImage from 'next/image'
import { Box, BoxProps as ChakraBoxProps } from '@chakra-ui/react'

interface ChakraNextImageProps extends Omit<ChakraBoxProps, 'src' | 'alt'> {
  src: string
  alt: string
}

const ChakraNextImage = ({ src, alt, ...chakraProps }: ChakraNextImageProps) => {
  const { borderRadius } = chakraProps
  const imageBorderRadius = borderRadius === 'full' ? '50%' : borderRadius === 'lg' ? '10px' : undefined
  
  return (
    <Box position="relative" {...chakraProps}>
      <NextImage
        src={src}
        alt={alt}
        height={300}
        width={300}
        style={{ 
          objectFit: 'cover',
          borderRadius: imageBorderRadius
        }}
      />
    </Box>
  )
}

export default ChakraNextImage
