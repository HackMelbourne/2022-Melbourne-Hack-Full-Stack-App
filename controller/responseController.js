let responses = []
const getResponses =  async (req, res) =>{
    try{
       res.status(200).send(responses);
    }
    catch(error){
        res.status(400).send({msg: "Cannot send back responses"});
    }

}

const submitResponses = async (req, res)=>{
    try{
          //get a response from the request body.
          const newResponse = req.body.response; 
    
        //Add it to the responses array to show them to users. 
        responses.push(newResponse); 
        //write a csv/text file for Hoan 's workshop 
    
        //send a successful status if there are no errors.
        res.status(200).json(responses);
    }
    catch(error){
        res.status(400).send({msg: "something was wrong"});
    }
   
}

module.exports.getResponses = getResponses;
module.exports.submitResponses = submitResponses; 