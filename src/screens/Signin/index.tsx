import React, { useState } from 'react';
import { 
    StatusBar, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import * as Yup from "yup";

import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from '../../components/InputPassword';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Form,
    Footer
} from './styles';

export function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatório")
                    .email("Digite um email válido"),
                password: Yup.string()
                    .required("A senha é obrigatória")
            });

            await schema.validate({ email, password });
            
            signIn({ email, password });
        } catch(error) {
            if(error instanceof Yup.ValidationError) {
                Alert.alert("Opa", error.message );
            } else {
                Alert.alert(
                    "Erro na autenticação", 
                    "Ocorreu um erro ao fazer o login, verifique as credenciais"
                )
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate("SignUpFirstStep");
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />

                    <Header>
                        <Title>
                            Estamos {"\n"}
                            quase lá
                        </Title>

                        <Subtitle>
                            Faça seu login para começar {"\n"}
                            uma experiência incrível.
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <InputPassword
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuita"
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light
                            color={theme.colors.background_secondary}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}