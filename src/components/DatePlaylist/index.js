import React, { useState } from 'react';
import { Box, VStack, Divider, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { MusicItem } from '../MusicItem';
import { useMusic  } from '../../providers';

export const DatePlaylist = ({date}) => {

    const toast = useToast();
    const {removePlaylist} = useMusic();

    const [loading, setLoading] = useState(false);

    const handleRemovePlaylist = async (playlist) => {
        try {
            setLoading(prevState => !prevState);
            await removePlaylist(playlist);
            toast({
                title: 'Sucesso',
                description: 'Playlist deletada com sucesso!',
                position: 'top',
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Houve um problema',
                description: error.message || 'Erro não especificado',
                position: 'top',
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(prevState => !prevState);
        }
    }

    return (
        <Accordion defaultIndex={[]} allowMultiple>
            {date?.map((playlist, index) => {
                return (
                    <AccordionItem key={index}>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" mr={4}>
                                {index + 1} - {playlist.city == '' ? 'Unknow' : playlist.city}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <VStack spacing={0} alignItems="start">
                                <Text>Cidade: {playlist.city}</Text>
                                <Text>Temperatura: {playlist.temp} ºC</Text>
                                <Text>Categoria: {playlist.genre}</Text>
                                <Button isLoading={loading} size="sm" alignSelf="center" colorScheme="red" onClick={() => handleRemovePlaylist(playlist)}>
                                    Apagar Playlist
                                </Button>
                            </VStack>
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
    )
}