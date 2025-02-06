// "use server"
// import prisma from "@/lib/prisma"
// import { currentUser } from "@clerk/nextjs/server"
// import {z} from "zod"
// import OpenAI from "openai";
// const openai=new OpenAI({apiKey:process.env.OPENAI_API_KEY!});

// export const generateForm=async(prevState:unknown,formData:FormData)=>{
//     try{
//         const user=await currentUser();
//         if(!user){
//             return{success:false , message:"User not found"}
//         }
//         const schema=z.object({
//             description:z.string().min(1,"Description is required")
//         });
//         const result=schema.safeParse({
//             description:formData.get("description") as string
//         });
//         if(!result.success){
//             return {success:false,message:"Invalid form data",error:result.error.errors}
//         }
//         const description=result.data.description;
//         if(!process.env.OPENAI_API_KEY){
//             return {success:false,message:"No api key found"}
//         }
//         const promt="Create a json form with the following fields: title, fields(If any field include options then keep it inside array not object),button"
//         const completion=await openai.chat.completions.create({
//             messages:[{role:"user",content:`${description} ${prompt}`}],
//             model:"gpt-4o",
//         });
//         console.log(completion.choices[0]);
//         const formcontent=completion.choices[0]?.message.content;
//         if(!formcontent){
//             return{success:false,message:"failed to generate form content"};
//         }
//         let formjsonData;
//         try{
//             formjsonData=JSON.parse(formcontent);
//         }catch(error){
//             console.log("error parsing json",error);
//             return{success:false,message:"Generated form content is not vaild json"}
//         }
//         //save the generated form  to database
//         const form=await prisma.form.create({
//             data:{
//                 ownerId:user.id,
//                 content:formjsonData?formjsonData:null
//             }
//         });
//         revalidatePath("/dashboard/forms");
//         return {
//             success:true,message:"Form generated succesfully",
//             data:form
//         }
//     }catch(error){
//         console.log(error);
//         return{
//             success:false,message:"An error occured while generating the form"
//         }
//     }

// }



// "use server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { z } from "zod";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { revalidatePath } from "next/cache";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export const generateForm = async (prevState: unknown, formData: FormData) => {
//     try {
//         // 1️⃣ User Authentication Check
//         const user = await currentUser();
//         if (!user) {
//             return { success: false, message: "User not found" };
//         }

//         // 2️⃣ Form Validation Using Zod
//         const schema = z.object({
//             description: z.string().min(1, "Description is required"),
//         });

//         const result = schema.safeParse({
//             description: formData.get("description") as string,
//         });

//         if (!result.success) {
//             return { success: false, message: "Invalid form data", error: result.error.errors };
//         }

//         const description = result.data.description;

//         // 3️⃣ Ensure API Key is Available
//         if (!process.env.GEMINI_API_KEY) {
//             return { success: false, message: "No API key found" };
//         }

//         // 4️⃣ Gemini AI Prompt - Requesting JSON Format
//         const prompt = `Create a JSON object for a form with:
//         - "title" (string)
//         - "fields" (array of objects with "name" and "type")
//         - "button" (string)
//         The response MUST be valid JSON only, without extra text or explanation.
//         Based on this description: "${description}"`;

//         // 5️⃣ Get Response from Gemini AI
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//         const response = await model.generateContent(prompt);
//         const textResponse = response.response?.text();

//         // 6️⃣ Extract JSON Safely
//         let formjsonData;
//         try {
//             const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
//             formjsonData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
//         } catch (error) {
//             console.log("Error parsing JSON:", error);
//             return { success: false, message: "Generated form content is not valid JSON" };
//         }

//         if (!formjsonData) {
//             return { success: false, message: "Invalid response format" };
//         }

//         // 7️⃣ Save the generated form to the database
//         const form = await prisma.form.create({
//             data: {
//                 ownerId: user.id,
//                 content: formjsonData,
//             },
//         });

//         revalidatePath("/dashboard/forms");

//         return {
//             success: true,
//             message: "Form generated successfully",
//             data: form,
//         };
//     } catch (error) {
//         console.log("Error generating form:", error);

//     }
// };


// "use server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { z } from "zod";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { revalidatePath } from "next/cache";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export const generateForm = async (prevState: unknown, formData: FormData) => {
//     try {
//         // 1️⃣ User Authentication Check
//         const user = await currentUser();
//         if (!user) {
//             return { success: false, message: "User not found" };
//         }

//         // 2️⃣ Form Validation Using Zod
//         const schema = z.object({
//             description: z.string().min(1, "Description is required"),
//         });

//         const result = schema.safeParse({
//             description: formData.get("description") as string,
//         });

//         if (!result.success) {
//             return { success: false, message: "Invalid form data", error: result.error.errors };
//         }

//         const description = result.data.description;

//         // 3️⃣ Ensure API Key is Available
//         if (!process.env.GEMINI_API_KEY) {
//             return { success: false, message: "No API key found" };
//         }

//         // 4️⃣ Gemini AI Prompt - Requesting JSON Format
//         const prompt = `Create a JSON object for a form with:
//         - "title" (string)
//         - "fields" (array of objects with "name" and "type")
//         - "button" (string)
//         The response MUST be valid JSON only, without extra text or explanation.
//         Based on this description: "${description}"`;

//         // 5️⃣ Get Response from Gemini AI
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//         const response = await model.generateContent(prompt);

//         // ✅ Ensure response exists before parsing
//         if (!response || !response.response) {
//             return { success: false, message: "No valid response from AI" };
//         }

//         const textResponse = response.response.text?.();
//         if (!textResponse) {
//             return { success: false, message: "AI response is empty or invalid" };
//         }

//         // 6️⃣ Extract JSON Safely
//         let formjsonData;
//         try {
//             const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
//             formjsonData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
//         } catch (error) {
//             console.error("Error parsing JSON:", error);
//             return { success: false, message: "Generated form content is not valid JSON" };
//         }

//         if (!formjsonData) {
//             return { success: false, message: "Invalid response format" };
//         }

//         // 7️⃣ Save the generated form to the database
//         try {
//             const form = await prisma.form.create({
//                 data: {
//                     ownerId: user.id,
//                     content: JSON.stringify(formjsonData), // ✅ Ensure valid object
//                 },
//             });

//             revalidatePath("/dashboard/forms");

//             return {
//                 success: true,
//                 message: "Form generated successfully",
//                 data: form,
//             };
//         } catch (error) {
//             console.log("Error saving form to database:", error);
//             return { success: false, message: "Database error while saving form" };
//         }
//     } catch (error) {
//         console.log("Error generating form:", error);
//         return { success: false, message: "An unexpected error occurred" };
//     }
// };


// "use server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { z } from "zod";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { revalidatePath } from "next/cache";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export const generateForm = async (prevState: unknown, formData: FormData) => {
//     try {
//         // 1️⃣ User Authentication Check
//         const user = await currentUser();
//         if (!user) {
//             return { success: false, message: "User not found" };
//         }

//         // 2️⃣ Form Validation Using Zod
//         const schema = z.object({
//             description: z.string().min(1, "Description is required"),
//         });

//         const result = schema.safeParse({
//             description: formData.get("description") as string,
//         });

//         if (!result.success) {
//             return { success: false, message: "Invalid form data", error: result.error.errors };
//         }

//         const description = result.data.description;

//         // 3️⃣ Ensure API Key is Available
//         if (!process.env.GEMINI_API_KEY) {
//             return { success: false, message: "No API key found" };
//         }

//         // 4️⃣ Gemini AI Prompt - Requesting JSON Format
//         const prompt = `Create a JSON object for a form with:
//         - "title" (string)
//         - "fields" (array of objects with "name" and "type")
//         - "button" (string)
//         The response MUST be valid JSON only, without extra text or explanation.
//         Based on this description: "${description}"`;

//         // 5️⃣ Get Response from Gemini AI
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", responseFormat: "json" });
//         const response = await model.generateContent(prompt);
//         const textResponse = response.response?.text();

//         if (!textResponse) {
//             return { success: false, message: "No response from Gemini AI" };
//         }

//         // 6️⃣ Extract JSON Safely
//         let formjsonData: object | null = null;
//         try {
//             formjsonData = JSON.parse(textResponse.trim());
//             if (typeof formjsonData !== "object" || formjsonData === null) {
//                 throw new Error("Parsed content is not a valid object");
//             }
//         } catch (error) {
//             console.error("Error parsing JSON:", error);
//             return { success: false, message: "Generated form content is not valid JSON" };
//         }


//         if (!formjsonData || typeof formjsonData !== "object") {
//             return { success: false, message: "Invalid response format" };
//         }

//         // 7️⃣ Save the generated form to the database
//         try {
//             const form = await prisma.form.create({
//                 data: {
//                     ownerId: user.id,
//                     content: JSON.stringify(formjsonData), // Ensure this is a valid object
//                 },
//             });

//             revalidatePath("/dashboard/forms");

//             return {
//                 success: true,
//                 message: "Form generated successfully",
//                 data: form,
//             };
//         } catch (error) {
//             // console.error("Error saving form to database:", error);
//             return { success: false, message: "Database error while saving form" };
//         }
//     } catch (error) {
//         console.error("Error generating form:", error);
//         return { success: false, message: "An unexpected error occurred" };
//     }
// };


"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import axios from 'axios';

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
        const response = await axios.post('https://forms-sigma-seven.vercel.app/generate-content',{prompt});
        const textResponse = response.data.response.response.candidates[0].content.parts[0].text;
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
