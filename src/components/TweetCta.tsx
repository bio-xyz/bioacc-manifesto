'use client'

import { Button } from './ui/button'

export const TWEET_URL =
  "https://twitter.com/intent/post?text=✺%20I've%20just%20signed%20the%20bio%2Facc%20manifesto%20✺%0A%0AIt's%20time%20to%20accelerate%20the%20%23bioacc%20movement%20-%20from%20wetware%2C%20to%20software%20to%20dreamware%20🧪%0A%0AJoin%20me%20in%20signing%20the%20manifesto%20and%20accelerating%20biotech%20➠%20&url=bioacc.life"

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
