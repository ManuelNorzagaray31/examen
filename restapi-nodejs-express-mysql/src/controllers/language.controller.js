import { getConnection } from "./../database/database";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, producto, descripcion,precio,existencia FROM Productos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id,producto, descripcion,precio,existencia FROM Productos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { producto, descripcion,precio,existencia } = req.body;

        if (producto === undefined || descripcion === undefined || precio===undefined || existencia===undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const language = { producto, descripcion,precio,existencia };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO Productos SET ?", language);
        res.json({ message: "Language added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, descripcion,precio,existencia } = req.body;

        if (id===undefined || producto === undefined || descripcion === undefined || precio===undefined || existencia===undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const language = { producto, descripcion,precio,existencia };
        const connection = await getConnection();
        const result = await connection.query("UPDATE Productos SET ? WHERE id = ?", [language, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM Productos WHERE id=?", id);
        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLanguages,
    getLanguage,
    addLanguage,
    updateLanguage,
    deleteLanguage
};