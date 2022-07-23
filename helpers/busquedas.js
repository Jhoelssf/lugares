import axios from 'axios'

export class Busquedas {
    historial = ['Madrid', 'Lima', 'San José']
    token = process.env.MAPBOX_KEY
    baseUrlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

    constructor() {
        // TODO: leer DB si existe
    }

    get paramsMapBox() {
        return {
            access_token: this.token,
            limit: 5,
            language: 'es',
        }
    }
    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `${this.baseUrlMapBox}/${lugar}.json`,
                params: this.paramsMapBox,
            })
            const resp = await instance.get()
            console.log(resp.data)
        } catch (e) {
            console.log('ocurrio un error ', e)
            return []
        }

        return []
    }
}
