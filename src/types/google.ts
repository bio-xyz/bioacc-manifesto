import { z } from 'zod'

export const SubmissionSchema = z.object({
  name: z.string().min(3).max(200),
  twitterHandle: z.string().min(3).max(150),
  wallet: z
    .union([
      z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' }),
      z.string().max(250).endsWith('.eth'),
      z.string().max(250).endsWith('.cb.id'),
    ])
    .optional(),
  email: z.string().max(150).email().optional(),
  affiliation: z.string().max(200).optional(),
})

export type Submission = z.infer<typeof SubmissionSchema>

export type Signer = Omit<Submission, 'email'>
