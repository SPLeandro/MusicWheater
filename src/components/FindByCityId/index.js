import React, {useState} from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useMusic } from "../../providers";
import { getWheaterByCityId, searchPlaylists } from '../../services';   

export const FindByCityId = () => {

    const toast = useToast();
    const {setLastSearch} = useMusic();

    const [loading, setLoading] = useState(false);
    const [cityId, setCityId] = useState('');

    const handleSubmit = async (cityId) => {
        try {
            setLoading(prevState => !prevState);
            const wheaterData = await getWheaterByCityId(cityId);
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
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(prevState => !prevState);
        }
    }

    return (
        <VStack spacing={4}>
            <FormControl id="city_id" isRequired>
                <FormLabel>ID da Cidade</FormLabel>
                <Input 
                    size="lg" type="text"
                    placeholder="Ex: 2172797"
                    value={cityId} onChange={e => setCityId(e.target.value)} 
                />
            </FormControl>
            <Button isLoading={loading} colorScheme="blue" width="100%" onClick={() => handleSubmit(cityId)}>
                Buscar
            </Button>
        </VStack>
    )
}