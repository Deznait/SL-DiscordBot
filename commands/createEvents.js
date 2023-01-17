const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createevents')
		.setDescription('Crear eventos dentro de un rango de fechas.')
		.addStringOption(option =>
			option.setName('date-start')
				.setDescription('Introducir fecha de inicio (Formato dd-MM-yyyy)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('date-end')
				.setDescription('Introducir fecha de fin (Formato dd-MM-yyyy)')
				.setRequired(true)),
	async execute(interaction) {
		const dateStart = interaction.options.getString('date-start');
		const dateEnd = interaction.options.getString('date-end');

		const options = {
			baseURL: 'https://raid-helper.dev/api/v1/',
			url: interaction.guildId + '/' + interaction.channelId + '/create/event',
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
		console.log('dateStart', dateStart);
		console.log('dateEnd', dateEnd);
		console.log(options);

		axios(options)
			.then(function(response) {
				console.log('Response OK', response.data);
			})
			.catch(function(error) {
				// handle error
				console.log('Response Error', error);
			});

		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};