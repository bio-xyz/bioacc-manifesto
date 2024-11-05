import { z } from 'zod'

export const SubmissionSchema = z.object({
  name: z.string().min(3),
  twitterHandle: z.string().min(3),
  wallet: z
    .union([
      z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' }),
      z.string().endsWith('.eth'),
      z.string().endsWith('.cb.id'),
    ])
    .optional(),
  email: z.string().email().optional(),
  affiliation: z.string().optional(),
})

export type Submission = z.infer<typeof SubmissionSchema>

export type Signer = Omit<Submission, 'email'>
