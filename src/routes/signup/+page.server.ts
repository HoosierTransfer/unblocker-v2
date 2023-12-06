// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit'
import { randomBytes } from 'crypto'

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: 'gearoid',
          session_token: randomBytes(32).toString('hex'),
        },
      },
    })

    console.log(error)

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false, email })
    }

    return {
      message: 'Please check your email for a magic link to log into the website.',
      success: true,
    }
  },
}