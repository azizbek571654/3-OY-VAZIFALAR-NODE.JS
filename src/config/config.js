export const config = {
    db_url: process.env.DB_URL,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET
};

console.log(config.db_url);
