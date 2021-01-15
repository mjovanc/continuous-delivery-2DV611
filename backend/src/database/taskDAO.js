const pool = require('./databaseConnection')

const taskDAO = {}

taskDAO.getTasks = async (userId) => {
  let conn
  try {
  conn = await pool.getConnection()
  const query = 'SELECT * FROM log WHERE owner=?'
  return conn.query(query, [userId])
  } catch (error) {
    console.error(error)
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Creates a task via sql.
 *
 * Created template values to be edited to the real values later on.
 *
 * @param {*} task The task data.
 */
taskDAO.createTask = async (task) => {
  console.log(task)
  let conn
  try {
    conn = await pool.getConnection()

    const insertNewTaskQuery = 'INSERT INTO log (name, description, owner) VALUES (?, ?, ?)'
    const {name, description, owner } = task

    await conn.query(insertNewTaskQuery, [name, description, owner])
  } catch (error) {
    console.error(error)
  } finally {
    if (conn) conn.release()
  }
}

/**
 *
 * @param {*} task The task data.
 */
taskDAO.deleteTask = async (taskId) => {
  let conn
  try {
    conn = await pool.getConnection()

    const deleteTaskQuery = 'DELETE FROM log WHERE id=?'

    await conn.query(deleteTaskQuery, [taskId])
  } catch (error) {
    console.error(error)
  } finally {
    if (conn) conn.release()
  }
}

module.exports = taskDAO
