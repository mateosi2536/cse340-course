import bcrypt from 'bcrypt';
import db from './db.js';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4))
        RETURNING user_id
    `;
    const result = await db.query(query, [name, email, passwordHash, default_role]);
    return result.rows[0].user_id;
};

const getUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    const match = await verifyPassword(password, user.password_hash);
    if (!match) {
        return null;
    }
    const { password_hash, ...safeUser } = user;
    return safeUser;
};

const getAllUsers = async () => {
    const query = `
        SELECT u.name, u.email, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.name
    `;
    const result = await db.query(query);
    return result.rows;
};

export { createUser, getUserByEmail, verifyPassword, authenticateUser, getAllUsers };
