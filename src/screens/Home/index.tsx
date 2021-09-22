import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import api from "../../services/api";
import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    HeaderContent, 
    Header,
    TotalCars,
    CarList,
} from './styles';

export function Home() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    //Navegação
    const navigation = useNavigation();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate("CarDetails", { car });
    }

    // function handleMyCarsOpen() {
    //     navigation.navigate("MyCars");
    // }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                const response = await api.get("/cars");
                if(isMounted) {
                    setCars(response.data);
                }
            } catch(error) {
                console.log(error);
            } finally {
                if(isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return () => {
            isMounted = false;
        };
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

                    {
                        !loading &&
                            <TotalCars>
                                Total de {cars.length} carros
                            </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {
                loading ? <LoadAnimation /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                    />
            }
        </Container>
    );
}