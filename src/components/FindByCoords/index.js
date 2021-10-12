import React, {useState} from 'react';
import { VStack, FormControl, FormLabel, InputGroup, Input, InputLeftAddon, Button } from "@chakra-ui/react";
import { getWheaterByGeoCoords } from '../../services';   

export const FindByCoords = () => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleSubmit = async (lat, long) => {
        try {
            const wheaterData = await getWheaterByGeoCoords(lat, long);
            const {temp} = wheaterData.main;
            console.log(temp);
        } catch (error){
            console.log(error);
        }
    }

    return (
        <VStack spacing={4}>
            <FormControl id="lat" isRequired>
                <FormLabel>Latitude</FormLabel>
                <InputGroup>
                    <InputLeftAddon children="Y" />
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
                    <InputLeftAddon children="X" />
                    <Input 
                        type="text"
                        placeholder="Ex: -73.97951000"
                        value={longitude} onChange={e => setLongitude(e.target.value)}
                    />
                </InputGroup>
            </FormControl>
            <Button colorScheme="blue" width="100%" onClick={() => handleSubmit(latitude, longitude)}>
                Buscar
            </Button>
        </VStack>
    )

}