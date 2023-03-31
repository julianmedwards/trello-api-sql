'use strict'
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
    return Lane
}

// LaneSchema.statics.shiftSequence = async function (
//     board,
//     movedLane,
//     sequenceShift
// ) {
//     const lanes = board.lanes
//     const newSequence = movedLane.sequence + sequenceShift

//     if (lanes.length < 2) {
//         throw new errors.InternalError(
//             'Called Lane.shiftSequence without multiple lanes.'
//         )
//     }

//     const otherLane = board.lanes.find((lane) => {
//         return lane.sequence === newSequence
//     })

//     otherLane.sequence = movedLane.sequence
//     movedLane.sequence = newSequence
// }

// LaneSchema.statics.sequenceCards = function (lane) {
//     lane.cards.sort((a, b) => {
//         if (a.sequence < b.sequence) {
//             return -1
//         }
//         if (a.sequence > b.sequence) {
//             return 1
//         }
//     })
// }

// LaneSchema.statics.resequence = function (lanes, startSequence) {
//     for (let i = startSequence; i < lanes.length; i++) {
//         lanes[i].sequence = i
//     }
// }
