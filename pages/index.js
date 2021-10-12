import { Flex, Box, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Heading, Text } from "@chakra-ui/react"
import {FindByCityName, FindByCityId, FindByCoords, FindByZipcode} from '../src/components';
import { MusicList } from '../src/components';

export default function Home() {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Box p={4}>
        <Box py={4}>
          <Heading fontSize="2xl" textAlign="center">Music Wheater</Heading>
          <Text textAlign="center">Pesquise por um lugar e receba sugestões de músicas de acordo com a temperatura da cidade</Text>
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
