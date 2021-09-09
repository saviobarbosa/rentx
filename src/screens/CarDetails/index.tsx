import React from 'react';
import { StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent, 
    Period,
    Price,
    About,
    Acessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
    car: CarDTO;
}

export function CarDetails(){
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRental() {
        navigation.navigate("Scheduling", {car});
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <BackButton 
                    onPress={handleBack}
                />            
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={[car.thumbnail]} 
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Acessories>
                    { 
                        car.accessories.map(item => (
                            <Acessory 
                                key={item.type}
                                name={item.name}
                                icon={getAccessoryIcon(item.type)}
                            />
                        )) 
                    }
                </Acessories>

                <About>
                    {car.about}
                </About>
            </Content>

            <Footer>
                <Button 
                    title="Escolher período do aluguel" 
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}