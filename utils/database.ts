import { Tool } from '../interfaces/tool'

export class DataBase {

    private database: Promise<IDBDatabase>

    constructor() {
        this.database = this.getDatabase()
    }

    async getAllTools(): Promise<Tool[]> {
        const db = await this.database
        return await PromisifyIDBRequest<Tool[]>(db.transaction('tool').objectStore('tool').getAll())

    }

    async deleteTool(tool: Tool): Promise<void> {
        const db = await this.database
        await PromisifyIDBRequest(db.transaction('tool', 'readwrite').objectStore('tool').delete(tool.id))
    }

    async putTool(tool: Tool): Promise<IDBValidKey> {
        const db = await this.database
        return await PromisifyIDBRequest(db.transaction('tool', 'readwrite').objectStore('tool').put(tool))
    }

    async getVersion(): Promise<number> {
        const db = await this.database
        return await PromisifyIDBRequest<number>(db.transaction('config').objectStore('config').get('version'))
    }

    async putVersion(version: number): Promise<IDBValidKey> {
        const db = await this.database
        return await PromisifyIDBRequest(db.transaction('config').objectStore('config').put(version, 'version'))
    }

    private getDatabase() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open('toolbox')
            request.onupgradeneeded = (event) => {
                const database = request.result
                let index = event.oldVersion
                while (index < DataBaseParseList.length) {
                    DataBaseParseList[index](database)
                    index++
                }
            }
            request.onsuccess = () => {
                resolve(request.result)
            }
            request.onerror = reject
        })
    }
}

function PromisifyIDBRequest<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result)
        }
        request.onerror = reject
    })
}

const DataBaseParseList = [Database0_1]

function Database0_1(database: IDBDatabase) {
    database.createObjectStore('tool', { keyPath: 'id' })
    database.createObjectStore('config')
}