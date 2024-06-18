module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('candidates', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('candidates', 'email');
  }
};