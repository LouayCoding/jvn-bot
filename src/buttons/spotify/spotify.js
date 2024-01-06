const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { paymentSelect } = require('../../utils/paymentMethods');

module.exports = {
    id: 'spotify',
    permissions: [],
    run: async (client, interaction) => {
        const SpotifySelect = new StringSelectMenuBuilder()
            .setCustomId('spotify')
            .setPlaceholder('Select package')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Spotify 6 months')
                    .setValue('spotify 6 months')
                    .setEmoji('<:Spotify:1190280809429610576>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('Spotify 1 year')
                    .setValue('spotify 1 year')
                    .setEmoji('<:Spotify:1190280809429610576>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('Other')
                    .setValue('other')
                    .setEmoji('<:Spotify:1190280809429610576>'), // Emoji die solliciteren vertegenwoordigt

            );

        const row1 = new ActionRowBuilder().addComponents(SpotifySelect);
        const row2 = new ActionRowBuilder().addComponents(paymentSelect);
        const submitButton = new ButtonBuilder()
            .setCustomId(`submit-spotify`)
            .setLabel('Send')
            .setStyle(ButtonStyle.Primary);

        const row3 = new ActionRowBuilder().addComponents(submitButton);


        await interaction.reply({
            content: 'Select the Spotify package.',
            components: [row1, row2, row3],
            ephemeral: true
        });

        const selectedValues = {
            spotify: null,
            paymentMethod: null
        };

        const filter = i => {
            if (i.customId === 'spotify' || i.customId === 'payment') {
                // Store select menu values
                if (i.customId === 'spotify') {
                    selectedValues.spotify = i.values[0];
                } else if (i.customId === 'payment') {
                    selectedValues.paymentMethod = i.values[0];
                }

                // Acknowledge the interaction
                i.deferUpdate();
                return false;
            }

            return i.customId === 'submit-spotify' && i.user.id === interaction.user.id;
        };

        // ... (previous code)

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'submit-spotify') {
                console.log(selectedValues); // Log the stored values

                // Check if both Spotify and paymentMethod are selected
                if (selectedValues.spotify !== null && selectedValues.paymentMethod !== null) {
                    // Process the stored values
                    const spotifyValue = selectedValues.spotify;
                    const paymentMethod = selectedValues.paymentMethod;

                    const categoryID = '1189650782295953528';
                    const channel = await interaction.guild.channels.create({
                        name: `order-${interaction.user.username}`,
                        parent: categoryID,
                        reason: 'To process a new Spotify order',
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: '1189620182298144850',
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                        ],
                    });

                    // Create an embed message
                    const embed = new EmbedBuilder()
                        .setColor('#5865F2')
                        .addFields(
                            { name: 'Spotify Type', value: spotifyValue },
                            { name: 'Payment Method', value: paymentMethod }
                        )

                    const closeButton = new ButtonBuilder()
                        .setCustomId('close')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger)

                    const buttons = new ActionRowBuilder().addComponents(closeButton);
                    channel.send({ embeds: [embed], components: [buttons] });

                    await i.update({
                        content: `Your order has been processed. Please check ${channel} for details.`,
                        components: [],
                        embeds: []
                    });
                } else {
                    // If either Spotify or paymentMethod is not selected, acknowledge the interaction
                    await i.deferUpdate();
                }
            }
        });

        collector.on('end', collected => {
            // Check if the collector has expired and both options are not selected

            interaction.editReply({
                content: `Selection process has timed out. Please try again.`,
                components: [],
                embeds: []
            });

        });



    },
}
