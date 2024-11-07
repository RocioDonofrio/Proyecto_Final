import Carga from "./src/screens/carga";
import InicioSesion from "./src/screens/InicioSesion";
import Registro from "./src/screens/Registro";
import EnviarAlerta from "./src/screens/EnviarAlerta";
import Disponibilidad from "./src/screens/Disponibilidad";
import Ayuda from "./src/screens/Ayuda";
import Accidente from "./src/screens/Accidentes/Accidente";
import Incendio from "./src/screens/Accidentes/Incendio";
import Rescate from "./src/screens/Accidentes/Rescate";
import Header from "./src/components/Header";
import Configuracion from "./src/screens/Configuracion";
import EditProfile from "./src/screens/EditProfile";
import { ThemeProvider } from "./src/context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Carga">
            <Stack.Screen
              name="Carga"
              component={Carga}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InicioSesion"
              component={InicioSesion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{
                title: "REGISTRO",
                headerTintColor: "white",
                headerTitleAlign: "center",

                headerStyle: { backgroundColor: "#6b1818" },
              }}
            />

            <Stack.Screen
              name="EnviarAlerta"
              component={EnviarAlerta}
              options={{
                header: () => <Header title="Enviar Alerta" />,
              }}
            />
            <Stack.Screen
              name="Disponibilidad"
              component={Disponibilidad}
              options={{
                header: () => <Header title="Disponibilidad" />,
              }}
            />

            <Stack.Screen
              name="Ayuda"
              component={Ayuda}
              options={{
                header: () => <Header title="Ayuda" />,
              }}
            />
            <Stack.Screen
              name="Accidente"
              component={Accidente}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Incendio"
              component={Incendio}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Rescate"
              component={Rescate}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Configuracion"
              component={Configuracion}
              options={{
                header: () => <Header title="Configuracion" />,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                header: () => <Header title="EditProfile" />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }

  return <MyStack />;
}
