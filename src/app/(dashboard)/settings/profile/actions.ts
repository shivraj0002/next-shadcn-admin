'use server'

import { revalidatePath } from 'next/cache'
import { profileFormSchema, type ProfileFormValues } from './schema'

type GetProfileResult = 
  | { status: 'success', data: ProfileFormValues }
  | { status: 'error', message: string }

export async function getProfile(): Promise<GetProfileResult> {
  try {
    return {
      status: 'success',
      data: {
        username: 'demo-user',
        email: 'm@example.com',
        bio: 'I own a computer.',
        urls: [
          { value: 'https://shadcn.com' },
          { value: 'http://twitter.com/shadcn' },
        ],
      } as ProfileFormValues
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch profile'
    }
  }
}

type UpdateProfileResult = 
  | { status: 'success', message: string }
  | { status: 'error', message: string }

export async function updateProfile(data: ProfileFormValues): Promise<UpdateProfileResult> {
  profileFormSchema.parse(data)

  try {
    revalidatePath('/settings/profile')

    return { status: 'success', message: 'Profile updated successfully' }
  } catch (error) {
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Failed to update profile' 
    }
  }
}
