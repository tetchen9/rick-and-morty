import NextImage from 'next/image'
import { Box, BoxProps as ChakraBoxProps } from '@chakra-ui/react'

interface ChakraNextImageProps extends Omit<ChakraBoxProps, 'src' | 'alt'> {
  src: string
  alt: string
}

/**
 * ChakraNextImage is a wrapper around NextImage that allows for 
 * the use of Chakra UI's props.
 * @param src - The source of the image.
 * @param alt - The alt text of the image.
 * @param chakraProps - The props of the Chakra UI Box component.
 * @returns A Chakra UI Box component with a NextImage component inside it.
 */
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
