export function formateDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: "numeric",
        hour: 'numeric',
        minute: 'numeric'

    })
}