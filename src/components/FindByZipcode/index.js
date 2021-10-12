import React, {useState} from 'react';
import { VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { useMusic } from "../../providers";
import { getWheaterByZipCode, searchPlaylists } from '../../services';

export const FindByZipcode = () => {

    const {setPlaylist} = useMusic();

    const [zipcode, setZipcode] = useState('');
    
    const handleSubmit = async (zipcode) => {
        try {
            const wheaterData = await getWheaterByZipCode(zipcode);
            const {temp} = wheaterData.main;
            const playlists = await searchPlaylists(temp);
            setPlaylist(playlists.tracks);
        } catch (error) {
            console.log(error);
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
            <Button colorScheme="blue" width="100%" onClick={() => handleSubmit(zipcode)}>
                Buscar
            </Button>
        </VStack>  
    )
}