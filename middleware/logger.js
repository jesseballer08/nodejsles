export const log = (req, res, next) => {
    console.log("boeien");
    next();
};