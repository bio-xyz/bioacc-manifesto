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
import {
  SimpleSubmissionSchema,
  SubmissionSchema,
  type Submission,
} from '@/types/google'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SignForm() {
  const [responseMessage, setResponseMessage] = useState()

  const form = useForm<z.infer<typeof SimpleSubmissionSchema>>({
    resolver: zodResolver(SimpleSubmissionSchema),
  })

  async function onSubmit(
    values: z.infer<typeof SimpleSubmissionSchema>,
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
    if (data.message) {
      setResponseMessage(data.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
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
        <Button type="submit">Sign the Manifesto</Button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </Form>
  )
}

/*
 <div className="flex flex-col space-y-6">
          <Input type="text" placeholder="Email" name="name" />
          <Button type="submit">Sign</Button>
          
        </div>
      </form>
    </Form>
    */
