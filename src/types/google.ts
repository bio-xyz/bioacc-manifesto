import { z } from 'zod'

export const SubmissionSchema = z.object({
  name: z.string(),
  twitterHandle: z.string(),
  email: z.string().email().optional(),
  affiliation: z.string().optional(),
})

export type Submission = z.infer<typeof SubmissionSchema>

export type Signer = Omit<Submission, 'email'>
