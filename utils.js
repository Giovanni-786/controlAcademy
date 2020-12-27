module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        // 2020 - 2000 = 20        
        let age = today.getFullYear() - birthDate.getFullYear()
        
        // 12 - 6 = +6
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }

        return age

    },

    
    date: function(timestamp){
        const date = new Date(timestamp)

        //yyyy
        const year = date.getUTCFullYear()

        //mm
        let month = `0${date.getUTCMonth() + 1}`.slice(-2)

        //dd
        let day = `0${date.getUTCDate()}`.slice(-2)

        return{
           day,
           month,
           year,
           iso: `${year}-${month}-${day}`, // Tipo iso.
           birthDay: `${day}/${month}`
        } 
        
    },

    blood: function(value){
        
        if(value=="A1"){
            return "A+"
        }
        if(value=="A0"){
            return "A-"
        }
        if(value=="B1"){
            return "B+"
        }
        if(value=="B0"){
            return "B-"
        }
        if(value=="AB1"){
            return "AB+"
        }
        if(value=="AB0"){
            return "AB-"
        }
        if(value=="O1"){
            return "0+"
        }
        if(value=="O0"){
            return "0-"
        }
    }


}