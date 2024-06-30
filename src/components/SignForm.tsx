'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmissionSchema, type Submission } from '@/types/google'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import TweetCta from './TweetCta'

export default function SignForm() {
  const [signResponse, setSignResponse] = useState<{
    error: ZodError
    success: boolean
  }>()

  const form = useForm<Submission>({
    resolver: zodResolver(SubmissionSchema),
  })

  async function onSubmit(
    values: z.infer<typeof SubmissionSchema>,
    e: BaseSyntheticEvent<object, any, any> | undefined,
  ) {
    if (!e) {
      console.error('no formdata')
      return
    }

    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    console.log(formData)
    const response = await fetch('/api/sign', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    if (data) {
      setSignResponse(data)
    }
  }

  if (signResponse?.success === true) {
    return <TweetCta />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Name<sup>*</sup>
              </FormLabel>
              <FormControl>
                <Input placeholder="Paul Kohlhaas" {...field} />
              </FormControl>
              <FormDescription>
                This is will be publicly visible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Twitter Handle<sup>*</sup>
              </FormLabel>
              <FormControl>
                <Input placeholder="bio_xyz" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email Address</FormLabel>
              <FormControl>
                <Input placeholder="brown@hillvalley.co" {...field} />
              </FormControl>
              <FormDescription>
                This is will be <i>not</i> publicly visible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="affiliation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Affiliation</FormLabel>
              <FormControl>
                <Input placeholder="University of Hill Valley" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Sign the Manifesto
        </Button>
      </form>
      {signResponse?.success === false && (
        <p>{signResponse.error.issues.map((e) => e.message).join(',')}</p>
      )}
    </Form>
  )
}
