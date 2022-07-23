import 'colors'
import inquirer from 'inquirer'

export const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.blue} Historial`,
            },
            {
                value: 0,
                name: `${'0.'.blue} Salir`,
            },
        ],
    },
]

export const preguntaPausa = [
    {
        type: 'input',
        name: 'opcion',
        message: `Presione la tecla ${'ENTER'.green} para continuar`,
    },
]

export const pausaInquirer = async () => {
    const { opcion } = await inquirer.prompt(preguntaPausa)
    return opcion
}

export const inquiererMenu = async () => {
    console.clear()
    console.log('======================')
    console.log('Seleccione una opción')
    console.log('======================')

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}

export const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            },
        },
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}

export const showListTasks = async (listTasks) => {
    const choices = listTasks.map((task, index) => {
        const idx = `${index + 1}`.green
        const status = task.completadoEn
        const ended = !!status ? `Completada`.green : `Pendiente`.red
        return {
            value: task.id,
            name: `${idx}. ${task.descripcion} :: ${ended}`,
        }
    })
    choices.unshift({
        value: '0',
        name: '0. Cancelar',
    })
    const tasksList = [
        {
            type: 'list',
            name: 'selectedId',
            message: 'Seleccione una tarea para borrar?',
            choices,
        },
    ]
    const { selectedId } = await inquirer.prompt(tasksList)
    return selectedId
}

export const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}

export const showMultiplesItems = async (listTasks) => {
    const choices = listTasks.map((task, index) => {
        const idx = `${index + 1}`.green
        const status = task.completadoEn
        const ended = !!status ? `Completada`.green : `Pendiente`.red
        return {
            value: task.id,
            name: `${idx}. ${task.descripcion} :: ${ended}`,
            checked: status ? true : false,
        }
    })
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices,
        },
    ]
    const { ids } = await inquirer.prompt(question)
    return ids
}

// export default {
//     inquiererMenu,
//     pausaInquirer,
//     leerInput,
//     showListTasks,
//     confirm,
//     showMultiplesItems,
// }
