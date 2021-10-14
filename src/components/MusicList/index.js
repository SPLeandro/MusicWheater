import React, {useState} from'react';
import { Center, Box, List, ListItem, Button, Heading, Text } from '@chakra-ui/react';
import { useMusic } from '../../providers';
import { MusicItem } from '../MusicItem';

export const MusicList = () => {

    const [loading, setLoading] = useState(false);
    const {lastSearch, savePlaylist} = useMusic();

    const handleSavePlaylist = async () => {
        try {
            setLoading(prevState => !prevState);
            await savePlaylist();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(prevState => !prevState);
        }
    }

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
                        <Button isLoading={loading} colorScheme="blue" onClick={() => handleSavePlaylist()}>
                            Salvar Playlist
                        </Button>
                    </Center>
                </List>
            </Box>
        </Center>
    )
}