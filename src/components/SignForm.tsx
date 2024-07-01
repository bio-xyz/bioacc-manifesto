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
import { useEffect, useState, type BaseSyntheticEvent } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { ZodError, z } from 'zod'
import TweetCta from './TweetCta'

export default function SignForm() {
  const [signResponse, setSignResponse] = useState<{
    error: ZodError
    success: boolean
  }>()

  const form = useForm<Submission>({
    resolver: zodResolver(SubmissionSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    progressive: true,
    defaultValues: {
      name: '',
      twitterHandle: '',
      email: undefined,
      affiliation: undefined,
    },
  })

  useEffect(() => {
    if (signResponse?.success === true) {
      form.reset({
        name: '',
        twitterHandle: '',
        email: undefined,
        affiliation: undefined,
      })
    }
  }, [form, signResponse])

  const formState = useFormState(form)

  const { isDirty, isValid, errors } = formState

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

    const response = await fetch('/api/sign', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    if (data) {
      form.reset()
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
                <Input placeholder="Albert Einstein" {...field} />
              </FormControl>
              <FormDescription>This will be publicly visible.</FormDescription>
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
                <Input placeholder="albert_einstein" {...field} />
              </FormControl>
              <FormDescription>This will be publicly visible.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email Address (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="albert@einstein.com"
                  {...field}
                  onChange={(event) =>
                    field.onChange(event.target.value || undefined)
                  }
                  value={field.value || undefined}
                />
              </FormControl>
              <FormDescription>
                This will <i>not</i> be publicly visible.
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
              <FormLabel>Your Affiliation (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="University of Relativity"
                  {...field}
                  onChange={(event) =>
                    field.onChange(event.target.value || undefined)
                  }
                  value={field.value || undefined}
                />
              </FormControl>
              <FormDescription>This will be publicly visible.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isValid}>
          Sign the Manifesto
        </Button>
      </form>
      {signResponse?.success === false && (
        <p>{signResponse.error.issues.map((e) => e.message).join(',')}</p>
      )}
    </Form>
  )
}
