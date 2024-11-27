const index = (req,res)=>{
    res.send("Homepage Coming From Controller");
};

const entertainment = (req,res)=>{
    res.send("Entertainment Coming From Controller");
};

const news =(req,res)=>{
    res.send("News Coming From Controller");
};

const politics =(req,res)=>{
    res.send("Politices Coming From Controller");
};

const sports =(req,res)=>{
    res.send("sports Coming From Controller");
};

const technology =(req,res)=>{
    res.send("Technology Coming From Controller");
};

module.exports={
    index,
    entertainment,
    news,
    politics,
    sports,
    technology
};