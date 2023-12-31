const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { paymentSelect } = require('../../utils/paymentMethods');

module.exports = {
    id: 'vbucks',
    permissions: [],
    run: async (client, interaction) => {
        const vbucksSelect = new StringSelectMenuBuilder()
            .setCustomId('vbucks')
            .setPlaceholder('Select amount')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('5000')
                    .setValue('5000')
                    .setEmoji('<:VBucks:1189629451240210563>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('13,500')
                    .setValue('13500')
                    .setEmoji('<:VBucks:1189629451240210563>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('27,000')
                    .setValue('27000')
                    .setEmoji('<:VBucks:1189629451240210563>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('108,000')
                    .setValue('108000')
                    .setEmoji('<:VBucks:1189629451240210563>'), // Emoji die solliciteren vertegenwoordigt
                new StringSelectMenuOptionBuilder()
                    .setLabel('Other')
                    .setValue('other')
                    .setEmoji('<:VBucks:1189629451240210563>'), // Emoji die solliciteren vertegenwoordigt

            );




        const row1 = new ActionRowBuilder().addComponents(vbucksSelect);
        const row2 = new ActionRowBuilder().addComponents(paymentSelect);
        const submitButton = new ButtonBuilder()
            .setCustomId(`submit-vbucks`)
            .setLabel('Send')
            .setStyle(ButtonStyle.Primary);

        const row3 = new ActionRowBuilder().addComponents(submitButton);


        await interaction.reply({
            content: 'Select the V-Bucks package.',
            components: [row1, row2, row3],
            ephemeral: true
        });

        const selectedValues = {
            vbucks: null,
            paymentMethod: null
        };

        const filter = i => {
            if (i.customId === 'vbucks' || i.customId === 'payment') {
                // Store select menu values
                if (i.customId === 'vbucks') {
                    selectedValues.vbucks = i.values[0];
                } else if (i.customId === 'payment') {
                    selectedValues.paymentMethod = i.values[0];
                }

                // Acknowledge the interaction
                i.deferUpdate();
                return false;
            }

            return i.customId === 'submit-vbucks' && i.user.id === interaction.user.id;
        };

        // ... (previous code)

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'submit-vbucks') {
                console.log(selectedValues); // Log the stored values

                // Check if both vbucks and paymentMethod are selected
                if (selectedValues.vbucks !== null && selectedValues.paymentMethod !== null) {
                    // Process the stored values
                    const vbucksValue = selectedValues.vbucks;
                    const paymentMethod = selectedValues.paymentMethod;

                    const categoryID = '1189650782295953528';
                    const channel = await interaction.guild.channels.create({
                        name: `order-${interaction.user.username}`,
                        parent: categoryID,
                        reason: 'To process a new V-Bucks order',
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
                            { name: 'V-Bucks Amount', value: vbucksValue },
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
                    // If either vbucks or paymentMethod is not selected, acknowledge the interaction
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
