import { Client, Events, GatewayIntentBits } from 'discord.js';
import twitter from '../../notifications/twitter';
import bluesky from '../../notifications/bluesky';

export default () => {

    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

    client.on(Events.ClientReady, () => {
        console.log("I'm ready");
    });

    client.on(Events.MessageCreate, (msg) => {
        if (msg.channelId !== process.env['DISCORD_WATCH_CHANNEL_ID']) {
            return;
        }
        console.log('====== Message received =====');
        console.log(JSON.stringify(msg));
        twitter().notify(msg.content).then(() => {
            msg.react('🟦');
        });
        bluesky().notify(msg.content).then(() => {
            msg.react('☀️');
        });
    });
    
    client.login(process.env['DISCORD_BOT_TOKEN']!);
}