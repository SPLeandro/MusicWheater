import React from'react';
import { Center, Box, Flex, VStack, HStack, List, ListItem, Button, Image, Heading, Text, Link } from '@chakra-ui/react';
import { MdPlayCircleOutline } from 'react-icons/md';
import { useMusic } from '../../providers';

export const MusicList = () => {

    const {playlist} = useMusic();

    if (playlist.length < 1){
        return (
            <Text>Faça uma busca para encontrar sugestões.</Text>
        )
    }

    return (
        <Center>
            <Box p={2}>
                <List spacing={2}>
                    <Heading fontSize="md">Playlist sugerida</Heading>
                    {playlist.map(track => (
                        <ListItem key={track.key}>
                            <Flex justifyContent="space-between" alignItems="center">
                                <HStack spacing={2} mr={8}>
                                    <Image
                                        boxSize="48px"
                                        borderRadius="lg"
                                        objectFit="cover"
                                        src={track.images.coverart}
                                        alt={track.title}
                                    />
                                    <VStack spacing={0} align="start">
                                        <Text noOfLines={1}>{track.title}</Text>
                                        <Text fontSize="xs" color="gray.500">{track.subtitle}</Text>
                                    </VStack>
                                </HStack> 
                                <Link href={track.url} target="_blank">
                                    <MdPlayCircleOutline size={24} />
                                </Link>                    
                            </Flex>
                        </ListItem>
                    ))}
                    <Center>
                        <Button colorScheme="blue" onClick={() => {}}>
                            Salvar Playlist
                        </Button>
                    </Center>
                </List>
            </Box>
        </Center>
    )
}