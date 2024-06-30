import { appendData } from '@/backend/google'
import { SubmissionSchema, type Submission } from '@/types/google'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()

  const submission: Partial<Submission> = {
    name: data.get('name')?.toString(),
    twitterHandle: data.get('twitterHandle')?.toString(),
    email: data.get('email')?.toString() || undefined,
    affiliation: data.get('affiliation')?.toString() || undefined,
  }

  const parsed = await SubmissionSchema.safeParseAsync(submission)
  if (!parsed.success) {
    return new Response(JSON.stringify(parsed), { status: 400 })
  }

  //console.log(parsed)
  await appendData(parsed.data)

  return new Response(JSON.stringify(parsed), { status: 200 })
}
