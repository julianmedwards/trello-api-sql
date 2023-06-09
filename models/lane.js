'use strict'

const util = require('../util')

module.exports = (sequelize, DataTypes) => {
    const Lane = sequelize.define(
        'lane',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            laneName: {
                type: DataTypes.STRING,
                required: true,
            },
            sequence: {
                type: DataTypes.INTEGER,
            },
        },
        {
            paranoid: true,
            underscored: true,
        }
    )

    Lane.resequence = util.resequence
    Lane.getHigherSequenced = util.getHigherSequenced
    Lane.applySequence = util.applySequence
    Lane.shiftSequence = util.shiftSequence

    return Lane
}
