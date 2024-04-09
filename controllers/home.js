const itemsPerPage=8;

module.exports={
    async home(req,res){
        const carParts= await req.services.getAllCarParts(req.query);

        let page = Number(req.query.page || 1);
        if (page <= 0) {
            page = 1;
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedItems = carParts.slice(startIndex, endIndex);

        const totalPages = Math.ceil(carParts.length / itemsPerPage);

        const isTherePreviuosPage = (page - 1) > 0;
        const isThereNextPage = itemsPerPage * page < carParts.length;

        let finalItems;
        let mustHaveNextOrPrevious = true;

        if (req.query.search || req.query.from || req.query.to) {
            mustHaveNextOrPrevious = false;
            finalItems = carParts;
        } else {
            mustHaveNextOrPrevious = true;
            finalItems = slicedItems;
        }

        let categoryName;
        if (finalItems.length>0) {
            categoryName=finalItems[0].category;
        }

        res.render('index',{
            carParts:finalItems,
            title:'Car Parts',
            query:req.query,
            currentPage:page+1,
            previousPage:page-1,
            totalPages,
            isTherePreviuosPage,
            isThereNextPage,
            mustHaveNextOrPrevious,
            categoryName,
        })
    }
}