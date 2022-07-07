module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Reservations', 'AmountToPay', {
            type: Sequelize.DOUBLE,
            allowNull: false
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Reservations', 'AmountToPay', {
            type: Sequelize.INTEGER,
            allowNull: false
        })
    }
}


