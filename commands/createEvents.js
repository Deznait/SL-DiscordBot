const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createevents')
		.setDescription('Create events on a range of dates.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const options = {
			baseURL: 'https://raid-helper.dev/api/v1/',
			url: interaction.guildId + '/' + process.env.DISCORD_CHANNELID + '/create/event',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': process.env.RAIDHELPER_TOKEN,
			},
			data: {
				leaderId: interaction.user.id,
				templateId: 6,
				date: '31/01/2023',
				time: '10:00 PM',
				title: 'VoI MM',
				description: 'Cámara de las Encarnaciones',
				advancedSettings: {
					duration: 120,
					deletion: 1,
					voice_channel: '715641628764667985',
					mentions: 'Guild Leader, Bot, DPS',
					show_header: false,
					show_numbering: false,
				},
			},
		};
		console.log(options);
		console.log('interaction', interaction);

		axios(options)
			.then(function(response) {
				console.log('Response Data', response.data);
			});

		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};