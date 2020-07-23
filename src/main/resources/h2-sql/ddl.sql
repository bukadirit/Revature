DROP TABLE IF EXISTS questions CASCADE;
create table questions (
	id INTEGER generated always as identity primary key,
	title VARCHAR(50) NOT NULL,
	content VARCHAR(1000) NOT NULL,
	creation_date TIMESTAMP NOT NULL,
	edit_date TIMESTAMP,
	status BOOLEAN NOT NULL,
	user_id INTEGER references users(user_id)
);
DROP TABLE IF EXISTS answers CASCADE;
create table answers (
	id INTEGER generated always as identity primary key,
	user_id INTEGER references users(user_id),
	question_id INTEGER references questions(id),
	content VARCHAR(1000),
	creation_date TIMESTAMP NOT NULL,
	edit_date TIMESTAMP
);
--h2:referencail integrety error fix
DROP TABLE questions CASCADE;
create table questions (
	id INTEGER generated always as identity primary key,
	accepted_id INTEGER references answers(id),
	title VARCHAR(50) NOT NULL,
	content VARCHAR(1000) NOT NULL,
	creation_date TIMESTAMP NOT NULL,
	edit_date TIMESTAMP,
	status BOOLEAN NOT NULL,
	user_id INTEGER references users(user_id)
);