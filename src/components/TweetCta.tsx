'use client'

import { XEmbed } from 'react-social-media-embed'
import { Button } from './ui/button'

export const TWEET_ID = '1796199193461043490'
export const TWEET_URL =
  'https://twitter.com/bio_xyz/status/1796199193461043490'

export const REPOST_TWEET_INTENT = `https://twitter.com/intent/retweet?tweet_id=${TWEET_ID}`

export default function TweetCta() {
  return (
    <div className="flex flex-col items-center">
      <XEmbed
        url={TWEET_URL}
        width={500}
        twitterTweetEmbedProps={{
          tweetId: TWEET_ID,
          options: {
            theme: 'dark',
            align: 'center',
            width: '500',
          },
        }}
      />
      <Button asChild className="mt-4 w-full">
        <a href={REPOST_TWEET_INTENT} target="_blank">
          Repost this
        </a>
      </Button>
    </div>
  )
}
