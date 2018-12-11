// @flow

export type EmitterEvent = any

export default class Emitter {
    subscribers: Array<any>

    constructor() {
        this.subscribers = []
    }

    subscribe = (subscriber: any) => {
        this.subscribers.push(subscriber)

        return () => {
            this.subscribers = this.subscribers.filter((item: any) =>
                item !== subscriber)
        }
    }

    emit = (name: string, event: EmitterEvent) => {
        this.subscribers.forEach((item: any) => {
            const handler = item[`handle${name}`]
            if (handler) {
                handler(event)
            }
        })
    }
}
