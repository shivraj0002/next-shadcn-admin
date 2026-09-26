'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { appearanceFormSchema, type AppearanceFormValues } from './schema'

type GetAppearanceResult = 
  | { status: 'success', data: AppearanceFormValues }
  | { status: 'error', message: string }

export async function getAppearance(): Promise<GetAppearanceResult> {
  try {
    return {
      status: 'success',
      data: {
        theme: 'light',
        font: 'inter',
      } as AppearanceFormValues
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch appearance'
    }
  }
}

type UpdateAppearanceResult = 
  | { status: 'success', message: string }
  | { status: 'error', message: string }

export async function updateAppearance(data: AppearanceFormValues): Promise<UpdateAppearanceResult> {
  const validatedData = appearanceFormSchema.parse(data)

  try {
    revalidatePath('/settings/appearance')
    
    return { status: 'success', message: 'Appearance updated successfully' }
  } catch (error) {
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Failed to update appearance' 
    }
  }
}
