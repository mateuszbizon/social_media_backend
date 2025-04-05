import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { postSchema, PostSchema } from "../../dtos/postSchema";
import { UpdatePostParams } from "../../types/params";
import { BadRequestError } from "../../errors/BadRequestError";
import { getPostById } from "../../services/post/getPostById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { USER_ID } from "../../constants";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { deleteImageInCloudinary, updateImageInCloudinary, uploadImageToCloudinary } from "../../utils/cloudinary";
import { updatePost } from "../../services/post/updatePost";
import { CreatedPost } from "../../types/postResponse";
import { UploadFile } from "../../types";
import { deleteTemporaryFile } from "../../utils/deleteTemporaryFile";

export async function updatePostController(req: Request<UpdatePostParams, {}, PostSchema>, res: Response<CreatedPost>, next: NextFunction) {
    const { content } = req.body
    const { postId } = req.params
    const file = req.file

    try {
        const validationResult = postSchema.safeParse({ content, image: file })
        
        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const existingPost = await getPostById(postId)

        if (!existingPost) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }

        if (existingPost.authorId !== res.locals[USER_ID]) {
            return next(new ForbiddenError())
        }

        let uploadResult: UploadFile = null

        if (file && !existingPost.imageId) {
            uploadResult = await uploadImageToCloudinary(file.path)

            if (!uploadResult) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        if (file && existingPost.imageId) {
            uploadResult = await updateImageInCloudinary(file.path, existingPost.imageId)

            if (!uploadResult) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        let imageDeleted = false

        if (!file && existingPost.imageId) {
            imageDeleted = await deleteImageInCloudinary(existingPost.imageId)

            if (!imageDeleted) {
                return next(new DatabaseError(undefined, MESSAGES.file.notSaved))
            }
        }

        const updatedPost = await updatePost({
            id: postId,
            content,
            image: imageDeleted ? null : uploadResult ? uploadResult.secureUrl : null,
            imageId: imageDeleted ? null : uploadResult ? uploadResult.imageId : null,
        })

        res.status(200).json({
            post: updatedPost
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