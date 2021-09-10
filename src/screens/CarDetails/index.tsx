import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
    Container,
    Header,
    CarImages,
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
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
    car: CarDTO;
}

export function CarDetails(){
    //Tema global
    const theme = useTheme();

    //Navegação
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    //Animação com reanimated
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });
    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    });
    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

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

            <Animated.View 
                style={[
                    headerStyleAnimation, 
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
                    <BackButton 
                        onPress={handleBack}
                    />            
                </Header>

                <CarImages>
                    <Animated.View
                        style={sliderCarsStyleAnimation}
                    >
                        <ImageSlider 
                            imagesUrl={car.photos} 
                        />
                    </Animated.View>
                </CarImages>
            </Animated.View>

            <Animated.ScrollView 
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
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
            </Animated.ScrollView>

            <Footer>
                <Button 
                    title="Escolher período do aluguel" 
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        overflow: "hidden",
        zIndex: 1
    }
});