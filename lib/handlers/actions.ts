'use server';

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http-error";
import { Session } from "next-auth";
import { auth } from "@/auth";
import connectDB from "../mongoose";

type ActionOptions<T> {
    params: T,
    schema: ZodSchema<T>,
    authorize?: boolean,
}

async function action<T>({params, schema, authorize}: ActionOptions<T>) {
    if(params && schema) {
        try {
            schema.parse(params);


        } catch (error) {
            if(error instanceof ZodError) {
                throw new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);
            } else {
                throw new Error("Schema validation failed.")
            }
        }
    }

    let session: Session | null = null;
    if(auth) {
        session = await auth()
        if(!session) return new UnauthorizedError("Unauthorized ...");
    }

    await connectDB();

    return {params, session};
}

export default action;