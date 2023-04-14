

export const checkEmails = (email) =>{

    console.log(email)

    let isValid = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(email);

       
        

        if(isValid){                
            return isValid      
           
        }
        else{
            isValid = false
            return isValid
            
        }

}