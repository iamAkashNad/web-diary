const resourceNotFound = (req, res) => {
    res.status(404).json({ message: "Resource not found!" });
};

const expressDefaultErrorHandler = (error, req, res, next) => {
    res.status(500).json({ message: "Something went wrong internally!" });
};

module.exports = {
    resourceNotFound: resourceNotFound,
    expressDefaultErrorHandler: expressDefaultErrorHandler,
};
