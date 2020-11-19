const faker = require('faker');
const languages = ['German', 'English', 'French'];
const statuses = ['online', 'offline'];

const data = [];

const getRandomNum = (max) => Math.floor(Math.random() * max);

const getLanguage = () => {
	const genLanguages = languages.filter(() => getRandomNum(2));

	if (!genLanguages.length) {
		return languages;
	}

	return genLanguages;
}

const generateAdvisor = () => {
	const user = {
		status: statuses[getRandomNum(2)],
		languages: getLanguage(),
		avatar: faker.image.avatar(),
		name: faker.name.findName(),
		reviews: getRandomNum(100),
	};

	return user;
}

for (let i = 0; i < 5000; i++) {
	data.push(generateAdvisor());
}

const sortedAsc = JSON.parse(JSON.stringify(data)).sort((a, b) => a.reviews - b.reviews);
const sortedDesc = JSON.parse(JSON.stringify(data)).sort((a, b) => b.reviews - a.reviews);

module.exports = {
	data,
	sortedAsc,
	sortedDesc,
};
