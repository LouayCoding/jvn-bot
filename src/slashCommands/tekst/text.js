const { EmbedBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'text',
    description: "Krijg alle details over deze server in een oogopslag!",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'type',
            description: 's',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'vbucks',
                    value: 'vbucks'
                },
                {
                    name: 'nitro',
                    value: 'nitro'
                },
                {
                    name: 'spotify',
                    value: 'spotify'
                },
                {
                    name: 'netflix',
                    value: 'netflix'
                },
                {
                    name: 'disney',
                    value: 'disney'
                },
                {
                    name: 'nuker',
                    value: 'nuker'
                },
            ]
        }
    ],
    run: async (client, interaction) => {
        const soort = interaction.options.getString("type");

        switch (soort) {
            case 'vbucks':
                const embed = new EmbedBuilder()
                    .setTitle('Fortnite - VBucks')
                    .setDescription('<:VBucks:1189629451240210563> 5,000 V-Bucks | **€12.99**\n<:VBucks:1189629451240210563> 13,500 V-Bucks | **€19.99**\n<:VBucks:1189629451240210563>  27,000 V-Bucks | **€36.99**\n<:VBucks:1189629451240210563>  108,000 V-Bucks | **€142.99**')
                    .setColor('#5865F2')
                    .setImage('https://i.imgur.com/MlD7Mah.png')

                const vbucksButton = new ButtonBuilder()
                    .setCustomId('vbucks')
                    .setLabel('Buy VBucks')
                    .setEmoji('🛒')
                    .setStyle(ButtonStyle.Secondary);

                const row = new ActionRowBuilder()
                    .addComponents(vbucksButton);


                await interaction.channel.send({
                    embeds: [embed],
                    components: [row],
                });
                break;
                case 'nitro':
                    const embedNitro = new EmbedBuilder()
                        .setTitle('Nitro')
                        .setDescription('<:Nitro:1190277088398290977> 1 year nitro + boost | **€20.00**\n<:Nitro:1190277088398290977> 1 year nitro basic | **€15.00**')
                        .setColor('#5865F2')
                        .setImage('https://i.imgur.com/9boBrV9.png')
    
                    const buttonNitro = new ButtonBuilder()
                        .setCustomId('nitro')
                        .setLabel('Buy Nitro')
                        .setEmoji('🛒')
                        .setStyle(ButtonStyle.Secondary);
    
                    const rowNitro = new ActionRowBuilder()
                        .addComponents(buttonNitro);
    
    
                    await interaction.channel.send({
                        embeds: [embedNitro],
                        components: [rowNitro],
                    });
                    break;
                    case 'spotify':
                    const embedSpotify = new EmbedBuilder()
                        .setTitle('Spotify')
                        .setDescription('<:Spotify:1190280809429610576> 6 months spotify premium | **€15.00**\n<:Spotify:1190280809429610576> 1 year spotify premium | **€20.00**')
                        .setColor('#1DB954')
                        .setImage('https://kaartdirect.nl/images/platforms/cadeaukaarten-spotify-banner-1658822911.png')
    
                    const buttonSpotify = new ButtonBuilder()
                        .setCustomId('spotify')
                        .setLabel('Buy Spotify')
                        .setEmoji('🛒')
                        .setStyle(ButtonStyle.Secondary);
    
                    const rowSpotify = new ActionRowBuilder()
                        .addComponents(buttonSpotify);
    
    
                    await interaction.channel.send({
                        embeds: [embedSpotify],
                        components: [rowSpotify],
                    });
                    break;
                    case 'netflix':
                    const embedNetflix = new EmbedBuilder()
                        .setTitle('Netflix')
                        .setDescription('<:Netflix:1192313051412697149> 1 month netflix premium 4k | **€4.00**\n<:Netflix:1192313051412697149> 3 months netflix premium 4k | **€8.00**\n<:Netflix:1192313051412697149> 6 months netflix premium 4k | **€15.00**\n\n**Please note that you share this account with others, and you will only receive one profile**.')
                        .setColor('#ff0000')
                        .setImage('https://serieverslaving.nl/wp-content/uploads/2015/11/seo-watch-free-link-preview.jpg')
    
                    const buttonNetflix = new ButtonBuilder()
                        .setCustomId('netflix')
                        .setLabel('Buy Netflix')
                        .setEmoji('🛒')
                        .setStyle(ButtonStyle.Secondary);
    
                    const rowNetflix = new ActionRowBuilder()
                        .addComponents(buttonNetflix);
    
    
                    await interaction.channel.send({
                        embeds: [embedNetflix],
                        components: [rowNetflix],
                    });
                    break;
                    case 'disney':
                    const embedDisney = new EmbedBuilder()
                        .setTitle('Disney')
                        .setDescription('<:Disney:1192322007325487135> 6 months | **€15.00**\n\n**Please note that you share this account with others, and you will only receive one profile**.')
                        .setColor('#01147C')
                        .setImage('https://i0.wp.com/d-log.nl/wp-content/uploads/2021/02/Disney-Plus.png?fit=1200%2C630&ssl=1')
    
                    const buttonDisney = new ButtonBuilder()
                        .setCustomId('disney')
                        .setLabel('Buy Disney')
                        .setEmoji('🛒')
                        .setStyle(ButtonStyle.Secondary);
    
                    const rowDisney = new ActionRowBuilder()
                        .addComponents(buttonDisney);
    
    
                    await interaction.channel.send({
                        embeds: [embedDisney],
                        components: [rowDisney],
                    });
                    break;
                    case 'nuker':
                    const embedNuker = new EmbedBuilder()
                        .setTitle('Server Nuker | Selfbot')
                        .setDescription('This selfbot deletes all channels, emojis, members, stickers, roles and much more and has been coded by **JVN Store**.\n\n <:Discord:1192360105744797756> Trial key | **free 7 days**\n<:Discord:1192360105744797756> Lifetime key | **€15.00**\n\n**Please note this software is for educational purposes only.**')
                        .setColor('#5865F2')
                        .setImage('https://t3.ftcdn.net/jpg/01/36/37/58/360_F_136375846_C1AF7kkUz1H1sUJmKL7S3NRCcITKCC9F.jpg')
    
                    const buttonNuker = new ButtonBuilder()
                        .setCustomId('nuker')
                        .setLabel('Buy Server Nuker')
                        .setEmoji('🛒')
                        .setStyle(ButtonStyle.Secondary);
    
                    const rowNuker = new ActionRowBuilder()
                        .addComponents(buttonNuker);
    
    
                    await interaction.channel.send({
                        embeds: [embedNuker],
                        components: [rowNuker],
                    });
                    break;
                    
            default:
                break;
        }



    }
};