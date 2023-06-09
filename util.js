'use strict'

const { Op } = require('sequelize')

module.exports = {
    // Updates sequence of tables starting at given value.
    resequence: function (model, parentColumn, parentId, startSequence) {
        return new Promise(async (resolve, reject) => {
            const higherInstances = await model.getHigherSequenced(
                model,
                parentColumn,
                parentId,
                startSequence
            )

            if (higherInstances.length > 0) {
                resolve(
                    await model.applySequence(higherInstances, startSequence)
                )
            } else {
                resolve()
            }
        })
    },

    // Returns ordered array of model instances which have a greater sequence.
    getHigherSequenced: function (
        model,
        parentColumn,
        parentId,
        startSequence
    ) {
        return new Promise(async (resolve, reject) => {
            const instances = await model.findAll({
                where: {
                    [parentColumn]: parentId,
                    sequence: { [Op.gt]: startSequence },
                },
                order: [['sequence', 'ASC']],
            })
            resolve(instances)
        })
    },

    // Updates sequence of given array of model instances incrementally
    // starting from given value.
    applySequence: function (instances, startSequence) {
        return new Promise(async (resolve, reject) => {
            const sequenced = instances.map(async (instance, i) => {
                const updatedInst = await instance.update({
                    sequence: startSequence + i,
                })
                return updatedInst
            })

            Promise.all(sequenced).then(() => {
                resolve()
            })
        })
    },

    // Swaps sequence of two adjacent elements.
    shiftSequence: function (
        model,
        parentColumn,
        parentId,
        currentId,
        sequenceShift
    ) {
        return new Promise(async (resolve, reject) => {
            const currentInstance = await model.findOne({
                where: { id: currentId },
            })

            const nextInstance = await model.findOne({
                where: {
                    [parentColumn]: parentId,
                    sequence: currentInstance.sequence + sequenceShift,
                },
            })

            if (sequenceShift === 1) {
                await currentInstance.increment('sequence')
                await nextInstance.decrement('sequence')
                resolve()
            } else {
                await currentInstance.decrement('sequence')
                await nextInstance.increment('sequence')
                resolve()
            }
        })
    },
}
