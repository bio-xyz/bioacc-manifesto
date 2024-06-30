import { z } from 'zod'

export const SubmissionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  twitterHandle: z.string().optional(),
  affiliation: z.string().optional(),
})

export type Submission = z.infer<typeof SubmissionSchema>

export type Signer = Omit<Submission, 'email'>

export const SimpleSubmissionSchema = z.object({
  name: z.string(),
})
