const Schemes = require('../data/db-config.js')

module.exports={
    find,
    findById,
    findSteps,
    add,
    addStep,
    remove
}

function find(){
    return Schemes('schemes')
};

function findById(id){
    return Schemes('schemes')
            .where({id})
            .first();
}

function findSteps(id){
    return Schemes('schemes')
            .where("scheme_id",id)
            .join('steps', "steps.scheme_id", "=", "schemes.id")
            .select('steps.id',"schemes.scheme_name", "steps.step_number", "steps.instructions" )
            .orderBy('steps.step_number')

}

function add(scheme){
    return Schemes('schemes')
            .insert(scheme, "id")
            .then(id => {
                return findById(id[0])
            })
}
function addStep(stepData, id){
    const newStep={step_number: stepData.step_number, instructions: stepData.instructions, scheme_id: id}
    return Schemes('steps')
            .insert(newStep, 'id')
            .then(id => {
                return findSteps(newStep.scheme_id)
            })
}

function update(){

}

function remove(id){
    return Schemes('schemes')
            .where({id})
            .first()
            .then(scheme => {
                return Schemes('schemes')
                        .where({id:scheme.id})
                        .first()
                        .del()
            })
}
