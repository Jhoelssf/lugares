import * as dotenv from 'dotenv'
dotenv.config()
import { Busquedas } from './helpers/busquedas.js'
import {
    inquiererMenu,
    leerInput,
    pausaInquirer,
    showListPlaces,
} from './helpers/inquierer.js'

const main = async () => {
    try {
        const busquedas = new Busquedas()
        let opt
        do {
            opt = await inquiererMenu()

            switch (opt) {
                case 1:
                    const lugar = await leerInput('Ciudad: ')
                    const lugares = await busquedas.ciudad(lugar)

                    const id = await showListPlaces(lugares)
                    if (id === 0) {
                        continue
                    }
                    const { name, lat, lng } = lugares.find(
                        (place) => place.id === id
                    )

                    busquedas.addHistory(name)
                    const weather = await busquedas.weatherPlace(lat, lng)

                    console.log('\nInformacion de la ciudad\n')
                    console.log('Ciudad', name)
                    console.log('Lat', lat)
                    console.log('Lng', lng)
                    console.log(`Temperatura ${weather.temp}°C`)
                    console.log(`Temp. minima ${weather.min}°C`)
                    console.log(`Temp. maxima ${weather.max}°C`)
                    console.log('El clima se ve como', weather.desc)
                    break
                case 2:
                    busquedas.capitalizedHistory.forEach((place, i) => {
                        const idx = `${i + 1}.`.green
                        console.log(`${idx} ${place}`)
                    })
                    break
            }
            console.log('Has seleccionado ', opt)
            if (opt !== 0) {
                await pausaInquirer()
            }
        } while (opt !== 0)
    } catch (error) {
        console.error(error)
    }
}

main()
