const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { paymentSelect } = require('../../utils/paymentMethods');

module.exports = {
    id: 'disney',
    permissions: [],
    run: async (client, interaction) => {
        const disneySelect = new StringSelectMenuBuilder()
            .setCustomId('disney')
            .setPlaceholder('Select package')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Disney 6 months')
                    .setValue('Disney 6 months')
                    .setEmoji('<:Disney:1192322007325487135>'),
            );

        


        const row1 = new ActionRowBuilder().addComponents(disneySelect);
        const row2 = new ActionRowBuilder().addComponents(paymentSelect);
        const submitButton = new ButtonBuilder()
            .setCustomId(`submit-disney`)
            .setLabel('Send')
            .setStyle(ButtonStyle.Primary);

        const row3 = new ActionRowBuilder().addComponents(submitButton);


        await interaction.reply({
            content: 'Select the Disney package.',
            components: [row1, row2, row3],
            ephemeral: true
        });

        const selectedValues = {
            disney: null,
            paymentMethod: null
        };

        const filter = i => {
            if (i.customId === 'disney' || i.customId === 'payment') {
                // Store select menu values
                if (i.customId === 'disney') {
                    selectedValues.disney = i.values[0];
                } else if (i.customId === 'payment') {
                    selectedValues.paymentMethod = i.values[0];
                }

                // Acknowledge the interaction
                i.deferUpdate();
                return false;
            }

            return i.customId === 'submit-disney' && i.user.id === interaction.user.id;
        };



        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'submit-disney') {
                console.log(selectedValues); // Log the stored values

                // Check if both nitro and paymentMethod are selected
                if (selectedValues.disney !== null && selectedValues.paymentMethod !== null) {
                    // Process the stored values
                    const disneyValue = selectedValues.disney;
                    const paymentMethod = selectedValues.paymentMethod;

                    const categoryID = '1189650782295953528';
                    const channel = await interaction.guild.channels.create({
                        name: `order-${interaction.user.username}`,
                        parent: categoryID,
                        reason: 'To process a new Disney order',
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
                            { name: 'Type', value: disneyValue },
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
