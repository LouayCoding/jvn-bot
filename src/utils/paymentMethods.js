const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

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
                new StringSelectMenuOptionBuilder()
                    .setLabel('Wise')
                    .setValue('Wise')
                    .setEmoji('<:wise:1192972973708161114>'),
            );

module.exports = {
    paymentSelect
}