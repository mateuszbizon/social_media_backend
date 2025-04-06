import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { updateUserSchema, UpdateUserSchema } from "../../dtos/updateUserSchema";
import { getUserById } from "../../services/users/getUserById";
import { USER_ID } from "../../constants";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { getUserByUsername } from "../../services/users/getUserByUsername";
import { BadRequestError } from "../../errors/BadRequestError";
import { UploadFile } from "../../types";
import { deleteImageInCloudinary, updateImageInCloudinary, uploadImageToCloudinary } from "../../utils/cloudinary";
import { updateUserProfile } from "../../services/users/updateUserProfile";
import { UpdateUserProfileResponse } from "../../types/userResponse";
import { deleteTemporaryFile } from "../../utils/deleteTemporaryFile";

export async function updateUserProfileController(req: Request<{}, {}, UpdateUserSchema>, res: Response<UpdateUserProfileResponse>, next: NextFunction) {
    const { username, firstName, lastName } = req.body
    const file = req.file

    try {
        const validationResult = updateUserSchema.safeParse({ username, firstName, lastName, avatar: file })

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const currentUser = await getUserById(res.locals[USER_ID])

        if (!currentUser) {
            return next(new NotFoundError(MESSAGES.user.notFound))
        }

        const existingUser = await getUserByUsername(username)

        if (existingUser && existingUser.username !== currentUser.username) {
            return next(new BadRequestError(MESSAGES.user.usernameTaken))
        }

        let uploadResult: UploadFile = null

        if (file && !currentUser.avatarId) {
            uploadResult = await uploadImageToCloudinary(file.path)

            if (!uploadResult) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        if (file && currentUser.avatarId) {
            uploadResult = await updateImageInCloudinary(file.path, currentUser.avatarId)

            if (!uploadResult) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        let imageDeleted = false

        if (!file && currentUser.avatarId) {
            imageDeleted = await deleteImageInCloudinary(currentUser.avatarId)

            if (!imageDeleted) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        const updatedUserProfile = await updateUserProfile({
            id: currentUser.id,
            firstName,
            lastName,
            username,
            avatar: imageDeleted ? null : uploadResult ? uploadResult.secureUrl : null,
            avatarId: imageDeleted ? null : uploadResult ? uploadResult.imageId : null
        })

        res.status(200).json({
            user: {
                firstName: updatedUserProfile.firstName,
                lastName: updatedUserProfile.lastName,
                username: updatedUserProfile.username,
                avatar: updatedUserProfile.avatar
            }
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    } finally {
        if (file) {
            deleteTemporaryFile(file.path)
        }
    }
}