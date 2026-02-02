


"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
// import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateForm = async (prevState: unknown, formData: FormData) => {
    try {
        // 1️⃣ User Authentication Check
        const user = await currentUser();
        if (!user) {
            return { success: false, message: "User not found" };
        }

        // 2️⃣ Form Validation Using Zod
        const schema = z.object({
            description: z.string().min(1, "Description is required"),
        });

        const result = schema.safeParse({
            description: formData.get("description") as string,
        });

        if (!result.success) {
            return { success: false, message: "Invalid form data", error: result.error.errors };
        }

        const description = result.data.description;

        // 3️⃣ Ensure API Key is Available
        if (!process.env.GEMINI_API_KEY) {
            return { success: false, message: "No API key found" };
        }
        // 4️⃣ Gemini AI Prompt - Matching OpenAI's Style
        const prompt = `Create a JSON form with the following fields:
        - "title" (string)
        - "fields" (array of objects, each with "name", "type", and optional "options" as an array)
        - "button" only t3 fileds should be inside content object, don't add any other nested object 
         The response MUST be valid JSON only, without extra text or explanation.
        Based on this description: "${description}"`;

        // 5️⃣ Get Response from Gemini AI
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});
        // const response = await model.generateContent(prompt);
        // let textResponse = response.response?.text()?.trim();
         const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const response = await model.generateContent(prompt);
        let textResponse = response.response?.text()?.trim();
        console.log(textResponse);
        if (!textResponse) {
            return { success: false, message: "No response from Gemini AI" };
        }

        // 6️⃣ Extract JSON Only (Handling Gemini's Extra Explanations)
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return { success: false, message: "Generated form content is not valid JSON" };
        }

        let formjsonData;
        try {
            formjsonData = JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return { success: false, message: "Generated form content is not valid JSON" };
        }

        // 7️⃣ Save the generated form to the database (Same as OpenAI)
        try {
            const form = await prisma.form.create({
                data: {
                    ownerId: user.id,
                    content: formjsonData, // Keeping the JSON format
                },
            });

             revalidatePath("/dashboard/forms");

            return {
                success: true,
                message: "Form generated successfully",
                data: form,
            };
        } catch (error) {
            console.error("Error saving form to database:", error);
            return { success: false, message: "Database error while saving form" };
        }
    } catch (error) {
        console.error("Error generating form:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
};
