'use client'

import { Button } from './ui/button'

export const TWEET_ID = '1796199193461043490'
export const TWEET_URL =
  'https://twitter.com/bio_xyz/status/1796199193461043490'

export default function TweetCta() {
  return (
    <div className="flex flex-col space-y-12">
      <p>
        Thank you for submitting your details. In order to complete signing and
        be added as a signer, repost the bio/acc manifesto on X.
      </p>
      <Button asChild className="mt-4 px-7 w-min">
        <a href={TWEET_URL} target="_blank">
          Repost on X
        </a>
      </Button>
    </div>
  )
}
