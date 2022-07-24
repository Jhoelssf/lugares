import axios from 'axios'
import * as fs from 'fs'

export class Busquedas {
    dbPath = './db/database.json'
    history = []
    token = process.env.MAPBOX_KEY
    languageAPIS = 'es'
    baseUrlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    tokenWeather = process.env.OPEN_WEATHER_KEY
    baseURLOpenWeather = 'https://api.openweathermap.org/data/2.5/weather'
    constructor() {
        this.readDB()
    }

    get paramsMapBox() {
        return {
            access_token: this.token,
            limit: 5,
            language: this.languageAPIS,
        }
    }

    get capitalizedHistory() {
        // this.history = this.history.map((el) => this.capitalizeFirstLetter(el))
        return this.history
    }

    get paramsOpenWeather() {
        return {
            appid: this.tokenWeather,
            units: 'metric',
            lang: this.languageAPIS,
        }
    }

    // capitalizeFirstLetter(str) {
    //     const arr = str.split(' ')
    //     for (var i = 0; i < arr.length; i++) {
    //         arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    //     }
    //     const str2 = arr.join(' ')
    //     return str2
    // }
    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `${this.baseUrlMapBox}/${lugar}.json`,
                params: this.paramsMapBox,
            })
            const resp = await instance.get()
            return resp.data.features.map((lugar) => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))
        } catch (e) {
            console.log('ocurrio un error ', e)
            return []
        }

        return []
    }

    async weatherPlace(lat, lng) {
        try {
            const params = this.paramsOpenWeather
            params['lat'] = lat
            params['lon'] = lng
            const instance = axios.create({
                baseURL: `${this.baseURLOpenWeather}`,
                params,
            })
            const resp = await instance.get()
            const data = resp.data
            return {
                desc: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp,
            }
        } catch (e) {
            console.log(e)
        }
    }

    addHistory(place = '') {
        if (
            this.history.includes(place.toLocaleLowerCase()) ||
            this.history.includes(place)
        ) {
            return
        }
        this.history.unshift(place)

        this.saveDB()
    }

    saveDB() {
        const payload = {
            history: this.history,
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    readDB() {
        try {
            if (!fs.existsSync(this.dbPath)) {
                return null
            }
            const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
            const historyList = JSON.parse(info)
            this.history = historyList.history
        } catch (err) {
            console.error(err)
        }
    }
}
