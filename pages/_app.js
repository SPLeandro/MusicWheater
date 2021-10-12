import { ChakraProvider } from "@chakra-ui/react"
import { MusicProvider } from '../src/providers';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MusicProvider>
        <Component {...pageProps} />
      </MusicProvider>
    </ChakraProvider>
  )  
}

export default MyApp;
