export type Notifier = {
    notify: (content: string) => Promise<unknown>;
}