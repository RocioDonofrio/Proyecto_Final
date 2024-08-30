import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Carga from "./src/screens/carga";
import InicioSesion from "./src/screens/InicioSesion";
import EnviarAlerta from "./src/screens/EnviarAlerta";
import Disponibilidad from "./src/screens/Disponibilidad";
import Turnos from "./src/screens/Turnos";
import Ayuda from "./src/screens/Ayuda";
import Accidente from "./src/screens/Accidentes/Accidente";
import Incendio from "./src/screens/Accidentes/Incendio";
import Rescate from "./src/screens/Accidentes/Rescate";

const Stack = createStackNavigator();

const App = () => (
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
        name="EnviarAlerta"
        component={EnviarAlerta}
        options={{ title: "Enviar Alerta" }}
      />
      <Stack.Screen
        name="Disponibilidad"
        component={Disponibilidad}
        options={{ title: "Disponibilidad" }}
      />
      <Stack.Screen
        name="Turnos"
        component={Turnos}
        options={{ title: "Turnos" }}
      />
      <Stack.Screen
        name="Ayuda"
        component={Ayuda}
        options={{ title: "Ayuda" }}
      />
      <Stack.Screen
        name="Accidente"
        component={Accidente}
        options={{ title: "Accidente" }}
      />
      <Stack.Screen
        name="Incendio"
        component={Incendio}
        options={{ title: "Incendio" }}
      />
      <Stack.Screen
        name="Rescate"
        component={Rescate}
        options={{ title: "Rescate" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
