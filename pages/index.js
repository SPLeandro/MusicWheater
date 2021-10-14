import { Flex, Box, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Heading, Text, Link } from "@chakra-ui/react"
import {FindByCityName, FindByCityId, FindByCoords, FindByZipcode} from '../src/components';
import { MusicList } from '../src/components';

export default function Home() {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Box p={4}>
        <Box py={4} textAlign="center">
          <Heading fontSize="2xl">Music Wheater</Heading>
          <Text>Pesquise por um lugar e receba sugestões de músicas de acordo com a temperatura da cidade</Text>
          <Link color="blue.400" fontSize="md" href="/favs">
           Playlist Salvas
          </Link>
        </Box>
        <Tabs>
            <TabList>
              <Tab>City</Tab>
              <Tab>Code</Tab>
              <Tab>Coords</Tab>
              <Tab>Zipcode</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <FindByCityName />
              </TabPanel>

              <TabPanel>
                <FindByCityId />
              </TabPanel>

              <TabPanel>
                <FindByCoords />
              </TabPanel> 

              <TabPanel>
                <FindByZipcode />
              </TabPanel>
            </TabPanels>
        </Tabs>
      </Box>
      <Divider />
      <Box>
        <MusicList />
      </Box>
    </Flex>
  )
}
