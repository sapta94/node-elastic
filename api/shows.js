module.exports = (settings) => {

    var app = settings.app;
    var client = settings.client;

    app.get('/getTVshows',async (req,res)=>{
        let showName = req.query.showName||null;

        if(!showName){
            return res.status(200).json({
                message:'success',
                data:[]
            })
        }

        try{
            const data=await client.search({
                index: 'all-shows',
                body: {
                    "query": {
                      "bool": {
                        "must": [
                          {
                            "match": {
                              "title": {
                                  "query":showName,
                                  "fuzziness": 2
                              }
                            }
                          },
                          {
                            "term": {
                              "type": "tv"
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