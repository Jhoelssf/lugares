import * as dotenv from 'dotenv'
dotenv.config()
import { Busquedas } from './helpers/busquedas.js'
import { inquiererMenu, leerInput, pausaInquirer } from './helpers/inquierer.js'

const main = async () => {
    try {
        const busquedas = new Busquedas()
        let opt
        do {
            opt = await inquiererMenu()

            switch (opt) {
                case 1:
                    const lugar = await leerInput('Ciudad: ')
                    busquedas.ciudad(lugar)
                    console.log(lugar)
                    // mostrar mensaje
                    // mostrar lugares
                    // seleccionar el lugar
                    // clima
                    // mostrar resultados
                    console.log('\nInformacion de la ciudad\n')
                    console.log('Ciudad')
                    console.log('Lat')
                    console.log('Lng')
                    console.log('Temperatura')
                    console.log('Temp. minima')
                    console.log('Temp. maxima')
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
