import React, {useState} from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react"
import { useMusic } from "../../providers";
import { getWheaterByZipCode, searchPlaylists } from '../../services';

export const FindByZipcode = () => {

    const toast = useToast();
    const {setLastSearch} = useMusic();

    const [loading, setLoading] = useState(false);
    const [zipcode, setZipcode] = useState('');
    
    const handleSubmit = async (zipcode) => {
        try {
            setLoading(prevState => !prevState);
            const wheaterData = await getWheaterByZipCode(zipcode);
            const {name: city} = wheaterData;
            const {temp} = wheaterData.main;
            const playlist = await searchPlaylists(temp);
            setLastSearch({
                searchDate: new Date().toISOString(),
                temp,
                city,
                ...playlist
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
        <VStack spacing={4}>
            <FormControl id="zipcode" isRequired>
                <FormLabel>Zipcode</FormLabel>
                <Input 
                    size="lg" type="text" 
                    placeholder="Ex: 94040"
                    value={zipcode} onChange={e => setZipcode(e.target.value)} 
                />
            </FormControl>
            <Button isLoading={loading} colorScheme="blue" width="100%" onClick={() => handleSubmit(zipcode)}>
                Buscar
            </Button>
        </VStack>  
    )
}