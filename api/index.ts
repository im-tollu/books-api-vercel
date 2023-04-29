import express from 'express'

const app = express();

app.get('/api', (req, res) => {
    const { name = 'World' } = req.query
    return res.json({
        message: `Hello ${name}!`,
    })
});


export default app