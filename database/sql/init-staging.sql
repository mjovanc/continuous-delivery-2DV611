-- USER --
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(40) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);

-- LOG --
CREATE TABLE log (
  id INT NOT NULL AUTO_INCREMENT,
  owner INT NOT NULL,
  name VARCHAR(40) NOT NULL,
  description VARCHAR(500) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES user(id)
);

INSERT INTO user (id, email, password, name) VALUES (1, 'staging@staging.se', '$2b$08$PuhxzNTGU11jh7LN0G699.DZ5gCezTsCrZ9VzuWxleVuPAt3xNkHi', 'staging');
