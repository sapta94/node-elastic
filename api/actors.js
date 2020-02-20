module.exports = (settings) => {

    var app = settings.app;
    var client = settings.client;


    app.get('/getDistinctActor',async(req,res)=>{
      let actorName = req.query.actorName||null;
      let type= req.qery.type||null;

      if(actorName.length<3){
        return res.json({
          data:[]
        })
      }
      var typeCheck={}
      if(type){
        typeCheck = {
          "term": {
            "type": type
          }
        }
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
                            "fuzziness": 3
                        }
                      }
                    },
                    typeCheck
                  ]
                }
              }
            }
        })
        let tempData = data.body.hits.hits
        let finalArr=[]
        tempData.forEach(element => {
          let casts = (element._source.cast).split(',')
          finalArr.push(...casts)
        });
        return res.status(200).json({
            message:'success',
            data:finalArr
        })
      }catch(err){
            console.log(err)
            return res.status(200).json({
                message:'failed',
                err:err
            })
        }
    })

    app.get('/getDistinctDirector',async(req,res)=>{
      let directorName = req.query.directorName||null;
      let type= req.query.type||null;

      if(directorName.length<3){
        return res.json({
          data:[]
        })
      }
      var typeCheck={}
      if(type){
        typeCheck = {
          "term": {
            "type": type
          }
        }
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
                            "query":directorName,
                            "fuzziness": 3
                        }
                      }
                    },
                    typeCheck
                  ]
                }
              }
            }
        })
        let tempData = data.body.hits.hits
        let finalArr=[]
        tempData.forEach(element => {
          let casts = (element._source.cast).split(',')
          finalArr.push(...casts)
        });
        return res.status(200).json({
            message:'success',
            data:finalArr
        })
      }catch(err){
            console.log(err)
            return res.status(200).json({
                message:'failed',
                err:err
            })
        }
    })

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
                                  "query":actorName
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