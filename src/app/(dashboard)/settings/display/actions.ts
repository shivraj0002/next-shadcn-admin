'use server'

import { revalidatePath } from 'next/cache'
import { displayFormSchema, type DisplayFormValues } from './schema'

type GetDisplayResult = 
  | { status: 'success', data: DisplayFormValues }
  | { status: 'error', message: string }

export async function getDisplay(): Promise<GetDisplayResult> {
  try {
    return {
      status: 'success',
      data: {
        items: ['recents', 'home'],
      } as DisplayFormValues
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch display settings'
    }
  }
}

type UpdateDisplayResult = 
  | { status: 'success', message: string }
  | { status: 'error', message: string }

export async function updateDisplay(data: DisplayFormValues): Promise<UpdateDisplayResult> {
  displayFormSchema.parse(data)

  try {
    revalidatePath('/settings/display')
    
    return { status: 'success', message: 'Display settings updated successfully' }
  } catch (error) {
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Failed to update display settings' 
    }
  }
}
