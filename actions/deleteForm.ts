"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteForm = async (formId: number) => {
  try {
    await prisma.form.delete({
      where: {
        id: formId
      }
    })

    // refresh forms list
    revalidatePath("/dashboard/forms")

    return {
      success: true,
      message: "Form deleted successfully."
    }

  } catch (error) {
    return {
      success: false,
      message: "Form not found or already deleted."
    }
  }
}
