import React, {useState} from 'react';
import { VStack, HStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useMusic } from "../../providers";
import { getWheaterByCityName, searchPlaylists } from '../../services';   

export const FindByCityName = () => {

  const {setLastSearch} = useMusic();

  const [cityName, setCityName] = useState('');
  const [cityUf, setCityUf] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleSubmit = async (cityName, cityUf, countryCode) => {
    try {
      const wheaterData = await getWheaterByCityName(cityName, cityUf, countryCode);
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
      console.log(error);
    }
  }

  return (
    <VStack spacing={4}>
      <FormControl id="cityName" isRequired>
        <FormLabel>Nome da Cidade</FormLabel>
        <Input  
          size="lg" type="text" 
          placeholder="Ex: London"
          value={cityName} onChange={e => setCityName(e.target.value)}
        />
      </FormControl>

      <HStack spacing={4} w="100%">
        <FormControl id="cityUf">
          <FormLabel>UF</FormLabel>
          <Input 
            size="lg" type="text" 
            placeholder="Ex: uk"
            value={cityUf} onChange={e => setCityUf(e.target.value)}
          />
        </FormControl>

        <FormControl id="countryCode">
          <FormLabel>Código do País</FormLabel>
          <Input 
            size="lg" type="text" 
            placeholder="Ex: "
            value={countryCode} onChange={e => setCountryCode(e.target.value)}
          />
        </FormControl>
      </HStack>

      <Button colorScheme="blue" width="100%" onClick={() => handleSubmit(cityName, cityUf, countryCode)}>
        Buscar
      </Button>
    </VStack>
  )
}