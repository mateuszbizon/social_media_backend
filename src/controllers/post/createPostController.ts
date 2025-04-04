import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { postSchema, PostSchema } from "../../dtos/postSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { createPost } from "../../services/post/createPost";
import { USER_ID } from "../../constants";
import { CreatedPost } from "../../types/postResponse";
import { writeError } from "../../utils/writeError";
import { uploadImageToCloudinary } from "../../utils/cloudinary";
import { MESSAGES } from "../../constants/messages";
import { deleteTemporaryFile } from "../../utils/deleteTemporaryFile";
import { UploadFile } from "../../types";

export async function createPostController(req: Request<{}, {}, PostSchema>, res: Response<CreatedPost>, next: NextFunction) {
    const { content } = req.body
    const file = req.file

    try {
        const validationResult = postSchema.safeParse({ content, image: file })

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        let uploadResult: UploadFile = null

        if (file) {
            uploadResult = await uploadImageToCloudinary(file.path)

            if (!uploadResult) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        const createdPost = await createPost({
            content,
            authorId: res.locals[USER_ID],
            image: uploadResult ? uploadResult.secureUrl : null,
            imageId: uploadResult ? uploadResult.imageId : null
        })

        res.status(201).json({
            post: createdPost
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