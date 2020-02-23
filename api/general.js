module.exports=(settings)=>{

    var app = settings.app;
    var client = settings.client;

    app.get('/allCountries',async (req,res)=>{
        try{
            const data=await client.search({
                index: 'all-shows',
                body: {
                    
                        "aggs": {
                          "distinct_country": {
                            "terms": {
                              "field": "country",
                              "size": 25
                            }
                          }
                        }
                }     
            })
            return res.status(200).json({
                message:'success',
                data:data.body.aggregations
            })
        }catch(err){
            console.log(err)
            return res.status(200).json({
                message:'failed',
                err:err
            })
        }
    })

    app.get('/ratingStats',async(req,res)=>{
        try{
            const data=await client.search({
                index: 'all-shows',
                body: {
                    
                        "aggs": {
                          "ratings_count": {
                            "terms": {
                              "field": "rating",
                              "size": 25
                            }
                          }
                        }
                }     
            })
            return res.status(200).json({
                message:'success',
                data:data.body.aggregations
            })
        }catch(err){
            console.log(err)
            return res.status(200).json({
                message:'failed',
                err:err
            })
        }
    })

    app.get('/yearRangeData',async (req,res)=>{
        let yearFrom = req.query.yearFrom||null;
        let yearTo = req.query.yearTo||null;

        if(!yearFrom && !yearTo){
            return res.status(422).json({
                message:"missing parameters"
            })
        }
        let temp={}
        if(yearFrom && !yearTo){
            temp={"gte": yearFrom}
        } 
        else if(yearTo && !yearFrom){
            temp = {"lte":yearTo}
        }else{
            temp={"gte": yearFrom,"lte":yearTo}
        }
        try{
            const data=await client.search({
                index: 'all-shows',
                body: 
                { "query":{
                    "bool": 
                        { 
                            "filter": 
                            {
                                "range": {"release_year": temp}
                            } 
                        } 
                    } 
                }     
            })
            return res.json({
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