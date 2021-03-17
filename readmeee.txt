docker run -p 5444:5432 -v /home/mkmr/projects/data/pgdata:/var/lib/postgresql/data mkmrcodes/pgg"

'docker build' error: "failed to solve with frontend dockerfile.v0"
çözüm sudo :)

psql -U postgres
create collation "tr_TR.UTF-8" (LOCALE="tr_TR.UTF-8");
CREATE DATABASE test_db ENCODING='UTF-8' LC_COLLATE='tr_TR.UTF-8' TEMPLATE=template0;

netsh interface portproxy add v4tov4 listenport=5444 listenaddress=0.0.0.0 connectport=5432 connectaddress=$($(wsl hostname -I).Trim());