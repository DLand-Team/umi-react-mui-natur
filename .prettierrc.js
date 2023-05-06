const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  tabWidth: 2,
	printWidth: 1000,
	proseWrap: 'preserve'
};
