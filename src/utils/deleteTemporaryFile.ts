import fs from "fs"

export function deleteTemporaryFile(path: string) {
    fs.unlink(path, (error) => {
        if (error) {
            console.error("Can't delete file:", error)
        } else {
            console.log("Temporary file deleted")
        }
    })
}