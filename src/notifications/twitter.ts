import { TwitterApi } from 'twitter-api-v2';
import { Notifier } from './types';

const client = new TwitterApi({
    appKey: process.env['TWITTER_APP_KEY']!,
    appSecret: process.env['TWITTER_APP_SECRET']!,
    accessToken: process.env['TWITTER_ACCESS_TOKEN']!,
    accessSecret: process.env['TWITTER_ACCESS_SECRET']!,
});

export default (): Notifier => {
    return {
        notify: (content: string) => {
            return client.v2.tweet(content);
        }
    }
}