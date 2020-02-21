module.exports=(settings)=>{

    var app = settings.app;
    var client = settings.client;

    app.get('/allCountries',async (req,res)=>{
        try{
            const data=await client.search({
                index: 'all-shows',
                body: {
                    
                        "aggs": {
                          "distinct_colors": {
                            "terms": {
                              "field": "country",
                              "size": 1000
                            }
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