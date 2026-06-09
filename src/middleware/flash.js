const emptyFlash = () => ({ success: [], error: [], warning: [], info: [] });

const flash = (req, res, next) => {
    req.flash = (type, message) => {
        if (!req.session.flash) {
            req.session.flash = emptyFlash();
        }
        if (type && message) {
            req.session.flash[type].push(message);
            return;
        }
        if (type) {
            const messages = req.session.flash[type];
            req.session.flash[type] = [];
            return messages;
        }
        const messages = req.session.flash;
        req.session.flash = emptyFlash();
        return messages;
    };

    res.locals.flash = req.flash;
    next();
};

export default flash;
