const fs = require('fs');

const data = require('../data.json');

const { age, date } = require('../utils')


exports.index = function(req, res){
   
    return res.render("instructors/index", {instructors: data.instructors})
 
}


//create
exports.create = function(req, res){
    return res.render("instructors/create")
}



//post
exports.post = function(req, res){
    
    const keys = Object.keys(req.body)

    for(key of keys){
        // req.body.avatar_url
        if(req.body[key] == "") {
            return res.send('Please, fill all fields')         
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body
   
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

   
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect(`/instructors/${id}`)
    })
    


}


//show
exports.show = function(req, res){

    const { id } = req.params

    const findInstructor = data.instructors.find(function(instructor){
        return instructor.id == id

    })

    if(!findInstructor){
        
        return res.send("instructor not found")

    }


    const instructor = {
        
        ...findInstructor,
        age: age(findInstructor.birth),
        services: findInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(findInstructor.created_at)
    }

    return res.render("instructors/show", {instructor})


}

//edit
exports.edit = function(req, res){
    const { id } = req.params

    const findInstructor = data.instructors.find(function(instructor){
        return instructor.id == id

    })

    if(!findInstructor){
        
        return res.send("instructor not found")

    }

    const instructor = {
        ...findInstructor,
        birth: date(findInstructor.birth).iso
    }


    
    return res.render("instructors/edit", {instructor})
}

//put
exports.put = function(req, res){
    const { id } = req.body

    let index = 0

    const findInstructor = data.instructors.find(function(instructor, findIndex){
        if(id == instructor.id){
            index = findIndex
            return true
        }

    })

    if(!findInstructor){
        
        return res.send("instructor not found")

    }

    const instructor ={
        ...findInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor    

    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write Error")
        }

        return res.redirect(`/instructors/${id}`)
    })
}


//delete
exports.delete = function(req, res){
    const { id } = req.body
    
   const filteredInstructor = data.instructors.filter(function(instructor){
        return instructor.id != id
   })

   data.instructors = filteredInstructor



   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write file error!")
        }

        return res.redirect("/instructors")
   })
}