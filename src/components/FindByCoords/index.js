import React, {useState} from 'react';
import { VStack, FormControl, FormLabel, InputGroup, Input, InputLeftAddon, Button, useToast } from "@chakra-ui/react";
import { useMusic } from "../../providers";
import { getWheaterByGeoCoords, searchPlaylists } from '../../services';   

export const FindByCoords = () => {

    const toast = useToast();
    const {setLastSearch} = useMusic();

    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleSubmit = async (lat, long) => {
        try {
            setLoading(prevState => !prevState);
            const wheaterData = await getWheaterByGeoCoords(lat, long);
            const {name: city} = wheaterData;
            const {temp} = wheaterData.main;
            const playlist = await searchPlaylists(temp);
            setLastSearch({
                searchDate: new Date().toISOString(),
                temp,
                city,
                ...playlist
            }); 
        } catch (error){
            toast({
                title: 'Houve um problema',
                description: error.message || 'Erro não especificado',
                position: 'top',
                status: "error",isClosable: true,
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(prevState => !prevState);
        }
    }

    return (
        <VStack spacing={4}>
            <FormControl id="lat" isRequired>
                <FormLabel>Latitude</FormLabel>
                <InputGroup>
                    <InputLeftAddon> Y </InputLeftAddon>
                    <Input 
                        type="text"
                        placeholder="Ex: 40.77441100"
                        value={latitude} onChange={e => setLatitude(e.target.value)}
                    />
                </InputGroup>
            </FormControl>

            <FormControl id="long" isRequired>
                <FormLabel>Longitude</FormLabel>
                <InputGroup>
                <InputLeftAddon> X </InputLeftAddon>
                    <Input 
                        type="text"
                        placeholder="Ex: -73.97951000"
                        value={longitude} onChange={e => setLongitude(e.target.value)}
                    />
                </InputGroup>
            </FormControl>
            <Button isLoading={loading} colorScheme="blue" width="100%" onClick={() => handleSubmit(latitude, longitude)}>
                Buscar
            </Button>
        </VStack>
    )

}