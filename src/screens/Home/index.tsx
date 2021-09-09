import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import LogoSvg from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import api from "../../services/api";

import {
    Container,
    HeaderContent, 
    Header,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';

export function Home() {
    const navigation = useNavigation();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate("CarDetails", { car });
    }

    function handleMyCarsOpen() {
        navigation.navigate("MyCars");
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get("/cars");
                setCars(response.data);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

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
                        Total de {cars.length} carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            {
                loading ? <Load /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                    />
            }

            <MyCarsButton onPress={handleMyCarsOpen}>
                <Ionicons 
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                />
            </MyCarsButton>

        </Container>
    );
}