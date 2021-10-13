import React from'react';
import { Center, Box, List, ListItem, Button, Heading, Text } from '@chakra-ui/react';
import { useMusic } from '../../providers';
import { MusicItem } from '../MusicItem';

export const MusicList = () => {

    const {lastSearch, handleSavePlaylist} = useMusic();

    if (lastSearch.tracks.length < 1){
        return (
            <Text>Faça uma busca para encontrar sugestões.</Text>
        )
    }

    return (
        <Center>
            <Box p={2}>
                <List spacing={2}>
                    <Heading fontSize="md">Playlist sugerida</Heading>
                    {lastSearch.tracks.map(track => (
                        <ListItem key={track.key}>
                            <MusicItem track={track} />
                        </ListItem>
                    ))}
                    <Center>
                        <Button colorScheme="blue" onClick={() => handleSavePlaylist()}>
                            Salvar Playlist
                        </Button>
                    </Center>
                </List>
            </Box>
        </Center>
    )
}