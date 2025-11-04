class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

            search() {
            const keyword = this.queryStr.keyword?.trim();
        //    console.log(keyword)
            if (!keyword) return this; 

            this.query = this.query.find({
                $or: [
                    { description: { $regex: keyword, $options: 'i' } },
                    { drivelink: { $regex: keyword, $options: 'i' } },
                    { 'packageId.title': { $regex: keyword, $options: 'i' } },
                ],
            });
            // console.log(this.query)
            return this;
        }



    filter(){
        const queryStrCopy = { ...this.queryStr };
  
        //removing fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach( field => delete queryStrCopy[field]);
        
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

export default APIFeatures;