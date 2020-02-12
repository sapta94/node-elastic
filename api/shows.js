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
                // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
                body: { 
                    "query":{
                        "match":{ 
                            "title":showName,
                            "type":"TV"
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