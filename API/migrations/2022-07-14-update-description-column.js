module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Coins', 'Description', {
            type: Sequelize.STRING(1200),
            allowNull: false
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Coins', 'Description', {
            type: Sequelize.STRING(300),
            allowNull: false
        })
    }
}


