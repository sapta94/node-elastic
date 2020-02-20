module.exports = (settings) => {

    var app = settings.app;
    var client = settings.client;

    app.get('/getMovies',async (req,res)=>{
        let showName = req.query.movies||null;
        let type = req.query.type||null

        if(!showName || !type){
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
                              type: {
                                  "query":showName,
                                  "fuzziness": 2
                              }
                            }
                          },
                          {
                            "term": {
                              "type": "movie"
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