import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsuario = async () => {
    const data = await AsyncStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
};

export const logout = async () => {
    await AsyncStorage.clear();
};