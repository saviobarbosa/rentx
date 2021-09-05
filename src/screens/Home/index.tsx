import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import {
    Container,
    HeaderContent, 
    Header,
    TotalCars
} from './styles';

export function Home(){
    const carData = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "AO DIA",
            price: 120
        },
        thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
    }

    return (
        <Container>
            <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
            />

            <Header>
                <HeaderContent>
                        <LogoSvg 
                            width={RFValue(108)}
                            height={RFValue(12)}
                        />    

                        <TotalCars>
                            Total de 12 carros
                        </TotalCars>
                    </HeaderContent>
            </Header>

            <Car data={carData} />
        </Container>
    );
}