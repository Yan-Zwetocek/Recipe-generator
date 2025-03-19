module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipe_ingredients", "notes", {
      type: Sequelize.TEXT,
      allowNull: true, // Можно разрешить null, если примечание необязательно
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipe_ingredients", "notes");
  },
};
