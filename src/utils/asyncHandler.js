// const asyncHandler=()=>{}

const asyncHandler = (fn) => async(req, res, next) => {  //here fn is the function that we want to run asynchronously and this si the HOF
  try {
    return await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
        success: false,
        message: error.message || "Something went wrong",
    });
    next(error);
    
  }
    //Promise.resolve(fn(req, res, next)).catch(next); //this is the another way to handle HOF using promise which is directly returned here
};
export default asyncHandler;