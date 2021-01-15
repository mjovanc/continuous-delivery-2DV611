class Task {
  constructor (id = null, name, description, owner, date = new Date()) {
    this.id = id
    this.name = name
    this.description = description
    this.owner = owner
    this.date = date
  }
}

module.exports = Task
