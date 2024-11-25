import axios from "axios";

const baseUrl = "http://192.168.100.110:8080";


export const listAllGames = async () => {

    try {
        const response = await axios.get(`${baseUrl}/games`);
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const listAllGenders = async () => {

    try {
        const response = await axios.get(`${baseUrl}/lists`);
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}

export const listGamesId = async (id: number) => {

    try {
        const response = await axios.get(`${baseUrl}/lists/${id}/games`);
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}

