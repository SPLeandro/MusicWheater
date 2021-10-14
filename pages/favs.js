import React, {useState, useEffect } from 'react';
import { Center, Flex, Box, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Text, Link} from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import { DatePlaylist } from '../src/components';
import { useMusic } from '../src/providers';

export default function Favs(){

    const { reloadSavedPlaylist } = useMusic();
    const [savedPlaylists, setSavedPlaylists] = useState(null);

    const getSavedPlaylist = () => {
        let savedPlaylists = JSON.parse(localStorage.getItem('@music-wheater/saved-playlists'));   
        const originalPlaylists = savedPlaylists;

        if (!savedPlaylists){
            savedPlaylists = null;
            return
        }

        //GET ARRAY DATES AND FORMAT DATE TO YYYY-MM-DD;
        let dates = []; 
        savedPlaylists.map(playlist => {
            const parsedDate = playlist.searchDate.slice(0, 10);
            dates.includes(parsedDate) ? '' : dates.push(parsedDate);
            return playlist.searchDate = parsedDate;
        });      
        dates.sort().reverse();
        
        const orderedByDate = dates.map(date => originalPlaylists.filter(playlist => playlist.searchDate.includes(date)));
        setSavedPlaylists(orderedByDate);
    }

    useEffect(()=> {
        getSavedPlaylist();
    },[reloadSavedPlaylist]);

    if (savedPlaylists == null) {   
        return (
            <Center>
                Não há nenhuma playlist salva.
            </Center>
        )
    }
    
    return (
        <Flex flexDirection="column" alignItems="center" py={8}>
            <Box border="1px" borderColor="gray.200" borderRadius={8}>
                <VStack p={4} alignItems="start">
                    <Link color="blue.400" fontSize="sm" href="/" display="flex" alignItems="center">
                        <MdArrowBack /> 
                        <Text ml={2}>Página Inicial</Text>
                    </Link>
                    <Heading fontSize="md">
                        Playlists Salvas
                    </Heading>
                </VStack>
                <Accordion defaultIndex={[]} allowMultiple>
                    {savedPlaylists.map((date, index)=> {
                        return (
                            <AccordionItem key={index}>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {
                                            /*FORMAT DATE "YYYY-MM-DD" TO "DD/MM/YYYY"*/
                                            date[0].searchDate.slice(8,10)}/{date[0].searchDate.slice(5,7)}/{date[0].searchDate.slice(0,4)
                                        }                                  
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>   
                                    <Heading fontSize="sm" pb={2}>Playlists salvas no dia</Heading>                                
                                    <DatePlaylist date={date} />
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </Box>
        </Flex>
    )
}