const asyncHandler=(requestHandler)=>{
 return (req,res,next)=>{
     Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
}
}//for promise or below for async funtion

//for error seach node js class error
export {asyncHandler}



// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//        // console.log(error);
//        res.status(err.code||500).json({
//         success:false,
//         message:err.message
//        })
//     }
// }