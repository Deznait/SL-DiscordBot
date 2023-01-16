const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getevents')
		.setDescription('Gets all the events.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const options = {
			baseURL: 'https://raid-helper.dev/api/v1/',
			url: interaction.guildId + '/events',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': process.env.RAIDHELPER_TOKEN,
			},
		};
		console.log(options);

		axios(options)
			.then(function(response) {
				console.log('interaction', interaction);
				console.log('interaction.guildId', interaction.guildId);
				console.log(response.data);
			});

		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};