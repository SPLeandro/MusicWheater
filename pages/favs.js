import React, {useState, useEffect } from 'react';
import { Center, Flex, Box, VStack, Divider, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Text, Link} from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import {MusicItem} from '../src/components';

const DatePlaylist = ({date}) => (
    <Accordion defaultIndex={[]} allowMultiple>
        {date.map((playlist, index) => {
            return (
                <AccordionItem key={index}>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {index + 1} - {playlist.city == '' ? 'Unknow' : playlist.city}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Text>Cidade: {playlist.city}</Text>
                        <Text>Temperatura: {playlist.temp} ºC</Text>
                        <Text>Categoria: {playlist.genre}</Text>
                        <Divider my={2} />
                        <VStack spacing={2}>
                            <Heading fontSize="md">Playlist salva</Heading>
                            {playlist.tracks.map(track => (
                                <MusicItem track={track} key={track.key} />
                            ))}
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            )
        })}
    </Accordion>
);

export default function Favs(){

    const [savedPlaylists, setSavedPlaylists] = useState(null);

    const getSavedPlaylist = () => {
        let savedPlaylists = localStorage.getItem('@music-wheater/saved-playlists');   
        if (!savedPlaylists){
            savedPlaylists = null;
            return
        }

        savedPlaylists = JSON.parse(savedPlaylists);
        //GET ARRAY DATES AND FORMAT DATE TO YYYY-MM-DD;
        let dates = []; 
        savedPlaylists.map(playlist => {
            const parsedDate = playlist.searchDate.slice(0, 10);
            dates.includes(parsedDate) ? '' : dates.push(parsedDate);
            return playlist.searchDate = parsedDate;
        });      
        dates.sort().reverse();
        const orderedByDate = dates.map(date => savedPlaylists.filter(playlist => playlist.searchDate === date));
        setSavedPlaylists(orderedByDate);
    }

    useEffect(()=> {
        getSavedPlaylist();
    },[]);

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