import React, {useState, useEffect } from 'react';
import { Center, Flex, Box, VStack, Divider, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Text } from '@chakra-ui/react';
import {MusicItem} from '../src/components';

export default function Favs(){

    const [savedPlaylists, setSavedPlaylists] = useState(null);

    useEffect(()=> {
        let savedPlaylists = localStorage.getItem('@music-wheater/saved-playlists');
        savedPlaylists ? savedPlaylists = JSON.parse(savedPlaylists) : savedPlaylists = null;
        setSavedPlaylists(savedPlaylists);
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
                <Heading fontSize="md" p={4}>Playlists Salvas Anteriormente</Heading>
                <Accordion defaultIndex={[]} allowMultiple>
                    {savedPlaylists.map(playlist => {
                        return (
                            <AccordionItem>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {playlist.searchDate}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel>
                                    <Text>Cidade: {playlist.city}</Text>
                                    <Text>Temperatura: {playlist.temp} ºC</Text>
                                    <Text>Gênero da playlist: {playlist.genre}</Text>
                                    <Divider my={2} />
                                    <VStack spacing={2}>
                                        <Heading fontSize="md">Playlist salva</Heading>
                                        {playlist.tracks.map(track => (
                                            <MusicItem track={track} />
                                        ))}
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </Box>
        </Flex>
    )
}