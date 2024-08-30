import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Carga from "../screens/carga";

import InicioSesion from "../screens/InicioSesion";
import EnviarAlerta from "../screens/EnviarAlerta";
import Disponibilidad from "../screens/Disponibilidad";
import Turnos from "../screens/Turnos";
import Ayuda from "../screens/Ayuda";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Carga">
      <Stack.Screen
        name="Carga"
        component={Carga}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InicioSesion"
        component={InicioSesion}
        options={{ title: "IniciarSesión" }}
      />
      <Stack.Screen
        name="EnviarAlerta"
        component={EnviarAlerta}
        options={{ title: "EnviarAlerta" }}
      />
      <Stack.Screen
        name="Disponibilidad"
        component={Disponibilidad}
        options={{ title: "Disponibilidad" }}
      />
      <Stack.Screen
        name="MenuDesplegable"
        component={MenuDesplegable}
        options={{ title: "MenuDesplegable" }}
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
    </Stack.Navigator>
  );
};

export default StackNavigator;
