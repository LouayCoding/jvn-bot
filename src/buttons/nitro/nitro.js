const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    id: 'nitro',
    permissions: [],
    run: async (client, interaction) => {
        const nitroSelect = new StringSelectMenuBuilder()
            .setCustomId('nitro')
            .setPlaceholder('Select amount')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Nitro 1 year + boost')
                    .setValue('nitro')
                    .setEmoji('<:Nitro:1190277088398290977>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('Nitro 1 year basic')
                    .setValue('nitrobasic')
                    .setEmoji('<:Nitro:1190277088398290977>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('Other')
                    .setValue('other')
                    .setEmoji('<:Nitro:1190277088398290977>'), // Emoji die solliciteren vertegenwoordigt

            );

        const paymentSelect = new StringSelectMenuBuilder()
            .setCustomId('payment')
            .setPlaceholder('Select payment method')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Paypal')
                    .setValue('paypal')
                    .setEmoji('<:Paypal:1189641822096605184>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Crypto')
                    .setValue('crypto')
                    .setEmoji('<:Crypto:1189641698125553714>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('iDeal')
                    .setValue('ideal')
                    .setEmoji('<:Ideal:1189641810260271244>'),
            );


        const row1 = new ActionRowBuilder().addComponents(nitroSelect);
        const row2 = new ActionRowBuilder().addComponents(paymentSelect);
        const submitButton = new ButtonBuilder()
            .setCustomId(`submit-nitro`)
            .setLabel('Send')
            .setStyle(ButtonStyle.Primary);

        const row3 = new ActionRowBuilder().addComponents(submitButton);


        await interaction.reply({
            content: 'Select the Nitro package.',
            components: [row1, row2, row3],
            ephemeral: true
        });

        const selectedValues = {
            nitro: null,
            paymentMethod: null
        };

        const filter = i => {
            if (i.customId === 'nitro' || i.customId === 'payment') {
                // Store select menu values
                if (i.customId === 'nitro') {
                    selectedValues.nitro = i.values[0];
                } else if (i.customId === 'payment') {
                    selectedValues.paymentMethod = i.values[0];
                }

                // Acknowledge the interaction
                i.deferUpdate();
                return false;
            }

            return i.customId === 'submit-nitro' && i.user.id === interaction.user.id;
        };

        // ... (previous code)

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'submit-nitro') {
                console.log(selectedValues); // Log the stored values

                // Check if both nitro and paymentMethod are selected
                if (selectedValues.nitro !== null && selectedValues.paymentMethod !== null) {
                    // Process the stored values
                    const nitroValue = selectedValues.nitro;
                    const paymentMethod = selectedValues.paymentMethod;

                    const categoryID = '1189650782295953528';
                    const channel = await interaction.guild.channels.create({
                        name: `order-${interaction.user.username}`,
                        parent: categoryID,
                        reason: 'To process a new Nitro order',
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
                            { name: 'Nitro type', value: nitroValue },
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
                    // If either nitro or paymentMethod is not selected, acknowledge the interaction
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
