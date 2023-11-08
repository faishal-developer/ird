export const calcSkip=(page:string | undefined,limit:string | undefined)=>{
    let newPage=Number(page || 1);
    let newLimit=Number(limit || 10);
    return {
        page:newPage,
        limit:newLimit,
        skip:(newPage-1)*newLimit
    }
}