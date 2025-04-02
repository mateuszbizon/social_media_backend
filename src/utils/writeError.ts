export function writeError(error: unknown) {
    if (error instanceof Error) {
        return error
    }

    return undefined
}