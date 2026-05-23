const handleNotFound = (req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
};

const handleError = (err, req, res, next) => {
    const status = err.status === 404 ? 404 : 500;
    console.error(err);
    res.status(status).render(`errors/${status}`, { title: 'Error', err });
};

export { handleNotFound, handleError };
