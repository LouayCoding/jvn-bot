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
                }
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
                        .setTitle('Discord - Nitro')
                        .setDescription('<:Nitro:1190277088398290977> 1 year nitro + boost | **€15.00**\n<:Nitro:1190277088398290977> 1 year nitro basic | **€20.00**')
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
                        .setTitle('Discord - Nitro')
                        .setDescription('<:Spotify:1190280809429610576> 6 months spotify premium | **€15.00**\n<:Spotify:1190280809429610576> 1 year spotify premium | **€20.00**')
                        .setColor('#5865F2')
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
            default:
                break;
        }



    }
};