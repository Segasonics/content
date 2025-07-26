//functions to handler errors in asynchronous route handlers
export const asyncHandler=(requestHandler)=>{
   return(req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch(next)
   }
}