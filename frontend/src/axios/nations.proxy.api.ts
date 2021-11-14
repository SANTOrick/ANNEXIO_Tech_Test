
import axios from "axios";
import { Nation } from "../Models/Nation";


export default {

    getNations(): Promise<Nation[]> {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "Content-Type": "application/json",
            }
        }

        return axios.get("http://localhost:5000/api/nationproxy", config).then(response => {
            return response.data
        }).catch(error => console.log(error));
    }
}
