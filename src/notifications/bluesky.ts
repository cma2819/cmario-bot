import { BskyAgent, RichText } from '@atproto/api';
import { Notifier } from './types';


const login = async () => {
    const agent = new BskyAgent({service: 'https://bsky.social'});
    await agent.login({ identifier: process.env['BLUESKY_USERNAME']!, password: process.env['BLUESKY_PASSWORD']!});
    return agent;
}

export default (): Notifier => {

    return {
        notify: async (content) => {
            const agent = await login();
            const rt = new RichText({
                text: content
            });
            await rt.detectFacets(agent);
            return agent.post({
                $type: 'app.bsky.feed.post',
                text: rt.text,
                facets: rt.facets,
            });
        }
    }
}