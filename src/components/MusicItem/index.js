import React from'react';
import { Flex, VStack, HStack, Image, Text, Link } from '@chakra-ui/react';
import { MdPlayCircleOutline } from 'react-icons/md';

export const MusicItem = ({track}) => {
    return (
        <Flex justifyContent="space-between" alignItems="center" w="100%">
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
    )
}