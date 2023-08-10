import {mapArrToStrings} from "../mapArrToStrings/mapArrToStrings";
import axios from "axios";


export const getData = async () => {
    try {
        const response: any = await axios.get('https://jsonplaceholder.typicode.com/users')
        // @ts-ignore
        const userIds: any[] = response.data.map(user => user.id)
        return mapArrToStrings(userIds)
    }catch (e){

    }
}