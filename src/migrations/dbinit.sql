CREATE TABLE test
(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR  NOT NULL,
    description VARCHAR NOT NULL,
    "isFinished" boolean NOT NULL,
    CONSTRAINT todos_pkey PRIMARY KEY (id)
)