module.exports = (settings) => {

    var app = settings.app;
    var client = settings.client;

    app.get('/getWorks',async (req,res)=>{
        let actorName = req.query.actorName||null;

        if(!actorName){
            return res.status(200).json({
                message:'success',
                data:[]
            })
        }

        try{
            const data=await client.search({
                index: 'all-shows',
                // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
                body: {
                    "query": {
                      "bool": {
                        "must": [
                          {
                            "match": {
                              "cast": {
                                  "query":actorName,
                                  "fuzziness": 0
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
            })
            return res.status(200).json({
                message:'success',
                data:data.body.hits
            })
        }catch(err){
            console.log(err)
            return res.status(200).json({
                message:'failed',
                err:err
            })
        }
    })
}