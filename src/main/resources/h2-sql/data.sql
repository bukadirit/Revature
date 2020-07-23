DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id int PRIMARY KEY,
  account_id int NOT NULL,
  points int NOT NULL,
  admin_role boolean NOT NULL,
  profile_picture BYTEA,
  email varchar(250) not null,
  first_name varchar(250) NOT NULL,
  last_name varchar(250) NOT NULL
);

INSERT INTO users (user_id,account_id, points, admin_role, profile_picture, email, first_name, last_name) 
VALUES (13, 15, 0, false, NULL, 'user@rss.com', 'User', 'User'), (12, 26, 0, true, NULL, 'admin@rss.com', 'Admin', 'Admin');
