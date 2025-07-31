import NextImage from 'next/image'
import { Box, BoxProps as ChakraBoxProps } from '@chakra-ui/react'

type ChakraNextImageProps = Omit<ChakraBoxProps, 'src' | 'alt'> & {
  src: string
  alt: string
}

/**
 * ChakraNextImage is a wrapper around NextImage that allows for 
 * the use of Chakra UI's props.
 * @param src - the source of the image.
 * @param alt - the alt text of the image.
 * @param chakraProps - the props of the Chakra UI Box component.
 * @returns a Chakra UI Box component with a NextImage component inside it.
 */
const ChakraNextImage = ({ src, alt, ...chakraProps }: ChakraNextImageProps): React.JSX.Element => {
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
