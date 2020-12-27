const fs = require('fs');

const data = require('../data.json');

const {date, blood } = require('../utils')


//index
exports.index = function(req, res){
   
    return res.render("members/index", {members: data.members})
 
}


//create
exports.create = function(req, res){
    return res.render("members/create")
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

    
   
    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMember = data.members[data.members.length - 1]
    

    if(lastMember){
        id = lastMember.id + 1
    }

   
    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect(`/members/${id}`)
    })
    


}


//show
exports.show = function(req, res){

    const { id } = req.params

    const findMember = data.members.find(function(member){
        return member.id == id

    })

    if(!findMember){
        
        return res.send("member not found")

    }


    const member = {
        
        ...findMember,
        birth: date(findMember.birth).birthDay,
        blood: blood(findMember.blood)
 
    }

    return res.render("members/show", {member})


}

//edit
exports.edit = function(req, res){
    const { id } = req.params

    const findMember = data.members.find(function(member){
        return member.id == id

    })

    if(!findMember){
        
        return res.send("member not found")

    }

    const member = {
        ...findMember,
        birth: date(findMember.birth).iso
    }


    
    return res.render("members/edit", {member})
}

//put
exports.put = function(req, res){
    const { id } = req.body

    let index = 0

    const findMember = data.members.find(function(member, findIndex){
        if(id == member.id){
            index = findIndex
            return true
        }

    })

    if(!findMember){
        
        return res.send("member not found")

    }

    const member ={
        ...findMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member    

    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write Error")
        }

        return res.redirect(`/members/${id}`)
    })
}


//delete
exports.delete = function(req, res){
    const { id } = req.body
    
   const filteredMember = data.members.filter(function(member){
        return member.id != id
   })

   data.members = filteredMember



   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write file error!")
        }

        return res.redirect("/members")
   })
}