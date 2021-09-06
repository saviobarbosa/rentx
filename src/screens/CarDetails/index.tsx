import React from 'react';
import { StatusBar } from 'react-native';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

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

export function CarDetails(){
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate("Scheduling");
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
                    onPress={() => {}}
                />            
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={["https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"]} 
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Acessories>
                    <Acessory name="380Km/h" icon={SpeedSvg} />
                    <Acessory name="3.2s" icon={AccelerationSvg} />
                    <Acessory name="800 HP" icon={ForceSvg} />
                    <Acessory name="Gasolina" icon={GasolineSvg} />
                    <Acessory name="Auto" icon={ExchangeSvg} />
                    <Acessory name="2 pessoas" icon={PeopleSvg} />
                </Acessories>

                <About>
                    Este é um automóvel desportivo. Surgiu o lendário touro de lide indultado
                    na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
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